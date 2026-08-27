import { useEffect, useState } from "react";

/** Delays a changing value before it is used for an API-driven filter. */
export function useDebouncedValue<T>(value: T, delay = 400) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = window.setTimeout(() => setDebouncedValue(value), delay);
        return () => window.clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
}
