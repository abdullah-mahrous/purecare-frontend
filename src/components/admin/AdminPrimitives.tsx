import { useEffect, useState, type ReactNode } from 'react';

// These small controls keep labels, spacing, and admin actions consistent.
export function TextField({ label, name, value, onChange, type = 'text', required = true }: {
    label: string;
    name: string;
    value: string | number;
    onChange: (value: string) => void;
    type?: string;
    required?: boolean;
}) {
    return (
        <label className="block text-sm font-bold text-heading-text">
            {label}
            <input
                name={name}
                type={type}
                value={value}
                required={required}
                onChange={(event) => onChange(event.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-base-border bg-white px-3 text-sm font-medium outline-none focus:border-primary"
            />
        </label>
    );
}

export function TextArea({ label, name, value, onChange }: {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <label className="block text-sm font-bold text-heading-text">
            {label}
            <textarea
                name={name}
                value={value}
                required
                onChange={(event) => onChange(event.target.value)}
                className="mt-1.5 min-h-24 w-full rounded-xl border border-base-border bg-white p-3 text-sm font-medium outline-none focus:border-primary"
            />
        </label>
    );
}

export function ActionButton({ children, onClick, destructive = false, disabled = false }: {
    children: string;
    onClick: () => void;
    destructive?: boolean;
    disabled?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`rounded-lg px-3 py-2 text-xs font-extrabold transition disabled:cursor-not-allowed disabled:opacity-60 ${destructive ? 'bg-stale-red text-emergancy hover:bg-red-100' : 'bg-[#EAF3FC] text-primary hover:bg-[#DDECF9]'}`}
        >
            {children}
        </button>
    );
}

// Shows a selected image immediately and keeps an existing remote image visible while editing.
export function FileField({ label, required, currentUrl, onChange }: {
    label: string;
    required: boolean;
    currentUrl?: string;
    onChange: (file: File | undefined) => void;
}) {
    const [previewUrl, setPreviewUrl] = useState(currentUrl);

    useEffect(() => {
        return () => {
            if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const change = (file: File | undefined) => {
        if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(file ? URL.createObjectURL(file) : currentUrl);
        onChange(file);
    };

    return (
        <label className="block text-sm font-bold text-heading-text">
            {label}{required && ' (required)'}
            {previewUrl && (
                <img src={previewUrl} alt={`${label} preview`} className="my-2 h-24 w-24 rounded-xl border border-base-border object-cover" />
            )}
            <input
                className="mt-1.5 block w-full text-sm"
                type="file"
                accept="image/*"
                required={required}
                onChange={(event) => change(event.target.files?.[0])}
            />
        </label>
    );
}

export function Panel({ title, children, action }: {
    title: string;
    children: ReactNode;
    action?: ReactNode;
}) {
    return (
        <section className="rounded-2xl border border-base-border bg-white p-5 shadow-[0_8px_20px_rgba(11,74,133,0.05)] sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-extrabold text-heading-text">{title}</h2>
                {action}
            </div>
            {children}
        </section>
    );
}

export function LoadingState() {
    return (
        <div className="flex min-h-40 items-center justify-center" role="status" aria-live="polite">
            <span className="text-sm font-bold text-primary">Loading...</span>
        </div>
    );
}