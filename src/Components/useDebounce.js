import React, { useState, useEffect } from "react";

export default function useDebounce(value) {
    let [debouncedValue, setdebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setdebouncedValue(value);
        }, 3000);
        
        return () => {
            clearTimeout(handler);
        }

    }, [value]
    );

    return debouncedValue
}
