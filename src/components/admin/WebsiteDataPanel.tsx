import { type FormEvent, useState } from 'react';

import BaseBtn from '@/components/BaseBtn';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { patchWebsiteGeneralData } from '@/features/websiteGeneralDataSlice';
import type { WebsiteGeneralData } from '@/services/websiteGeneralData.service';
import { Panel, TextField } from './AdminPrimitives';

type WebsiteForm = Pick<
    WebsiteGeneralData,
    | 'emergencyNumber'
    | 'phoneNumber'
    | 'whatsappNumber'
    | 'facebook'
    | 'instagram'
    | 'tiktook'
    | 'introVideoUrl'
>;

// Edits the contact and social links used throughout the public website.
export default function WebsiteDataPanel({ onDone }: { onDone: () => void }) {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.websiteGeneralData);
    const [draft, setDraft] = useState<Partial<WebsiteForm>>({});
    const [isSaving, setIsSaving] = useState(false);

    // Merge the draft over Redux data so untouched values stay visible in the form.
    const values: WebsiteForm = {
        emergencyNumber: data.emergencyNumber,
        phoneNumber: data.phoneNumber,
        whatsappNumber: data.whatsappNumber,
        facebook: data.facebook,
        instagram: data.instagram,
        tiktook: data.tiktook,
        introVideoUrl: data.introVideoUrl,
        ...draft,
    };

    const change = (key: keyof WebsiteForm) => (value: string) => {
        setDraft((current) => ({ ...current, [key]: value }));
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        if (!Object.keys(draft).length) return;

        setIsSaving(true);
        try {
            await dispatch(patchWebsiteGeneralData(draft)).unwrap();
            setDraft({});
            onDone();
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Panel title="Website general data">
            <form className="grid gap-4 md:grid-cols-2" onSubmit={submit}>
                <TextField
                    label="Phone number"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={change('phoneNumber')}
                />
                <TextField
                    label="Emergency number"
                    name="emergencyNumber"
                    value={values.emergencyNumber}
                    onChange={change('emergencyNumber')}
                />
                <TextField
                    label="WhatsApp number"
                    name="whatsappNumber"
                    value={values.whatsappNumber}
                    onChange={change('whatsappNumber')}
                />
                <TextField
                    label="Facebook URL"
                    name="facebook"
                    value={values.facebook}
                    onChange={change('facebook')}
                    type="url"
                />
                <TextField
                    label="Instagram URL"
                    name="instagram"
                    value={values.instagram}
                    onChange={change('instagram')}
                    type="url"
                />
                <TextField
                    label="TikTok URL"
                    name="tiktook"
                    value={values.tiktook}
                    onChange={change('tiktook')}
                    type="url"
                />
                <div className="md:col-span-2">
                    <TextField
                        label="Intro video URL"
                        name="introVideoUrl"
                        value={values.introVideoUrl}
                        onChange={change('introVideoUrl')}
                        type="url"
                    />
                </div>
                <BaseBtn className="w-fit bg-primary text-white" disabled={isSaving || !Object.keys(draft).length}>
                    {isSaving ? 'Saving...' : 'Save changes'}
                </BaseBtn>
            </form>
        </Panel>
    );
}
