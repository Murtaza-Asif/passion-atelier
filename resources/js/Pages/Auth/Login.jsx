import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

function PLogo({ size = 120, className = '' }) {
    return (
        <img
            src="/assets/images/pa-logo.png"
            alt="PA"
            width={size}
            height={size}
            className={className}
            style={{ width: size, height: size, objectFit: 'contain' }}
        />
    );
}

function EmailIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    );
}

function EyeIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function EyeOffIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
            <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
            <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
            <path d="m2 2 20 20" />
        </svg>
    );
}

function ArrowIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        </svg>
    );
}

function CottonIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4" /><path d="m6.8 15-3.5 2" /><path d="m20.7 17-3.5-2" /><path d="m6.8 9-3.5-2" /><path d="m20.7 7-3.5 2" /><path d="m12 22v-4" /><circle cx="12" cy="12" r="4" />
        </svg>
    );
}

function WeaveIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        </svg>
    );
}

function ScissorsIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="6" r="3" /><path d="M8.12 8.12 12 12" /><path d="M20 4 8.12 15.88" /><circle cx="6" cy="18" r="3" /><path d="M14.8 14.8 20 20" />
        </svg>
    );
}

function CrownIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
            <path d="M3 21h18" />
        </svg>
    );
}

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <>
            <Head title="Login" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');

                * { margin: 0; padding: 0; box-sizing: border-box; }

                .pa-login-root {
                    font-family: 'Inter', sans-serif;
                    min-height: 100vh;
                    width: 100%;
                    display: flex;
                    background: #050507;
                    overflow: hidden;
                    position: relative;
                }

                /* === BACKGROUND === */
                .pa-bg {
                    position: fixed; inset: 0; z-index: 0;
                    background: url('/assets/images/login-bg.jpg') center/cover no-repeat;
                }
                .pa-bg::before {
                    content: '';
                    position: absolute; inset: 0;
                    background: rgba(5, 5, 8, 0.35);
                }
                .pa-bg::after {
                    content: '';
                    position: absolute; inset: 0;
                    background:
                        linear-gradient(90deg, rgba(5,5,8,0.15) 0%, transparent 30%, rgba(5,5,8,0.45) 100%),
                        radial-gradient(ellipse 100% 100% at 50% 100%, rgba(5,5,8,0.3) 0%, transparent 60%);
                }

                /* === LEFT PANEL === */
                .pa-left {
                    width: 58%;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 60px 80px;
                    position: relative;
                    z-index: 1;
                }

                .pa-brand { text-align: center; }

                .pa-brand-logo { margin-bottom: 24px; }

                .pa-brand-name {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 64px;
                    font-weight: 400;
                    color: #F4F1F7;
                    letter-spacing: 16px;
                    line-height: 1;
                    margin-bottom: 6px;
                }

                .pa-brand-sub {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 16px;
                    margin-bottom: 10px;
                }
                .pa-brand-sub-line {
                    width: 50px; height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(185,132,255,0.5), transparent);
                }
                .pa-brand-sub-text {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 26px;
                    font-weight: 400;
                    color: #C6A7FF;
                    letter-spacing: 12px;
                }

                .pa-brand-tagline {
                    font-family: 'Inter', sans-serif;
                    font-size: 12px;
                    font-weight: 500;
                    color: #77717F;
                    letter-spacing: 6px;
                    text-transform: uppercase;
                }

                /* Decorative divider */
                .pa-divider {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin: 36px 0;
                    width: 100%;
                    max-width: 320px;
                }
                .pa-divider-line {
                    flex: 1; height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(185,132,255,0.35), transparent);
                }
                .pa-divider-icon {
                    color: rgba(185,132,255,0.5);
                    font-size: 14px;
                    letter-spacing: 4px;
                }

                /* Slogan */
                .pa-slogan {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 26px;
                    font-weight: 400;
                    font-style: italic;
                    line-height: 1.65;
                    text-align: center;
                    max-width: 480px;
                    color: #F4F1F7;
                }
                .pa-slogan-accent { color: #C6A7FF; }

                /* Features */
                .pa-features {
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    gap: 0;
                    margin-top: 48px;
                    width: 100%;
                    max-width: 520px;
                }
                .pa-feature {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    padding: 0 16px;
                    position: relative;
                }
                .pa-feature:not(:last-child)::after {
                    content: '';
                    position: absolute;
                    right: 0; top: 8px;
                    width: 1px; height: 48px;
                    background: rgba(185,132,255,0.15);
                }
                .pa-feature-icon {
                    width: 56px; height: 56px;
                    border-radius: 50%;
                    border: 1px solid rgba(185,132,255,0.25);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 14px;
                    color: #B88CFF;
                }
                .pa-feature-label {
                    font-family: 'Inter', sans-serif;
                    font-size: 10px;
                    font-weight: 600;
                    color: #A9A4B3;
                    letter-spacing: 2.5px;
                    text-transform: uppercase;
                    line-height: 1.5;
                }

                /* Bottom brand detail */
                .pa-bottom {
                    position: absolute;
                    bottom: 32px;
                    left: 0; right: 0;
                    text-align: center;
                    font-family: 'Inter', sans-serif;
                    font-size: 10px;
                    font-weight: 500;
                    color: #55505E;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    z-index: 2;
                }

                /* === LOGIN CARD === */
                .pa-right {
                    width: 42%;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 50px;
                    position: relative;
                    z-index: 1;
                }

                .pa-card {
                    width: 100%;
                    max-width: 520px;
                    background: rgba(10, 9, 17, 0.65);
                    border: 1px solid rgba(185, 132, 255, 0.2);
                    border-radius: 26px;
                    padding: 44px 48px;
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    box-shadow:
                        0 0 60px rgba(145, 85, 220, 0.1),
                        0 0 120px rgba(100, 40, 180, 0.06),
                        0 25px 60px rgba(0, 0, 0, 0.5),
                        inset 0 1px 0 rgba(185, 132, 255, 0.1);
                    position: relative;
                    display: flex;
                    flex-direction: column;
                }

                /* Create Account link — at bottom */
                .pa-create-link {
                    text-align: center;
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(185, 132, 255, 0.1);
                    font-family: 'Inter', sans-serif;
                    font-size: 13px;
                    color: #77717F;
                }
                .pa-create-link a {
                    color: #B88CFF;
                    text-decoration: none;
                    font-weight: 500;
                    margin-left: 6px;
                    transition: color 0.3s;
                }
                .pa-create-link a:hover { color: #C6A7FF; }
                .pa-create-arrow {
                    display: inline-block;
                    margin-left: 4px;
                    transition: transform 0.3s;
                }
                .pa-create-link a:hover .pa-create-arrow { transform: translateX(3px); }

                /* Card logo */
                .pa-card-logo {
                    text-align: center;
                    margin-bottom: 28px;
                    margin-top: 12px;
                }
                .pa-card-logo img { margin-bottom: 12px; }
                .pa-card-logo-name {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 20px;
                    font-weight: 500;
                    color: #F4F1F7;
                    letter-spacing: 6px;
                    margin-bottom: 4px;
                }
                .pa-card-logo-sub {
                    font-family: 'Inter', sans-serif;
                    font-size: 8px;
                    font-weight: 500;
                    color: #77717F;
                    letter-spacing: 3.5px;
                    text-transform: uppercase;
                }

                /* Heading */
                .pa-card-heading {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 36px;
                    font-weight: 500;
                    color: #F4F1F7;
                    margin-bottom: 8px;
                    line-height: 1.1;
                    text-align: center;
                }
                .pa-card-sub {
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    color: #77717F;
                    line-height: 1.6;
                    margin-bottom: 32px;
                    text-align: center;
                }

                /* Form fields */
                .pa-field {
                    margin-bottom: 18px;
                }
                .pa-input-wrap {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .pa-input-icon {
                    position: absolute;
                    left: 18px;
                    color: #55505E;
                    transition: color 0.3s;
                    pointer-events: none;
                    display: flex;
                    align-items: center;
                }
                .pa-input-wrap:focus-within .pa-input-icon { color: #B88CFF; }

                .pa-input {
                    width: 100%;
                    height: 56px;
                    background: rgba(5, 5, 10, 0.5);
                    border: 1px solid rgba(160, 150, 180, 0.18);
                    border-radius: 14px;
                    padding: 0 18px 0 52px;
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    color: #EEEAF2;
                    outline: none;
                    transition: all 0.3s ease;
                }
                .pa-input::placeholder { color: #55505E; }
                .pa-input:focus {
                    border-color: rgba(185, 132, 255, 0.5);
                    box-shadow: 0 0 0 3px rgba(185, 132, 255, 0.08), 0 0 20px rgba(145, 85, 220, 0.06);
                    background: rgba(5, 5, 10, 0.65);
                }

                .pa-eye-btn {
                    position: absolute;
                    right: 16px;
                    background: none;
                    border: none;
                    color: #55505E;
                    cursor: pointer;
                    padding: 4px;
                    display: flex;
                    align-items: center;
                    transition: color 0.3s;
                }
                .pa-eye-btn:hover { color: #A9A4B3; }

                .pa-error {
                    font-size: 12px;
                    color: #E879F9;
                    margin-top: 6px;
                    padding-left: 4px;
                }

                /* Remember / Forgot */
                .pa-options {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 24px;
                    margin-top: 4px;
                }
                .pa-remember {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                }
                .pa-checkbox {
                    width: 18px; height: 18px;
                    border-radius: 5px;
                    border: 1.5px solid rgba(160, 150, 180, 0.3);
                    background: rgba(5, 5, 10, 0.5);
                    appearance: none;
                    -webkit-appearance: none;
                    cursor: pointer;
                    transition: all 0.2s;
                    position: relative;
                    flex-shrink: 0;
                }
                .pa-checkbox:checked {
                    background: #9B6FE8;
                    border-color: #9B6FE8;
                }
                .pa-checkbox:checked::after {
                    content: '';
                    position: absolute;
                    left: 5px; top: 2px;
                    width: 5px; height: 9px;
                    border: solid white;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                }
                .pa-remember-text {
                    font-size: 13px;
                    color: #A9A4B3;
                }
                .pa-forgot {
                    font-size: 13px;
                    color: #B88CFF;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.3s;
                }
                .pa-forgot:hover { color: #C6A7FF; }

                /* Login button — glassmorphism pill */
                .pa-login-btn {
                    width: 100%;
                    height: 56px;
                    border: 1px solid rgba(185, 132, 255, 0.25);
                    border-radius: 999px;
                    background: rgba(124, 58, 237, 0.15);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    color: white;
                    font-family: 'Inter', sans-serif;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 24px rgba(145, 85, 220, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08);
                    position: relative;
                    overflow: hidden;
                }
                .pa-login-btn::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
                    transform: translateX(-100%);
                    transition: transform 0.6s;
                }
                .pa-login-btn:hover::before { transform: translateX(100%); }
                .pa-login-btn:hover {
                    background: rgba(124, 58, 237, 0.25);
                    border-color: rgba(185, 132, 255, 0.4);
                    box-shadow: 0 6px 32px rgba(145, 85, 220, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
                    transform: translateY(-1px);
                }
                .pa-login-btn:active { transform: translateY(0) scale(0.99); }
                .pa-login-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
                .pa-login-btn-arrow { transition: transform 0.3s; }
                .pa-login-btn:hover .pa-login-btn-arrow { transform: translateX(3px); }

                /* OR divider */
                .pa-or {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin: 24px 0;
                }
                .pa-or-line {
                    flex: 1; height: 1px;
                    background: rgba(160, 150, 180, 0.15);
                }
                .pa-or-text {
                    font-size: 11px;
                    font-weight: 500;
                    color: #55505E;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }

                /* Google button — glassmorphism pill */
                .pa-google-btn {
                    width: 100%;
                    height: 56px;
                    border: 1px solid rgba(185, 132, 255, 0.2);
                    border-radius: 999px;
                    background: rgba(255, 255, 255, 0.04);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    color: #EEEAF2;
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    transition: all 0.3s ease;
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
                }
                .pa-google-btn:hover {
                    border-color: rgba(185, 132, 255, 0.35);
                    background: rgba(185, 132, 255, 0.08);
                    box-shadow: 0 4px 20px rgba(145, 85, 220, 0.12), inset 0 1px 0 rgba(255,255,255,0.08);
                }

                /* Security */
                .pa-security {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-top: auto;
                    padding-top: 24px;
                    font-size: 12px;
                    color: #55505E;
                }

                /* Spinner */
                .pa-spinner {
                    width: 18px; height: 18px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: pa-spin 0.7s linear infinite;
                }
                @keyframes pa-spin { to { transform: rotate(360deg); } }

                /* Entrance animations */
                @keyframes pa-fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .pa-anim-left {
                    animation: pa-fadeUp 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                    opacity: 0;
                }
                .pa-anim-card {
                    animation: pa-fadeUp 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s forwards;
                    opacity: 0;
                }

                /* === RESPONSIVE === */
                @media (max-width: 1024px) {
                    .pa-left { width: 50%; padding: 40px 50px; }
                    .pa-right { width: 50%; padding: 30px 40px; }
                    .pa-brand-name { font-size: 40px; letter-spacing: 10px; }
                    .pa-card { padding: 36px 36px; min-height: auto; }
                }

                @media (max-width: 768px) {
                    .pa-login-root { flex-direction: column; }
                    .pa-left {
                        width: 100%;
                        min-height: auto;
                        padding: 48px 24px 32px;
                    }
                    .pa-right {
                        width: 100%;
                        min-height: auto;
                        padding: 0 16px 48px;
                    }
                    .pa-brand-name { font-size: 32px; letter-spacing: 8px; }
                    .pa-brand-sub-text { font-size: 16px; letter-spacing: 6px; }
                    .pa-slogan { font-size: 18px; max-width: 300px; }
                    .pa-features { flex-wrap: wrap; gap: 20px; max-width: 340px; }
                    .pa-feature::after { display: none !important; }
                    .pa-feature { min-width: 120px; }
                    .pa-card {
                        padding: 32px 24px;
                        border-radius: 24px;
                    }
                    .pa-card-heading { font-size: 28px; }
                    .pa-bottom { position: static; margin-top: 24px; }
                }
            `}</style>

            <div className="pa-login-root">
                <div className="pa-bg" />

                {/* LEFT SIDE — Brand */}
                <div className="pa-left pa-anim-left">
                    <div className="pa-brand">
                        <div className="pa-brand-logo">
                            <PLogo size={110} />
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
                        <span className="pa-divider-line" />
                        <span className="pa-divider-icon">✦ ✦ ✦</span>
                        <span className="pa-divider-line" />
                    </div>

                    <div className="pa-slogan">
                        Woven with Precision,<br />
                        Crafted with Excellence,<br />
                        <span className="pa-slogan-accent">Designed for a Standard<br />Beyond Ordinary.</span>
                    </div>

                    <div className="pa-features">
                        <div className="pa-feature">
                            <div className="pa-feature-icon"><CottonIcon /></div>
                            <div className="pa-feature-label">Premium<br />Quality</div>
                        </div>
                        <div className="pa-feature">
                            <div className="pa-feature-icon"><WeaveIcon /></div>
                            <div className="pa-feature-label">Finest<br />Weave</div>
                        </div>
                        <div className="pa-feature">
                            <div className="pa-feature-icon"><ScissorsIcon /></div>
                            <div className="pa-feature-label">Tailored<br />For You</div>
                        </div>
                        <div className="pa-feature">
                            <div className="pa-feature-icon"><CrownIcon /></div>
                            <div className="pa-feature-label">Timeless<br />Elegance</div>
                        </div>
                    </div>

                    <div className="pa-bottom">
                        Passion Atelier &nbsp;·&nbsp; Estd. 2026
                    </div>
                </div>

                {/* RIGHT SIDE — Login Card */}
                <div className="pa-right pa-anim-card">
                    <div className="pa-card">
                        <h1 className="pa-card-heading">Welcome Back</h1>
                        <p className="pa-card-sub">Sign in to your account and continue your<br />journey with premium fabrics.</p>

                        {status && (
                            <div style={{ marginBottom: 16, padding: '12px 16px', borderRadius: 12, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', fontSize: 13, color: '#4ade80' }}>
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="pa-field">
                                <div className="pa-input-wrap">
                                    <span className="pa-input-icon"><EmailIcon /></span>
                                    <input
                                        type="email"
                                        className="pa-input"
                                        placeholder="Email Address"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        autoComplete="username"
                                        autoFocus
                                    />
                                </div>
                                {errors.email && <div className="pa-error">{errors.email}</div>}
                            </div>

                            <div className="pa-field">
                                <div className="pa-input-wrap">
                                    <span className="pa-input-icon"><LockIcon /></span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="pa-input"
                                        placeholder="Password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        autoComplete="current-password"
                                        style={{ paddingRight: 52 }}
                                    />
                                    <button
                                        type="button"
                                        className="pa-eye-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {errors.password && <div className="pa-error">{errors.password}</div>}
                            </div>

                            <div className="pa-options">
                                <label className="pa-remember">
                                    <input
                                        type="checkbox"
                                        className="pa-checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="pa-remember-text">Remember me</span>
                                </label>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="pa-forgot">
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <button type="submit" className="pa-login-btn" disabled={processing}>
                                {processing ? (
                                    <><span className="pa-spinner" /> Signing in...</>
                                ) : (
                                    <>Login <span className="pa-login-btn-arrow">→</span></>
                                )}
                            </button>
                        </form>

                        <div className="pa-or">
                            <span className="pa-or-line" />
                            <span className="pa-or-text">OR</span>
                            <span className="pa-or-line" />
                        </div>

                        <a href={route('auth.google')} className="pa-google-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Login with Google
                        </a>

                        <div className="pa-security">
                            <ShieldIcon />
                            Your information is safe with us.
                        </div>

                        <div className="pa-create-link">
                            New here?<Link href={route('register')}> Create Account <span className="pa-create-arrow">→</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
