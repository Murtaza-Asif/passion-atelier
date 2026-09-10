export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-xs text-[var(--color-destructive)] mt-1.5 ' + className}
        >
            {message}
        </p>
    ) : null;
}
