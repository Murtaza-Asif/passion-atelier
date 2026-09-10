import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'block w-full rounded-xl bg-white/[0.06] px-4 py-3 text-[15px] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]/40 transition-all duration-200 focus:bg-white/[0.1] focus:ring-2 focus:ring-[var(--color-violet)]/30 focus:outline-none ' +
                className
            }
            ref={localRef}
        />
    );
});
