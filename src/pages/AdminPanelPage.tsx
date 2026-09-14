import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { CollectionRecord, Tab } from '@/services/AdminTypes';
import { deleteCareer, fetchCareers, fetchReservations } from '@/services/forms.service';
import { getToken } from '@/services/auth.service';
import { getWebsiteGeneralData } from '@/features/websiteGeneralDataSlice';
import { getServices } from '@/features/serviceSlice';
import { getFaqs } from '@/features/faqSlice';
import { getTestimonials } from '@/features/testimonialSlice';
import { getEquipments, setPage } from '@/features/equipmentSlice';
import { routes } from '@/router/routes';

import BaseBtn from '@/components/BaseBtn';
import Logo from '@/components/Logo';
import EquipmentPanel from '@/components/admin/EquipmentPanel';
import FaqPanel from '@/components/admin/FaqPanel';
import RecordsPanel from '@/components/admin/RecordsPanel';
import ServicesPanel from '@/components/admin/ServicesPanel';
import TestimonialsPanel from '@/components/admin/TestimonialsPanel';
import WebsiteDataPanel from '@/components/admin/WebsiteDataPanel';
import { LoadingState, Panel } from '@/components/admin/AdminPrimitives';

const tabs: Array<{ id: Tab; label: string }> = [
    { id: 'website', label: 'Website data' },
    { id: 'services', label: 'Services' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'careers', label: 'Careers' },
];

// The page coordinates authentication, tab navigation, and collection loading.
function AdminPanelPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [tab, setTab] = useState<Tab>('website');
    const [notice, setNotice] = useState('');
    const [reservations, setReservations] = useState<CollectionRecord[]>([]);
    const [careers, setCareers] = useState<CollectionRecord[]>([]);
    const [loadedRecords, setLoadedRecords] = useState({ reservations: false, careers: false });
    const [recordsLoading, setRecordsLoading] = useState(false);
    const [recordsPage, setRecordsPage] = useState(1);

    const websiteData = useAppSelector((state) => state.websiteGeneralData);
    const servicesState = useAppSelector((state) => state.services);
    const faqsState = useAppSelector((state) => state.faqs);
    const testimonialsState = useAppSelector((state) => state.testimonials);
    const equipment = useAppSelector((state) => state.equipment);
    const sliceError = useAppSelector((state) => (
        websiteData.error
        || servicesState.error
        || faqsState.error
        || testimonialsState.error
        || state.equipment.error
    ));

    const showNotice = (message: string) => {
        setNotice(message);
        window.setTimeout(() => setNotice(''), 3500);
    };

    useEffect(() => {
        if (tab === 'website' && !websiteData.hasLoaded && !websiteData.isLoading) {
            void dispatch(getWebsiteGeneralData());
        }
        if (tab === 'services' && !servicesState.hasLoaded && !servicesState.isLoading) {
            void dispatch(getServices());
        }
        if (tab === 'faqs' && !faqsState.hasLoaded && !faqsState.isLoading) {
            void dispatch(getFaqs());
        }
        if (tab === 'testimonials' && !testimonialsState.hasLoaded && !testimonialsState.isLoading) {
            void dispatch(getTestimonials());
        }
        if (tab === 'equipment' && !equipment.hasLoaded && !equipment.isLoading) {
            void dispatch(getEquipments());
        }
        if (tab !== 'reservations' && tab !== 'careers') return;
        if (loadedRecords[tab]) return;

        const load = async () => {
            setRecordsLoading(true);
            try {
                const response = await (tab === 'reservations' ? fetchReservations() : fetchCareers()) as { data: CollectionRecord[] };
                if (tab === 'reservations') {
                    setReservations(response.data);
                    setLoadedRecords((current) => ({ ...current, reservations: true }));
                } else {
                    setCareers(response.data);
                    setLoadedRecords((current) => ({ ...current, careers: true }));
                }
            } catch {
                showNotice('Unable to load this collection.');
            } finally {
                setRecordsLoading(false);
            }
        };

        void load();
    }, [dispatch, equipment, faqsState, loadedRecords, servicesState, tab, testimonialsState, websiteData]);

    if (!getToken()) return <Navigate to={routes.adminLogin} replace />;

    const logout = () => {
        document.cookie = 'purecare_token=; path=/; max-age=0; SameSite=Lax';
        navigate(routes.adminLogin, { replace: true });
    };

    const changeTab = (nextTab: Tab) => {
        setTab(nextTab);
        setRecordsPage(1);
    };

    const renderTab = () => {
        const tabLoading = tab === 'website'
            ? websiteData.isLoading
            : tab === 'services'
                ? servicesState.isLoading
                : tab === 'faqs'
                    ? faqsState.isLoading
                    : tab === 'testimonials'
                        ? testimonialsState.isLoading
                        : tab === 'equipment'
                            ? equipment.isLoading
                            : recordsLoading;

        if (tabLoading) {
            const title = tabs.find((item) => item.id === tab)?.label ?? 'Admin data';
            return (
                <Panel title={title}>
                    <LoadingState />
                </Panel>
            );
        }

        switch (tab) {
            case 'website':
                return <WebsiteDataPanel onDone={() => showNotice('Website data saved.')} />;
            case 'services':
                return <ServicesPanel services={servicesState.services} onDone={() => showNotice('Services updated.')} />;
            case 'faqs':
                return <FaqPanel faqs={faqsState.data} onDone={() => showNotice('FAQs updated.')} />;
            case 'testimonials':
                return <TestimonialsPanel testimonials={testimonialsState.data} onDone={() => showNotice('Testimonials updated.')} />;
            case 'equipment':
                return (
                    <EquipmentPanel
                        equipment={equipment.data}
                        pagination={equipment.pagination}
                        onPageChange={(page) => {
                            dispatch(setPage(page));
                            void dispatch(getEquipments());
                        }}
                        onDone={() => showNotice('Equipment updated.')}
                    />
                );
            case 'reservations':
                return (
                    <RecordsPanel
                        title="Reservations"
                        records={reservations}
                        page={recordsPage}
                        onPageChange={setRecordsPage}
                        paginationPlaceholder="Pagination is displayed locally until backend pagination is available."
                    />
                );
            case 'careers':
                return (
                    <RecordsPanel
                        title="Career applications"
                        records={careers}
                        page={recordsPage}
                        onPageChange={setRecordsPage}
                        paginationPlaceholder="Pagination is displayed locally until backend pagination is available."
                        onDelete={async (id) => {
                            await deleteCareer(id);
                            setCareers((items) => items.filter((item) => item.id !== id));
                            showNotice('Career application deleted.');
                        }}
                    />
                );
        }
    };

    return (
        <main className="min-h-screen bg-[#F4F9FE] text-body-text" dir="ltr">
            <header className="border-b border-base-border bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
                    <Logo />
                    <div className="flex items-center gap-3">
                        <span className="hidden text-sm font-bold text-body-text sm:block">PureCare administration</span>
                        <BaseBtn className="bg-[#EAF3FC] text-primary" onClick={logout}>Sign out</BaseBtn>
                    </div>
                </div>
            </header>
            <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
                <div className="mb-6 overflow-x-auto">
                    <nav className="flex min-w-max gap-2 rounded-2xl border border-base-border bg-white p-2">
                        {tabs.map((item) => (
                            <button
                                type="button"
                                key={item.id}
                                onClick={() => changeTab(item.id)}
                                className={`cursor-pointer rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${tab === item.id ? 'bg-primary text-white shadow-sm' : 'text-body-text hover:bg-[#F1F7FC]'}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
                {notice && <p role="status" className="mb-5 rounded-xl bg-[#E7F8EF] px-4 py-3 text-sm font-bold text-secondary">{notice}</p>}
                {sliceError && <p role="alert" className="mb-5 rounded-xl bg-stale-red px-4 py-3 text-sm font-bold text-emergancy">{sliceError}</p>}
                {renderTab()}
            </div>
        </main>
    );
}

export default AdminPanelPage;