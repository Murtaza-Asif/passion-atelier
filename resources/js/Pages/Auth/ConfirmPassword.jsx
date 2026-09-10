import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({ password: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), { onFinish: () => reset('password') });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[var(--color-foreground)]" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                    Confirm Password
                </h1>
                <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                    This is a secure area. Please confirm your password to continue.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput id="password" type="password" name="password" value={data.password} isFocused={true} onChange={(e) => setData('password', e.target.value)} placeholder="Enter your password" />
                    <InputError message={errors.password} className="mt-1.5" />
                </div>
                <PrimaryButton className="w-full justify-center" disabled={processing}>
                    {processing ? 'Confirming...' : 'Confirm'}
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
