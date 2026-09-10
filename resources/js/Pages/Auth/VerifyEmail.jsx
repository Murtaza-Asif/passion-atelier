import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[var(--color-foreground)]" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                    Verify Email
                </h1>
                <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                    Thanks for signing up! Please verify your email address.
                </p>
            </div>

            <div className="mb-5 rounded-xl bg-[var(--color-violet)]/10 px-4 py-3 text-sm text-[var(--color-foreground)]">
                We've emailed you a verification link. Click it to get started.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-5 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400">
                    A new verification link has been sent to your email.
                </div>
            )}

            <form onSubmit={submit}>
                <PrimaryButton className="w-full justify-center" disabled={processing}>
                    {processing ? 'Sending...' : 'Resend Verification Email'}
                </PrimaryButton>
            </form>

            <div className="mt-6 text-center">
                <Link href={route('logout')} method="post" as="button" className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">
                    Or sign out
                </Link>
            </div>
        </GuestLayout>
    );
}
