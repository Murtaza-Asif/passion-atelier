export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-violet)] shadow-sm focus:ring-[var(--color-violet)] focus:ring-offset-[var(--color-card)] ' +
                className
            }
        />
    );
}
