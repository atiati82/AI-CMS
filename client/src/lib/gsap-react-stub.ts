// Stub module for @gsap/react
// The actual library may not be installed, so we provide a basic hook wrapper
import { useLayoutEffect, useRef } from 'react';

export function useGSAP(
    callback: () => void | (() => void),
    options?: { scope?: React.RefObject<any>; dependencies?: any[] }
) {
    useLayoutEffect(() => {
        const cleanup = callback();
        return () => {
            if (typeof cleanup === 'function') {
                cleanup();
            }
        };
    }, options?.dependencies || []);
}
