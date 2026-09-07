import { type FormEvent, useState } from 'react';

import BaseBtn from '@/components/BaseBtn';
import { useAppDispatch } from '@/app/hooks';
import { deleteFaqById, patchFaq, postFaq } from '@/features/faqSlice';
import type { Faq, FaqInput } from '@/services/faq.service';
import { ActionButton, Panel, TextArea, TextField } from './AdminPrimitives';

const emptyFaq = (): FaqInput => ({
    questionAr: '',
    questionEn: '',
    answerAr: '',
    answerEn: '',
});

// Manages FAQs that are not attached to a specific service.
export default function FaqPanel({ faqs, onDone }: { faqs: Faq[]; onDone: () => void }) {
    const dispatch = useAppDispatch();
    const [form, setForm] = useState<FaqInput>(emptyFaq());
    const [editing, setEditing] = useState<Faq | null>(null);
    const [changedFields, setChangedFields] = useState<Partial<FaqInput>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const change = (key: keyof FaqInput) => (value: string) => {
        setForm((current) => ({ ...current, [key]: value }));
        setChangedFields((current) => ({ ...current, [key]: value }));
    };

    const save = async (event: FormEvent) => {
        event.preventDefault();
        setIsSaving(true);
        try {
            if (editing) {
                await dispatch(patchFaq({ id: editing.id, data: changedFields })).unwrap();
            } else {
                await dispatch(postFaq(form)).unwrap();
            }
            setEditing(null);
            setForm(emptyFaq());
            setChangedFields({});
            onDone();
        } finally {
            setIsSaving(false);
        }
    };

    const remove = async (id: string) => {
        setDeletingId(id);
        try {
            await dispatch(deleteFaqById(id)).unwrap();
            onDone();
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <Panel title="General FAQs">
            <div className="space-y-3">
                {faqs.map((item) => (
                    <div key={item.id} className="rounded-xl border border-base-border p-4">
                        <p className="font-extrabold text-heading-text">{item.questionEn}</p>
                        <p className="mt-1 text-sm">{item.answerEn}</p>
                        <div className="mt-3 flex gap-2">
                            <ActionButton
                                onClick={() => {
                                    setEditing(item);
                                    setChangedFields({});
                                    setForm({
                                        questionAr: item.questionAr,
                                        questionEn: item.questionEn,
                                        answerAr: item.answerAr,
                                        answerEn: item.answerEn,
                                    });
                                }}
                            >
                                Edit
                            </ActionButton>
                            <ActionButton
                                destructive
                                disabled={deletingId === item.id}
                                onClick={() => void remove(item.id)}
                            >
                                {deletingId === item.id ? 'Deleting...' : 'Delete'}
                            </ActionButton>
                        </div>
                    </div>
                ))}
            </div>
            <form className="mt-6 grid gap-4 border-t border-base-border pt-5 md:grid-cols-2" onSubmit={(event) => void save(event)}>
                <TextField label="Arabic question" name="questionAr" value={form.questionAr} onChange={change('questionAr')} />
                <TextField label="English question" name="questionEn" value={form.questionEn} onChange={change('questionEn')} />
                <TextArea label="Arabic answer" name="answerAr" value={form.answerAr} onChange={change('answerAr')} />
                <TextArea label="English answer" name="answerEn" value={form.answerEn} onChange={change('answerEn')} />
                <BaseBtn className="w-fit bg-primary text-white" disabled={isSaving}>
                    {isSaving ? 'Saving...' : editing ? 'Update FAQ' : 'Add FAQ'}
                </BaseBtn>
            </form>
        </Panel>
    );
}