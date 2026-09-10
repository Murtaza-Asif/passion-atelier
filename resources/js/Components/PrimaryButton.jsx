export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--color-violet)] focus:ring-offset-2 focus:ring-offset-[var(--color-card)] active:scale-[0.98] disabled:opacity-25 disabled:pointer-events-none ` +
                className
            }
            style={{
                background: 'linear-gradient(135deg, oklch(0.42 0.18 295), oklch(0.55 0.22 270))',
            }}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
