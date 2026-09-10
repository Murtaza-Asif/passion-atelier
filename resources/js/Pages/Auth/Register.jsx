import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

function PLogo({ size = 64 }) {
    return (
        <img src="/assets/images/pa-logo.png" alt="PA" width={size} height={size} style={{ width: size, height: size, objectFit: 'contain' }} />
    );
}

function EmailIcon() {
    return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>);
}
function LockIcon() {
    return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>);
}
function UserIcon() {
    return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>);
}
function EyeIcon() {
    return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>);
}
function EyeOffIcon() {
    return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /><path d="m2 2 20 20" /></svg>);
}
function ShieldIcon() {
    return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>);
}

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', password: '', password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    return (
        <>
            <Head title="Register" />

            <style>{`
                .pa-reg-root {
                    font-family: 'Inter', sans-serif;
                    min-height: 100vh; width: 100%;
                    display: flex;
                    background: #050507;
                    overflow: hidden; position: relative;
                }
                .pa-bg { position: fixed; inset: 0; z-index: 0; background: url('/assets/images/login-bg.jpg') center/cover no-repeat; }
                .pa-bg::before { content: ''; position: absolute; inset: 0; background: rgba(5,5,8,0.35); }
                .pa-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(5,5,8,0.15) 0%, transparent 30%, rgba(5,5,8,0.45) 100%), radial-gradient(ellipse 100% 100% at 50% 100%, rgba(5,5,8,0.3) 0%, transparent 60%); }
                .pa-reg-left { width: 58%; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 80px; position: relative; z-index: 1; }
                .pa-brand { text-align: center; }
                .pa-brand-name { font-family: 'Cormorant Garamond', serif; font-size: 64px; font-weight: 400; color: #F4F1F7; letter-spacing: 16px; line-height: 1; margin-bottom: 6px; }
                .pa-brand-sub { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 10px; }
                .pa-brand-sub-line { width: 50px; height: 1px; background: linear-gradient(90deg, transparent, rgba(185,132,255,0.5), transparent); }
                .pa-brand-sub-text { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; color: #C6A7FF; letter-spacing: 12px; }
                .pa-brand-tagline { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500; color: #77717F; letter-spacing: 6px; text-transform: uppercase; }
                .pa-divider { display: flex; align-items: center; justify-content: center; gap: 12px; margin: 36px 0; max-width: 320px; }
                .pa-divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(185,132,255,0.35), transparent); }
                .pa-divider-icon { color: rgba(185,132,255,0.5); font-size: 14px; letter-spacing: 4px; }
                .pa-slogan { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; font-style: italic; line-height: 1.65; text-align: center; max-width: 480px; color: #F4F1F7; }
                .pa-slogan-accent { color: #C6A7FF; }
                .pa-features { display: flex; align-items: flex-start; justify-content: center; gap: 0; margin-top: 48px; max-width: 520px; }
                .pa-feature { flex: 1; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 16px; position: relative; }
                .pa-feature:not(:last-child)::after { content: ''; position: absolute; right: 0; top: 8px; width: 1px; height: 48px; background: rgba(185,132,255,0.15); }
                .pa-feature-icon { width: 56px; height: 56px; border-radius: 50%; border: 1px solid rgba(185,132,255,0.25); display: flex; align-items: center; justify-content: center; margin-bottom: 14px; color: #B88CFF; }
                .pa-feature-label { font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #A9A4B3; letter-spacing: 2.5px; text-transform: uppercase; line-height: 1.5; }
                .pa-bottom { position: absolute; bottom: 32px; left: 0; right: 0; text-align: center; font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 500; color: #55505E; letter-spacing: 4px; text-transform: uppercase; z-index: 2; }
                .pa-reg-right { width: 42%; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 50px; position: relative; z-index: 1; }
                .pa-card { width: 100%; max-width: 520px; background: rgba(10,9,17,0.65); border: 1px solid rgba(185,132,255,0.2); border-radius: 26px; padding: 44px 48px; backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); box-shadow: 0 0 60px rgba(145,85,220,0.1), 0 0 120px rgba(100,40,180,0.06), 0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(185,132,255,0.1); display: flex; flex-direction: column; }
                .pa-create-link { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(185,132,255,0.1); font-size: 13px; color: #77717F; }
                .pa-create-link a { color: #B88CFF; text-decoration: none; font-weight: 500; margin-left: 6px; transition: color 0.3s; }
                .pa-create-link a:hover { color: #C6A7FF; }
                .pa-card-logo { text-align: center; margin-bottom: 28px; margin-top: 12px; }
                .pa-card-logo-name { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 500; color: #F4F1F7; letter-spacing: 6px; margin-bottom: 4px; }
                .pa-card-logo-sub { font-size: 8px; font-weight: 500; color: #77717F; letter-spacing: 3.5px; text-transform: uppercase; }
                .pa-card-heading { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 500; color: #F4F1F7; margin-bottom: 8px; line-height: 1.1; text-align: center; }
                .pa-card-sub { font-size: 14px; color: #77717F; line-height: 1.6; margin-bottom: 28px; text-align: center; }
                .pa-field { margin-bottom: 16px; }
                .pa-input-wrap { position: relative; display: flex; align-items: center; }
                .pa-input-icon { position: absolute; left: 18px; color: #55505E; transition: color 0.3s; pointer-events: none; display: flex; align-items: center; }
                .pa-input-wrap:focus-within .pa-input-icon { color: #B88CFF; }
                .pa-input { width: 100%; height: 54px; background: rgba(5,5,10,0.5); border: 1px solid rgba(160,150,180,0.18); border-radius: 14px; padding: 0 18px 0 52px; font-family: 'Inter', sans-serif; font-size: 14px; color: #EEEAF2; outline: none; transition: all 0.3s ease; }
                .pa-input::placeholder { color: #55505E; }
                .pa-input:focus { border-color: rgba(185,132,255,0.5); box-shadow: 0 0 0 3px rgba(185,132,255,0.08), 0 0 20px rgba(145,85,220,0.06); background: rgba(5,5,10,0.65); }
                .pa-eye-btn { position: absolute; right: 16px; background: none; border: none; color: #55505E; cursor: pointer; padding: 4px; display: flex; align-items: center; transition: color 0.3s; }
                .pa-eye-btn:hover { color: #A9A4B3; }
                .pa-error { font-size: 12px; color: #E879F9; margin-top: 6px; padding-left: 4px; }
                .pa-reg-btn { width: 100%; height: 56px; border: 1px solid rgba(185,132,255,0.25); border-radius: 999px; background: rgba(124,58,237,0.15); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); color: white; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s ease; box-shadow: 0 4px 24px rgba(145,85,220,0.2), inset 0 1px 0 rgba(255,255,255,0.08); margin-top: 8px; }
                .pa-reg-btn:hover { background: rgba(124,58,237,0.25); border-color: rgba(185,132,255,0.4); box-shadow: 0 6px 32px rgba(145,85,220,0.3), inset 0 1px 0 rgba(255,255,255,0.1); transform: translateY(-1px); }
                .pa-reg-btn:active { transform: translateY(0) scale(0.99); }
                .pa-reg-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
                .pa-security { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: auto; padding-top: 24px; font-size: 12px; color: #55505E; }
                .pa-spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: pa-spin 0.7s linear infinite; }
                @keyframes pa-spin { to { transform: rotate(360deg); } }
                @keyframes pa-fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
                .pa-anim-left { animation: pa-fadeUp 0.9s cubic-bezier(0.2,0.8,0.2,1) forwards; opacity: 0; }
                .pa-anim-card { animation: pa-fadeUp 0.9s cubic-bezier(0.2,0.8,0.2,1) 0.15s forwards; opacity: 0; }
                @media (max-width: 768px) {
                    .pa-reg-root { flex-direction: column; }
                    .pa-reg-left { width: 100%; min-height: auto; padding: 48px 24px 32px; }
                    .pa-reg-right { width: 100%; min-height: auto; padding: 0 16px 48px; }
                    .pa-brand-name { font-size: 32px; letter-spacing: 8px; }
                    .pa-brand-sub-text { font-size: 16px; letter-spacing: 6px; }
                    .pa-slogan { font-size: 18px; max-width: 300px; }
                    .pa-features { flex-wrap: wrap; gap: 20px; max-width: 340px; }
                    .pa-feature::after { display: none !important; }
                    .pa-card { padding: 32px 24px; border-radius: 24px; }
                    .pa-card-heading { font-size: 28px; }
                    .pa-bottom { position: static; margin-top: 24px; }
                }
            `}</style>

            <div className="pa-reg-root">
                <div className="pa-bg" />

                <div className="pa-reg-left pa-anim-left">
                    <div className="pa-brand">
                        <div style={{ marginBottom: 24 }}><PLogo size={110} /></div>
                        <div className="pa-brand-name">PASSION</div>
                        <div className="pa-brand-sub">
                            <span className="pa-brand-sub-line" />
                            <span className="pa-brand-sub-text">ATELIER</span>
                            <span className="pa-brand-sub-line" />
                        </div>
                        <div className="pa-brand-tagline">Unstitched Men's Fabrics</div>
                    </div>
                    <div className="pa-divider">
                        <span className="pa-divider-line" /><span className="pa-divider-icon">✦ ✦ ✦</span><span className="pa-divider-line" />
                    </div>
                    <div className="pa-slogan">
                        Woven with Precision,<br />Crafted with Excellence,<br />
                        <span className="pa-slogan-accent">Designed for a Standard<br />Beyond Ordinary.</span>
                    </div>
                    <div className="pa-features">
                        <div className="pa-feature"><div className="pa-feature-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" /></svg></div><div className="pa-feature-label">Premium<br />Quality</div></div>
                        <div className="pa-feature"><div className="pa-feature-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg></div><div className="pa-feature-label">Finest<br />Weave</div></div>
                        <div className="pa-feature"><div className="pa-feature-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="6" cy="6" r="3" /><path d="M8.12 8.12 12 12" /><path d="M20 4 8.12 15.88" /><circle cx="6" cy="18" r="3" /><path d="M14.8 14.8 20 20" /></svg></div><div className="pa-feature-label">Tailored<br />For You</div></div>
                        <div className="pa-feature"><div className="pa-feature-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" /><path d="M3 21h18" /></svg></div><div className="pa-feature-label">Timeless<br />Elegance</div></div>
                    </div>
                    <div className="pa-bottom">Passion Atelier &nbsp;·&nbsp; Estd. 2026</div>
                </div>

                <div className="pa-reg-right pa-anim-card">
                    <div className="pa-card" style={{ position: 'relative' }}>
                        <h1 className="pa-card-heading">Create Account</h1>
                        <p className="pa-card-sub">Fill in the details below to begin your<br />journey with premium fabrics.</p>

                        <form onSubmit={submit}>
                            <div className="pa-field">
                                <div className="pa-input-wrap">
                                    <span className="pa-input-icon"><UserIcon /></span>
                                    <input type="text" className="pa-input" placeholder="Full Name" value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="name" autoFocus />
                                </div>
                                {errors.name && <div className="pa-error">{errors.name}</div>}
                            </div>
                            <div className="pa-field">
                                <div className="pa-input-wrap">
                                    <span className="pa-input-icon"><EmailIcon /></span>
                                    <input type="email" className="pa-input" placeholder="Email Address" value={data.email} onChange={(e) => setData('email', e.target.value)} autoComplete="username" />
                                </div>
                                {errors.email && <div className="pa-error">{errors.email}</div>}
                            </div>
                            <div className="pa-field">
                                <div className="pa-input-wrap">
                                    <span className="pa-input-icon"><LockIcon /></span>
                                    <input type={showPassword ? 'text' : 'password'} className="pa-input" placeholder="Password" value={data.password} onChange={(e) => setData('password', e.target.value)} autoComplete="new-password" style={{ paddingRight: 52 }} />
                                    <button type="button" className="pa-eye-btn" onClick={() => setShowPassword(!showPassword)} tabIndex={-1} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {errors.password && <div className="pa-error">{errors.password}</div>}
                            </div>
                            <div className="pa-field">
                                <div className="pa-input-wrap">
                                    <span className="pa-input-icon"><LockIcon /></span>
                                    <input type="password" className="pa-input" placeholder="Confirm Password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} autoComplete="new-password" />
                                </div>
                                {errors.password_confirmation && <div className="pa-error">{errors.password_confirmation}</div>}
                            </div>
                            <button type="submit" className="pa-reg-btn" disabled={processing}>
                                {processing ? (<><span className="pa-spinner" /> Creating...</>) : 'Create Account'}
                            </button>
                        </form>

                        <div className="pa-security">
                            <ShieldIcon />
                            Your information is safe with us.
                        </div>

                        <div className="pa-create-link">
                            Already have an account?<Link href={route('login')}> Sign In →</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
