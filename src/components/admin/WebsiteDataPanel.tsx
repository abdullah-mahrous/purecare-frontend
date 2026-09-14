import { type FormEvent, useEffect, useMemo, useState } from 'react';

import BaseBtn from '@/components/BaseBtn';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { patchWebsiteGeneralData } from '@/features/websiteGeneralDataSlice';
import { uploadIntroVideo } from '@/services/websiteGeneralData.service';
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
>;

// Edits the contact and social links used throughout the public website.
export default function WebsiteDataPanel({ onDone }: { onDone: () => void }) {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.websiteGeneralData);
    const [draft, setDraft] = useState<Partial<WebsiteForm>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [introVideoFile, setIntroVideoFile] = useState<File>();
    const [isUploadingVideo, setIsUploadingVideo] = useState(false);

    // Merge the draft over Redux data so untouched values stay visible in the form.
    const values: WebsiteForm = {
        emergencyNumber: data.emergencyNumber,
        phoneNumber: data.phoneNumber,
        whatsappNumber: data.whatsappNumber,
        facebook: data.facebook,
        instagram: data.instagram,
        tiktook: data.tiktook,
        ...draft,
    };

    const newVideoPreviewUrl = useMemo(
        () => introVideoFile ? URL.createObjectURL(introVideoFile) : undefined,
        [introVideoFile],
    );

    useEffect(() => {
        return () => {
            if (newVideoPreviewUrl) URL.revokeObjectURL(newVideoPreviewUrl);
        };
    }, [newVideoPreviewUrl]);

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

    const uploadVideo = async () => {
        if (!introVideoFile) return;

        setIsUploadingVideo(true);
        try {
            const response = await uploadIntroVideo(introVideoFile, data.introVideoUrl || undefined);
            await dispatch(patchWebsiteGeneralData({ introVideoUrl: response.data.url })).unwrap();
            setIntroVideoFile(undefined);
            onDone();
        } finally {
            setIsUploadingVideo(false);
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
                <BaseBtn className="w-fit bg-primary text-white" disabled={isSaving || !Object.keys(draft).length}>
                    {isSaving ? 'Saving...' : 'Save changes'}
                </BaseBtn>
            </form>
            <div className="mt-8 border-t border-base-border pt-6">
                <h3 className="text-lg font-extrabold text-heading-text">Intro video</h3>
                <div className="mt-4 grid gap-5 md:grid-cols-2">
                    <div>
                        <p className="text-sm font-bold text-heading-text">Current video</p>
                        {data.introVideoUrl ? (
                            <video
                                className="mt-2 aspect-video w-full rounded-xl border border-base-border bg-black"
                                controls
                                preload="metadata"
                                src={data.introVideoUrl}
                            />
                        ) : (
                            <p className="mt-2 text-sm text-gray-500">No intro video has been uploaded.</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-heading-text">
                            New video
                            <input
                                className="mt-2 block w-full text-sm"
                                type="file"
                                accept="video/*"
                                onChange={(event) => setIntroVideoFile(event.target.files?.[0])}
                            />
                        </label>
                        {newVideoPreviewUrl && (
                            <video
                                className="mt-2 aspect-video w-full rounded-xl border border-base-border bg-black"
                                controls
                                preload="metadata"
                                src={newVideoPreviewUrl}
                            />
                        )}
                    </div>
                </div>
                <BaseBtn
                    type="button"
                    className="mt-5 bg-primary text-white"
                    disabled={isUploadingVideo || !introVideoFile}
                    onClick={uploadVideo}
                >
                    {isUploadingVideo ? 'Uploading...' : 'Upload intro video'}
                </BaseBtn>
            </div>
        </Panel>
    );
}
