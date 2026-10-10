"use client";

import { useMemo } from "react";

export default function useStyle(x) {
    const styles = useMemo(() => {
        if (!x) return {};

        let _x;
        if (x === true) {
            _x = 100;
        } else {
            _x = x;
        }

        return {
            display: 'grid',
            gridTemplateColumns: `${_x}px auto `,
            rowGap: '0px'
        }
    }, [x])
    return styles;
}