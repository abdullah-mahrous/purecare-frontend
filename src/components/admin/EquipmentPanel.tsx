import { type FormEvent, useState } from 'react';

import BaseBtn from '@/components/BaseBtn';
import { useAppDispatch } from '@/app/hooks';
import Pagination from '@/components/Pagination';
import DropDownList from '@/components/DropDownList';
import { deleteEquipmentById, patchEquipment, postEquipment } from '@/features/equipmentSlice';
import { arabicEquipmentCategories, type Equipment, type EquipmentCategoryId, type EquipmentCreateInput, type EquipmentPagination, type EquipmentUpdateInput } from '@/services/equipment.service';
import { ActionButton, FileField, Panel, TextArea, TextField } from './AdminPrimitives';

const emptyEquipment = () => ({
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    categoryAr: '',
    categoryEn: '',
    price: 0,
    available: true,
    equipmentImg: undefined as File | undefined,
});

// Handles equipment CRUD while keeping file inputs local to this tab.
export default function EquipmentPanel({ equipment, pagination, onPageChange, onDone }: {
    equipment: Equipment[];
    pagination: EquipmentPagination;
    onPageChange: (page: number) => void;
    onDone: () => void;
}) {
    const dispatch = useAppDispatch();
    const [form, setForm] = useState(emptyEquipment());
    const [editing, setEditing] = useState<Equipment | null>(null);
    const [changedFields, setChangedFields] = useState<Partial<EquipmentUpdateInput>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [fileResetKey, setFileResetKey] = useState(0);

    const change = (key: keyof typeof form) => (value: string) => {
        setForm((current) => ({
            ...current,
            [key]: key === 'price' ? Number(value) : value,
        }));
        setChangedFields((current) => ({ ...current, [key]: key === 'price' ? Number(value) : value }));
    };

    const save = async (event: FormEvent) => {
        event.preventDefault();
        setIsSaving(true);
        try {
            if (editing) {
                await dispatch(patchEquipment({ id: editing.id, data: changedFields })).unwrap();
            } else {
                if (!form.equipmentImg) return;
                await dispatch(postEquipment(form as Required<EquipmentCreateInput>)).unwrap();
            }
            setForm(emptyEquipment());
            setEditing(null);
            setChangedFields({});
            setFileResetKey((current) => current + 1);
            onDone();
        } finally {
            setIsSaving(false);
        }
    };

    const remove = async (id: string) => {
        setDeletingId(id);
        try {
            await dispatch(deleteEquipmentById(id)).unwrap();
            onDone();
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <Panel title="Equipment">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {equipment.map((item) => (
                    <article key={item.id} className="rounded-xl border border-base-border p-4">
                        <p className="font-extrabold text-heading-text">{item.nameEn}</p>
                        <p className="mt-1 text-sm">{item.categoryEn} · {item.pricePerDay}</p>
                        <div className="mt-3 flex gap-2">
                            <ActionButton
                                onClick={() => {
                                    setEditing(item);
                                    setChangedFields({});
                                    setForm({
                                        nameAr: item.nameAr,
                                        nameEn: item.nameEn,
                                        descriptionAr: item.descriptionAr,
                                        descriptionEn: item.descriptionEn,
                                        categoryAr: item.categoryAr,
                                        categoryEn: item.categoryEn,
                                        price: item.pricePerDay,
                                        available: item.inStock ?? true,
                                        equipmentImg: undefined,
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
            <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pages}
                hasNextPage={pagination.hasNextPage}
                hasPreviousPage={pagination.hasPreviousPage}
                onPageChange={onPageChange}
            />
            <form className="mt-6 grid gap-4 border-t border-base-border pt-5 md:grid-cols-2" onSubmit={(event) => void save(event)}>
                <TextField label="Arabic name" name="nameAr" value={form.nameAr} onChange={change('nameAr')} />
                <TextField label="English name" name="nameEn" value={form.nameEn} onChange={change('nameEn')} />
                <TextArea label="Arabic description" name="descriptionAr" value={form.descriptionAr} onChange={change('descriptionAr')} />
                <TextArea label="English description" name="descriptionEn" value={form.descriptionEn} onChange={change('descriptionEn')} />
                <label className="block text-sm font-bold text-heading-text">
                    Equipment category
                    <DropDownList<EquipmentCategoryId>
                        items={arabicEquipmentCategories.map((category) => ({
                            text: category.label,
                            value: category.id,
                        }))}
                        selectedValues={form.categoryEn ? [form.categoryEn as EquipmentCategoryId] : []}
                        onChange={(values) => {
                            const categoryEn = values[0] ?? '';
                            const category = arabicEquipmentCategories.find((item) => item.id === categoryEn);
                            setForm((current) => ({ ...current, categoryEn, categoryAr: category?.label ?? '' }));
                            setChangedFields((current) => ({ ...current, categoryEn, categoryAr: category?.label ?? '' }));
                        }}
                        placeholder="Select equipment category"
                        className="relative mt-1.5 min-h-11 rounded-xl border border-base-border bg-white px-3 py-3"
                    />
                </label>
                <TextField label="Price" name="price" type="number" value={form.price} onChange={change('price')} />
                <label className="flex items-center gap-2 text-sm font-bold text-heading-text">
                    <input
                        type="checkbox"
                        checked={form.available}
                        onChange={(event) => {
                            setForm((current) => ({ ...current, available: event.target.checked }));
                            setChangedFields((current) => ({ ...current, available: event.target.checked }));
                        }}
                    />
                    Available to rent
                </label>
                <FileField
                    key={`equipment-image-${editing?.id ?? 'new'}-${fileResetKey}`}
                    label="Image"
                    required={!editing}
                    currentUrl={editing?.imageUrl}
                    onChange={(file) => {
                        setForm((current) => ({ ...current, equipmentImg: file }));
                        setChangedFields((current) => ({ ...current, equipmentImg: file }));
                    }}
                />
                <BaseBtn className="w-fit bg-primary text-white" disabled={isSaving}>
                    {isSaving ? 'Saving...' : editing ? 'Update equipment' : 'Add equipment'}
                </BaseBtn>
            </form>
        </Panel>
    );
}