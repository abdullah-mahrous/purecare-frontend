import { type FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import Logo from '@/components/Logo';
import BaseBtn from '@/components/BaseBtn';
import BaseInput from '@/components/BaseInput';
import { authenticate, getToken } from '@/services/auth.service';
import { routes } from '@/router/routes';

function AdminLoginPage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (getToken()) return <Navigate to={routes.admin} replace />;

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

        setError('');
        setIsSubmitting(true);

        try {
            await authenticate(String(form.get('email') ?? ''), String(form.get('password') ?? ''));
            navigate(routes.admin, { replace: true });
        } catch {
            setError('The email or password is incorrect. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="grid min-h-screen place-items-center bg-[#F4F9FE] px-4 py-10" dir="ltr">
            <section className="w-full max-w-md rounded-3xl border border-base-border bg-white p-7 shadow-[0_18px_45px_rgba(11,74,133,0.12)] sm:p-9">
                <div className="flex justify-center"><Logo /></div>
                <div className="mt-8 text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Admin portal</p>
                    <h1 className="mt-2 text-2xl font-extrabold text-heading-text">Sign in to PureCare</h1>
                    <p className="mt-2 text-sm text-body-text">Manage the website content and incoming requests.</p>
                </div>

                <form className="mt-7 space-y-4" onSubmit={submit}>
                    <label className="block text-sm font-bold text-heading-text">
                        Email
                        <BaseInput className="mt-2" type="email" name="email" placeholder="admin@example.com" required autoComplete="email" />
                    </label>
                    <label className="block text-sm font-bold text-heading-text">
                        Password
                        <BaseInput className="mt-2" type="password" name="password" placeholder="Your password" required minLength={8} autoComplete="current-password" />
                    </label>
                    {error && <p role="alert" className="rounded-xl bg-stale-red px-4 py-3 text-sm font-semibold text-emergancy">{error}</p>}
                    <BaseBtn disabled={isSubmitting} className="w-full bg-primary text-white disabled:cursor-not-allowed disabled:opacity-60">
                        {isSubmitting ? 'Signing in…' : 'Sign in'}
                    </BaseBtn>
                </form>
            </section>
        </main>
    );
}

export default AdminLoginPage;
