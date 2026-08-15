import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import ChevronIcon from "../assets/icons/ChevronIcon";

type DropDownValue = string | number;

export type DropDownItem<T extends DropDownValue = string> = {
    text: string;
    value: T;
};

type DropDownListProps<T extends DropDownValue> = {
    items: readonly DropDownItem<T>[];
    selectedValues: readonly T[];
    onChange: (selectedValues: T[]) => void;
    placeholder: string;
    multiple?: boolean;
    className?: string;
};

const DropDownList = <T extends DropDownValue>({
    items,
    selectedValues,
    onChange,
    placeholder,
    multiple = false,
    className = "",
}: DropDownListProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuId = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const closeOnOutsidePress = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", closeOnOutsidePress);
        return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
    }, [isOpen]);

    const selectedItems = items.filter((item) => selectedValues.includes(item.value));

    const toggleMenu = () => setIsOpen((open) => !open);

    const selectItem = (value: T) => {
        if (multiple) {
            onChange(
                selectedValues.includes(value)
                    ? selectedValues.filter((selectedValue) => selectedValue !== value)
                    : [...selectedValues, value],
            );
            return;
        }

        onChange([value]);
        setIsOpen(false);
        triggerRef.current?.focus();
    };

    const removeItem = (value: T) => {
        onChange(selectedValues.filter((selectedValue) => selectedValue !== value));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") {
            setIsOpen(false);
            triggerRef.current?.focus();
        }
    };

    return (
        <div ref={rootRef} className={className} onKeyDown={handleKeyDown}>
            <div className="flex min-w-0 items-center gap-2">
                {selectedItems.length > 0 ? (
                    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
                        {selectedItems.map((item) => (
                            <span
                                key={`${typeof item.value}:${String(item.value)}`}
                                className="inline-flex max-w-full items-center gap-1 rounded-full bg-black/10 px-2 py-1"
                            >
                                <button
                                    type="button"
                                    className="min-w-0 truncate text-start"
                                    onClick={toggleMenu}
                                    aria-expanded={isOpen}
                                    aria-controls={menuId}
                                >
                                    {item.text}
                                </button>
                                <button
                                    type="button"
                                    className="shrink-0 leading-none"
                                    onClick={() => removeItem(item.value)}
                                    aria-label={`Remove ${item.text}`}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                ) : (
                    <button
                        type="button"
                        className="min-w-0 flex-1 text-start"
                        onClick={toggleMenu}
                        aria-expanded={isOpen}
                        aria-controls={menuId}
                    >
                        {placeholder}
                    </button>
                )}

                <button
                    ref={triggerRef}
                    type="button"
                    className="shrink-0 p-1"
                    onClick={toggleMenu}
                    aria-label={isOpen ? "Close options" : "Open options"}
                    aria-expanded={isOpen}
                    aria-controls={menuId}
                >
                    <ChevronIcon isOpen={isOpen} />
                </button>
            </div>

            <div
                id={menuId}
                aria-hidden={!isOpen}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "pointer-events-none grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    <ul className="max-h-60 overflow-y-auto" aria-label={placeholder}>
                        {items.map((item) => {
                            const isSelected = selectedValues.includes(item.value);

                            return (
                                <li key={`${typeof item.value}:${String(item.value)}`}>
                                    {multiple ? (
                                        <label className="flex cursor-pointer items-center gap-2 py-2">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => selectItem(item.value)}
                                                tabIndex={isOpen ? 0 : -1}
                                            />
                                            <span>{item.text}</span>
                                        </label>
                                    ) : (
                                        <button
                                            type="button"
                                            className="flex w-full items-center py-2 text-start"
                                            onClick={() => selectItem(item.value)}
                                            aria-pressed={isSelected}
                                            tabIndex={isOpen ? 0 : -1}
                                        >
                                            {item.text}
                                        </button>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DropDownList;
