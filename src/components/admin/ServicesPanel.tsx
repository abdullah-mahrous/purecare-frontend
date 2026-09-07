import { type FormEvent, useState } from 'react';

import BaseBtn from '@/components/BaseBtn';
import { useAppDispatch } from '@/app/hooks';
import { deleteFaqById, patchFaq, postFaq } from '@/features/faqSlice';
import { deleteServiceById, getServices, patchService, postService } from '@/features/serviceSlice';
import { createServiceDetail, deleteServiceDetail, updateServiceDetail, type Service, type ServiceDetails, type ServiceDetailsInput, type ServiceInput } from '@/services/services.service';
import type { Faq, FaqInput } from '@/services/faq.service';
import { ActionButton, FileField, Panel, TextArea, TextField } from './AdminPrimitives';
import type { DetailKind } from '../../services/AdminTypes';

const emptyDetail = (): ServiceDetailsInput => ({
    titleAr: '',
    titleEn: '',
    descriptionAr: '',
    descriptionEn: '',
});

const emptyFaq = (): FaqInput => ({
    questionAr: '',
    questionEn: '',
    answerAr: '',
    answerEn: '',
});

const emptyService = () => ({
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    rate: 0,
    customersCount: 0,
    responseTime: '',
    serviceImg: undefined as File | undefined,
});

// Owns service CRUD and refreshes the list after every mutation.
export default function ServicesPanel({ services, onDone }: { services: Service[]; onDone: () => void }) {
    const dispatch = useAppDispatch();
    const [selected, setSelected] = useState<Service | null>(null);
    const [form, setForm] = useState(emptyService());
    const [editing, setEditing] = useState(false);
    const [changedFields, setChangedFields] = useState<Partial<ServiceInput>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [fileResetKey, setFileResetKey] = useState(0);
    const activeService = selected
        ? services.find((service) => service.id === selected.id) ?? selected
        : null;

    const update = (key: keyof typeof form) => (value: string) => {
        setForm((current) => ({
            ...current,
            [key]: ['rate', 'customersCount'].includes(key) ? Number(value) : value,
        }));
        setChangedFields((current) => ({
            ...current,
            [key]: ['rate', 'customersCount'].includes(key) ? Number(value) : value,
        }));
    };

    const save = async (event: FormEvent) => {
        event.preventDefault();
        if (!editing && !form.serviceImg) return;
        setIsSaving(true);
        try {
            if (activeService) {
                await dispatch(patchService({ id: activeService.id, data: changedFields })).unwrap();
            } else {
                await dispatch(postService(form as Required<typeof form>)).unwrap();
            }
            await dispatch(getServices());
            setSelected(null);
            setEditing(false);
            setForm(emptyService());
            setChangedFields({});
            setFileResetKey((current) => current + 1);
            onDone();
        } finally {
            setIsSaving(false);
        }
    };

    const remove = async (id: string) => {
        if (!window.confirm('Delete this service and its linked records?')) return;
        setDeletingId(id);
        try {
            await dispatch(deleteServiceById(id)).unwrap();
            if (selected?.id === id) setSelected(null);
            onDone();
        } finally {
            setDeletingId(null);
        }
    };

    const startNew = () => {
        setSelected(null);
        setForm(emptyService());
        setChangedFields({});
        setEditing(true);
    };

    return (
        <div className="space-y-5">
            <Panel
                title="Services"
                action={<BaseBtn className="bg-secondary text-white" onClick={startNew}>New service</BaseBtn>}
            >
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {services.map((service) => (
                        <article key={service.id} className="rounded-xl border border-base-border p-4">
                            <h3 className="font-extrabold text-heading-text">{service.nameEn}</h3>
                            <p className="mt-1 line-clamp-2 text-sm">{service.descriptionEn}</p>
                            <div className="mt-4 flex gap-2">
                                <ActionButton
                                    onClick={() => {
                                        setSelected(service);
                                        setForm({
                                            nameAr: service.nameAr,
                                            nameEn: service.nameEn,
                                            descriptionAr: service.descriptionAr,
                                            descriptionEn: service.descriptionEn,
                                            rate: service.rate,
                                            customersCount: service.customersCount,
                                            responseTime: service.responseTime ?? '',
                                            serviceImg: undefined,
                                        });
                                        setChangedFields({});
                                        setEditing(true);
                                    }}
                                >
                                    Manage
                                </ActionButton>
                                <ActionButton destructive disabled={deletingId === service.id} onClick={() => void remove(service.id)}>
                                    {deletingId === service.id ? 'Deleting...' : 'Delete'}
                                </ActionButton>
                            </div>
                        </article>
                    ))}
                    {!services.length && <p className="text-sm">No services yet.</p>}
                </div>
            </Panel>
            {editing && (
                <Panel title={activeService ? `Manage ${activeService.nameEn}` : 'Create service'}>
                    <form className="grid gap-4 md:grid-cols-2" onSubmit={(event) => void save(event)}>
                        <TextField label="Arabic name" name="nameAr" value={form.nameAr} onChange={update('nameAr')} />
                        <TextField label="English name" name="nameEn" value={form.nameEn} onChange={update('nameEn')} />
                        <TextArea label="Arabic description" name="descriptionAr" value={form.descriptionAr} onChange={update('descriptionAr')} />
                        <TextArea label="English description" name="descriptionEn" value={form.descriptionEn} onChange={update('descriptionEn')} />
                        <TextField label="Rate" name="rate" type="number" value={form.rate} onChange={update('rate')} />
                        <TextField label="Customers count" name="customersCount" type="number" value={form.customersCount} onChange={update('customersCount')} />
                        <TextField label="Response time" name="responseTime" value={form.responseTime} onChange={update('responseTime')} required={false} />
                        <FileField
                            key={`service-image-${activeService?.id ?? 'new'}-${fileResetKey}`}
                            label="Service image"
                            required={!activeService}
                            currentUrl={activeService?.imgUrl}
                            onChange={(file) => {
                                setForm((current) => ({ ...current, serviceImg: file }));
                                setChangedFields((current) => ({ ...current, serviceImg: file }));
                            }}
                        />
                        <div className="flex gap-3">
                            <BaseBtn className="bg-primary text-white" disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save service'}
                            </BaseBtn>
                            <ActionButton onClick={() => setEditing(false)}>Cancel</ActionButton>
                        </div>
                    </form>
                    {activeService && (
                        <ServiceChildren
                            key={activeService.id}
                            service={activeService}
                            onDone={async () => {
                                await dispatch(getServices());
                                onDone();
                            }}
                        />
                    )}
                </Panel>
            )}
        </div>
    );
}

function ServiceChildren({ service, onDone }: { service: Service; onDone: () => Promise<void> }) {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState<DetailKind | 'faqs'>('included-services');
    const [detail, setDetail] = useState<ServiceDetailsInput>(emptyDetail());
    const [editingDetail, setEditingDetail] = useState<ServiceDetails | null>(null);
    const [changedDetail, setChangedDetail] = useState<Partial<ServiceDetailsInput>>({});
    const [isSavingDetail, setIsSavingDetail] = useState(false);
    const [deletingDetailId, setDeletingDetailId] = useState<string | null>(null);
    const [detailFileResetKey, setDetailFileResetKey] = useState(0);
    const [faq, setFaq] = useState<FaqInput>(emptyFaq());
    const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
    const [changedFaq, setChangedFaq] = useState<Partial<FaqInput>>({});
    const [isSavingFaq, setIsSavingFaq] = useState(false);
    const [deletingFaqId, setDeletingFaqId] = useState<string | null>(null);
    const items = activeTab === 'included-services' ? service.included : service.targeted;
    const detailKind = activeTab === 'faqs' ? 'included-services' : activeTab;

    const resetChildForms = () => {
        setDetail(emptyDetail());
        setEditingDetail(null);
        setChangedDetail({});
        setFaq(emptyFaq());
        setEditingFaq(null);
        setChangedFaq({});
    };

    const detailChange = (key: keyof ServiceDetailsInput) => (value: string) => {
        setDetail((current) => ({ ...current, [key]: value }));
        setChangedDetail((current) => ({ ...current, [key]: value }));
    };

    const faqChange = (key: keyof FaqInput) => (value: string) => {
        setFaq((current) => ({ ...current, [key]: value }));
        setChangedFaq((current) => ({ ...current, [key]: value }));
    };

    const saveDetail = async (event: FormEvent) => {
        event.preventDefault();
        if (!editingDetail && !detail.icon) return;
        setIsSavingDetail(true);
        try {
            if (editingDetail) {
                await updateServiceDetail(service.id, detailKind, editingDetail.id, changedDetail);
            } else {
                await createServiceDetail(service.id, detailKind, detail as Required<ServiceDetailsInput>);
            }
            setDetail(emptyDetail());
            setChangedDetail({});
            setEditingDetail(null);
            setDetailFileResetKey((current) => current + 1);
            await onDone();
        } finally {
            setIsSavingDetail(false);
        }
    };

    const saveFaq = async (event: FormEvent) => {
        event.preventDefault();
        setIsSavingFaq(true);
        try {
            if (editingFaq) {
                await dispatch(patchFaq({ id: editingFaq.id, data: changedFaq })).unwrap();
            } else {
                await dispatch(postFaq({ ...faq, serviceId: service.id })).unwrap();
            }
            setFaq(emptyFaq());
            setChangedFaq({});
            setEditingFaq(null);
            await onDone();
        } finally {
            setIsSavingFaq(false);
        }
    };

    const removeDetail = async (id: string) => {
        setDeletingDetailId(id);
        try {
            await deleteServiceDetail(service.id, detailKind, id);
            await onDone();
        } finally {
            setDeletingDetailId(null);
        }
    };

    const removeFaq = async (id: string) => {
        setDeletingFaqId(id);
        try {
            await dispatch(deleteFaqById(id)).unwrap();
            await onDone();
        } finally {
            setDeletingFaqId(null);
        }
    };

    return (
        <div className="mt-8 border-t border-base-border pt-6">
            <div className="mb-5 flex flex-wrap gap-2">
                {([
                    ['included-services', 'Included services'],
                    ['targeted-customers', 'Target customers'],
                    ['faqs', 'Service FAQs'],
                ] as const).map(([value, label]) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => {
                            resetChildForms();
                            setActiveTab(value);
                        }}
                        className={`rounded-lg px-3 py-2 text-xs font-extrabold transition ${activeTab === value ? 'bg-primary text-white' : 'bg-[#EAF3FC] text-primary hover:bg-[#DDECF9]'}`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            {activeTab !== 'faqs' ? (
                <div>
                    <div className="space-y-2">
                        {items.map((item) => (
                            <div key={item.id} className="rounded-xl bg-[#F5F9FD] p-3">
                                <p className="font-bold text-heading-text">{item.titleEn}</p>
                                <div className="mt-2 flex gap-2">
                                    <ActionButton
                                        onClick={() => {
                                            setEditingDetail(item);
                                            setChangedDetail({});
                                            setDetail({
                                                titleAr: item.titleAr,
                                                titleEn: item.titleEn,
                                                descriptionAr: item.descriptionAr,
                                                descriptionEn: item.descriptionEn,
                                            });
                                        }}
                                    >
                                        Edit
                                    </ActionButton>
                                    <ActionButton
                                        destructive
                                        disabled={deletingDetailId === item.id}
                                        onClick={() => void removeDetail(item.id)}
                                    >
                                        {deletingDetailId === item.id ? 'Deleting...' : 'Delete'}
                                    </ActionButton>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form className="mt-4 grid gap-3" onSubmit={(event) => void saveDetail(event)}>
                        <TextField label="Arabic title" name="titleAr" value={detail.titleAr} onChange={detailChange('titleAr')} />
                        <TextField label="English title" name="titleEn" value={detail.titleEn} onChange={detailChange('titleEn')} />
                        <TextArea label="Arabic description" name="descriptionAr" value={detail.descriptionAr} onChange={detailChange('descriptionAr')} />
                        <TextArea label="English description" name="descriptionEn" value={detail.descriptionEn} onChange={detailChange('descriptionEn')} />
                        <FileField
                            key={`detail-icon-${editingDetail?.id ?? 'new'}-${detailFileResetKey}`}
                            label="Icon"
                            required={!editingDetail}
                            currentUrl={editingDetail?.iconUrl}
                            onChange={(file) => {
                                setDetail((current) => ({ ...current, icon: file }));
                                setChangedDetail((current) => ({ ...current, icon: file }));
                            }}
                        />
                        <BaseBtn className="w-fit bg-primary text-white" disabled={isSavingDetail}>
                            {isSavingDetail ? 'Saving...' : editingDetail ? 'Update item' : 'Add item'}
                        </BaseBtn>
                    </form>
                </div>
            ) : (
                <div>
                    <div className="space-y-2">
                        {service.faqs.map((item) => (
                            <div key={item.id} className="rounded-xl bg-[#F5F9FD] p-3">
                                <p className="font-bold text-heading-text">{item.questionEn}</p>
                                <div className="mt-2 flex gap-2">
                                    <ActionButton
                                        onClick={() => {
                                            setEditingFaq(item);
                                            setChangedFaq({});
                                            setFaq({
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
                                        disabled={deletingFaqId === item.id}
                                        onClick={() => void removeFaq(item.id)}
                                    >
                                        {deletingFaqId === item.id ? 'Deleting...' : 'Delete'}
                                    </ActionButton>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form className="mt-4 grid gap-3" onSubmit={(event) => void saveFaq(event)}>
                        <TextField label="Arabic question" name="questionAr" value={faq.questionAr} onChange={faqChange('questionAr')} />
                        <TextField label="English question" name="questionEn" value={faq.questionEn} onChange={faqChange('questionEn')} />
                        <TextArea label="Arabic answer" name="answerAr" value={faq.answerAr} onChange={faqChange('answerAr')} />
                        <TextArea label="English answer" name="answerEn" value={faq.answerEn} onChange={faqChange('answerEn')} />
                        <BaseBtn className="w-fit bg-primary text-white" disabled={isSavingFaq}>
                            {isSavingFaq ? 'Saving...' : editingFaq ? 'Update FAQ' : 'Add FAQ'}
                        </BaseBtn>
                    </form>
                </div>
            )}
        </div>
    );
}