import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[var(--color-foreground)]" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                    Reset Password
                </h1>
                <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                    Enter your new password below
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput id="email" type="email" name="email" value={data.email} autoComplete="username" onChange={(e) => setData('email', e.target.value)} placeholder="you@example.com" />
                    <InputError message={errors.email} className="mt-1.5" />
                </div>
                <div>
                    <InputLabel htmlFor="password" value="New Password" />
                    <TextInput id="password" type="password" name="password" value={data.password} autoComplete="new-password" isFocused={true} onChange={(e) => setData('password', e.target.value)} placeholder="Enter new password" />
                    <InputError message={errors.password} className="mt-1.5" />
                </div>
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput id="password_confirmation" type="password" name="password_confirmation" value={data.password_confirmation} autoComplete="new-password" onChange={(e) => setData('password_confirmation', e.target.value)} placeholder="Confirm new password" />
                    <InputError message={errors.password_confirmation} className="mt-1.5" />
                </div>
                <div className="pt-2">
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        {processing ? 'Resetting...' : 'Reset Password'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
