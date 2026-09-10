import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] relative overflow-hidden px-4 py-12">
            {/* Soft background glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[var(--color-violet)]/[0.06] blur-[150px]" />
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-[420px]">
                <div className="rounded-3xl bg-[var(--color-card)]/60 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl">
                    {children}
                </div>
            </div>
        </div>
    );
}
