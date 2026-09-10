import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />
            <style>{`
                .pa-fp-root { display: flex; min-height: 100vh; }
                .pa-bg { position: fixed; inset: 0; background: url('/assets/images/login-bg.jpg') center/cover no-repeat; z-index: 0; }
                .pa-bg::after { content: ''; position: absolute; inset: 0; background: rgba(10,9,17,0.55); }
                .pa-left { width: 58%; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px; position: relative; z-index: 1; }
                .pa-brand { display: flex; flex-direction: column; align-items: center; }
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
                .pa-right { width: 42%; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 50px; position: relative; z-index: 1; }
                .pa-card { width: 100%; max-width: 520px; background: rgba(10,9,17,0.65); border: 1px solid rgba(185,132,255,0.2); border-radius: 26px; padding: 44px 48px; backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); box-shadow: 0 0 60px rgba(145,85,220,0.1), 0 0 120px rgba(100,40,180,0.06), 0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(185,132,255,0.1); display: flex; flex-direction: column; }
                .pa-card-heading { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 500; color: #F4F1F7; margin-bottom: 8px; line-height: 1.1; }
                .pa-card-sub { font-size: 14px; color: #77717F; line-height: 1.6; margin-bottom: 28px; }
                .pa-field { margin-bottom: 16px; }
                .pa-input-wrap { position: relative; display: flex; align-items: center; }
                .pa-input-icon { position: absolute; left: 18px; color: #55505E; transition: color 0.3s; pointer-events: none; display: flex; align-items: center; }
                .pa-input-wrap:focus-within .pa-input-icon { color: #B88CFF; }
                .pa-input { width: 100%; height: 54px; background: rgba(5,5,10,0.5); border: 1px solid rgba(160,150,180,0.18); border-radius: 14px; padding: 0 18px 0 52px; font-family: 'Inter', sans-serif; font-size: 14px; color: #EEEAF2; outline: none; transition: all 0.3s ease; }
                .pa-input::placeholder { color: #55505E; }
                .pa-input:focus { border-color: rgba(185,132,255,0.5); box-shadow: 0 0 0 3px rgba(185,132,255,0.08), 0 0 20px rgba(145,85,220,0.06); background: rgba(5,5,10,0.65); }
                .pa-error { font-size: 12px; color: #E879F9; margin-top: 6px; padding-left: 4px; }
                .pa-submit-btn { width: 100%; height: 56px; border: none; border-radius: 14px; background: linear-gradient(135deg, #7C3AED 0%, #9B6FE8 40%, #C084FC 70%, #B88CFF 100%); color: white; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s ease; box-shadow: 0 4px 24px rgba(145,85,220,0.3); margin-top: 8px; }
                .pa-submit-btn:hover { box-shadow: 0 6px 30px rgba(145,85,220,0.35); transform: translateY(-1px); }
                .pa-submit-btn:active { transform: translateY(0) scale(0.99); }
                .pa-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
                .pa-back-link { text-align: center; margin-top: 20px; }
                .pa-back-link a { color: #B88CFF; font-size: 13px; text-decoration: none; font-weight: 500; transition: color 0.3s; }
                .pa-back-link a:hover { color: #C6A7FF; }
                .pa-spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: pa-spin 0.7s linear infinite; }
                @keyframes pa-spin { to { transform: rotate(360deg); } }
                .pa-anim-left { animation: pa-fadeUp 0.9s cubic-bezier(0.2,0.8,0.2,1) forwards; opacity: 0; }
                .pa-anim-card { animation: pa-fadeUp 0.9s cubic-bezier(0.2,0.8,0.2,1) 0.15s forwards; opacity: 0; }
                @keyframes pa-fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
                @media (max-width: 768px) {
                    .pa-fp-root { flex-direction: column; }
                    .pa-left { width: 100%; min-height: auto; padding: 48px 24px 32px; }
                    .pa-right { width: 100%; min-height: auto; padding: 0 16px 48px; }
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

            <div className="pa-fp-root">
                <div className="pa-bg" />

                <div className="pa-left pa-anim-left">
                    <div className="pa-brand">
                        <div style={{ marginBottom: 24 }}>
                            <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="55" cy="55" r="54" stroke="#B88CFF" strokeWidth="1" opacity="0.4"/>
                                <circle cx="55" cy="55" r="44" stroke="#C6A7FF" strokeWidth="0.5" opacity="0.3"/>
                                <text x="55" y="58" textAnchor="middle" dominantBaseline="middle" fill="#B88CFF" fontFamily="'Cormorant Garamond', serif" fontSize="26" fontWeight="500" letterSpacing="2">P A</text>
                            </svg>
                        </div>
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

                <div className="pa-right pa-anim-card">
                    <div className="pa-card">
                        <h1 className="pa-card-heading">Forgot Password?</h1>
                        <p className="pa-card-sub">No worries — enter your email and we'll<br />send you a reset link.</p>

                        {status && (
                            <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 14, padding: '14px 18px', marginBottom: 20, fontSize: 13, color: '#22C55E', fontWeight: 500 }}>
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="pa-field">
                                <div className="pa-input-wrap">
                                    <span className="pa-input-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                    </span>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoFocus
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="pa-input"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                {errors.email && <div className="pa-error">{errors.email}</div>}
                            </div>

                            <button type="submit" className="pa-submit-btn" disabled={processing}>
                                {processing ? <div className="pa-spinner" /> : <span>Send Reset Link</span>}
                            </button>
                        </form>

                        <div className="pa-back-link">
                            <Link href={route('login')}>← Back to sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
