import { useMemo, useState } from 'react';

import Pagination from '@/components/Pagination';
import { ActionButton, Panel } from './AdminPrimitives';
import type { CollectionRecord } from '../../services/AdminTypes';

const pageSize = 10;

const isFileField = (key: string) => /file|cv|resume|document|nationalid|license|certificate/i.test(key);

const fileEntries = (value: unknown) => {
    const values = Array.isArray(value) ? value : [value];

    return values.flatMap((item) => {
        if (typeof item === 'string') return [{ url: item, name: item.split('/').pop() || 'Open file' }];
        if (!item || typeof item !== 'object') return [];

        const file = item as { url?: string; fileUrl?: string; path?: string; name?: string; originalName?: string };
        const url = file.url ?? file.fileUrl ?? file.path;
        return url ? [{ url, name: file.name ?? file.originalName ?? url.split('/').pop() ?? 'Open file' }] : [];
    });
};

const uniqueFileEntries = (value: unknown) => {
    const seen = new Set<string>();

    return fileEntries(value).filter((file) => {
        if (seen.has(file.url)) return false;
        seen.add(file.url);
        return true;
    });
};

// Displays form submissions without coupling the admin page to their fields.
export default function RecordsPanel({ title, records, page, onPageChange, onDelete, paginationPlaceholder }: {
    title: string;
    records: CollectionRecord[];
    page: number;
    onPageChange: (page: number) => void;
    onDelete?: (id: string) => Promise<void>;
    paginationPlaceholder?: string;
}) {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const pages = Math.ceil(records.length / pageSize);
    const current = useMemo(
        () => records.slice((page - 1) * pageSize, page * pageSize),
        [page, records],
    );

    return (
        <Panel title={title}>
            <div className="space-y-3">
                {current.map((record) => (
                    <article key={record.id} className="rounded-xl border border-base-border p-4">
                        <div className="flex flex-wrap justify-between gap-3">
                            <div className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                                {Object.entries(record)
                                    .filter(([key]) => key !== 'id' && key !== 'services' && isFileField(key))
                                    .flatMap(([key, value]) => uniqueFileEntries(value).map((file, index) => (
                                        <p key={`${key}-${file.url}`} className="min-w-0">
                                            <span className="font-bold text-heading-text">{key}: </span>
                                            <a href={file.url} target="_blank" rel="noreferrer" className="break-all text-primary underline" title={file.name}>
                                                {file.name || `File ${index + 1}`}
                                            </a>
                                        </p>
                                    )))}
                                {Object.entries(record)
                                    .filter(([key, value]) => key !== 'id' && key !== 'services' && !isFileField(key) && value !== null && typeof value !== 'object')
                                    .map(([key, value]) => (
                                        <p key={key}>
                                            <span className="font-bold text-heading-text">{key}: </span>
                                            {String(value)}
                                        </p>
                                    ))}
                                {'services' in record && (
                                    <p>
                                        <span className="font-bold text-heading-text">Services: </span>
                                        {Array.isArray(record.services)
                                            ? record.services
                                                .map((item) => String((item as { service?: { nameEn?: string } }).service?.nameEn ?? ''))
                                                .filter(Boolean)
                                                .join(', ')
                                            : ''}
                                    </p>
                                )}
                            </div>
                            {onDelete && (
                                <ActionButton
                                    destructive
                                    disabled={deletingId === record.id}
                                    onClick={() => {
                                        if (window.confirm('Delete this career application?')) {
                                            setDeletingId(record.id);
                                            void onDelete(record.id).finally(() => setDeletingId(null));
                                        }
                                    }}
                                >
                                    {deletingId === record.id ? 'Deleting...' : 'Delete'}
                                </ActionButton>
                            )}
                        </div>
                    </article>
                ))}
                {!records.length && <p className="text-sm">No records yet.</p>}
            </div>
            <Pagination
                currentPage={page}
                totalPages={pages}
                hasNextPage={page < pages}
                hasPreviousPage={page > 1}
                onPageChange={onPageChange}
            />
            {paginationPlaceholder && (
                <p className="mt-3 text-center text-xs text-body-text">{paginationPlaceholder}</p>
            )}
        </Panel>
    );
}