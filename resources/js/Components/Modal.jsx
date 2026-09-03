import { useEffect } from 'react';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => {},
}) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    useEffect(() => {
        if (!show) return;
        const handle = (e) => {
            if (e.key === 'Escape') close();
        };
        document.addEventListener('keydown', handle);
        return () => document.removeEventListener('keydown', handle);
    }, [show, closeable]);

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [show]);

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0">
            <div
                className="fixed inset-0 bg-gray-500/75 transition-opacity duration-200"
                onClick={close}
            />
            <div className={`mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 sm:mx-auto sm:w-full ${maxWidthClass}`}>
                {children}
            </div>
        </div>
    );
}
