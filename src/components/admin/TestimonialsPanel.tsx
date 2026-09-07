import { type FormEvent, useState } from 'react';

import BaseBtn from '@/components/BaseBtn';
import { useAppDispatch } from '@/app/hooks';
import { deleteTestimonialById, patchTestimonial, postTestimonial } from '@/features/testimonialSlice';
import type { Testimonial } from '@/services/testimonial.service';
import { ActionButton, Panel, TextArea, TextField } from './AdminPrimitives';

const emptyTestimonial = () => ({
    nameAr: '',
    nameEn: '',
    gender: '',
    commentAr: '',
    commentEn: '',
});

// Keeps testimonial editing isolated from the page-level tab state.
export default function TestimonialsPanel({ testimonials, onDone }: { testimonials: Testimonial[]; onDone: () => void }) {
    const dispatch = useAppDispatch();
    const [form, setForm] = useState(emptyTestimonial());
    const [editing, setEditing] = useState<Testimonial | null>(null);
    const [changedFields, setChangedFields] = useState<Partial<typeof form>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const change = (key: keyof typeof form) => (value: string) => {
        setForm((current) => ({ ...current, [key]: value }));
        setChangedFields((current) => ({ ...current, [key]: value }));
    };

    const save = async (event: FormEvent) => {
        event.preventDefault();
        setIsSaving(true);
        try {
            if (editing) {
                await dispatch(patchTestimonial({ id: editing.id, data: changedFields })).unwrap();
            } else {
                await dispatch(postTestimonial(form)).unwrap();
            }
            setEditing(null);
            setForm(emptyTestimonial());
            setChangedFields({});
            onDone();
        } finally {
            setIsSaving(false);
        }
    };

    const remove = async (id: string) => {
        setDeletingId(id);
        try {
            await dispatch(deleteTestimonialById(id)).unwrap();
            onDone();
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <Panel title="Testimonials">
            <div className="grid gap-3 md:grid-cols-2">
                {testimonials.map((item) => (
                    <article key={item.id} className="rounded-xl border border-base-border p-4">
                        <p className="font-extrabold text-heading-text">{item.nameEn} · {item.gender}</p>
                        <p className="mt-1 text-sm">{item.commentEn}</p>
                        <div className="mt-3 flex gap-2">
                            <ActionButton
                                onClick={() => {
                                    setEditing(item);
                                    setChangedFields({});
                                    setForm({
                                        nameAr: item.nameAr,
                                        nameEn: item.nameEn,
                                        gender: item.gender,
                                        commentAr: item.commentAr,
                                        commentEn: item.commentEn,
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
                    </article>
                ))}
            </div>
            <form className="mt-6 grid gap-4 border-t border-base-border pt-5 md:grid-cols-2" onSubmit={(event) => void save(event)}>
                <TextField label="Arabic name" name="nameAr" value={form.nameAr} onChange={change('nameAr')} />
                <TextField label="English name" name="nameEn" value={form.nameEn} onChange={change('nameEn')} />
                <TextField label="Gender" name="gender" value={form.gender} onChange={change('gender')} />
                <div />
                <TextArea label="Arabic comment" name="commentAr" value={form.commentAr} onChange={change('commentAr')} />
                <TextArea label="English comment" name="commentEn" value={form.commentEn} onChange={change('commentEn')} />
                <BaseBtn className="w-fit bg-primary text-white" disabled={isSaving}>
                    {isSaving ? 'Saving...' : editing ? 'Update testimonial' : 'Add testimonial'}
                </BaseBtn>
            </form>
        </Panel>
    );
}