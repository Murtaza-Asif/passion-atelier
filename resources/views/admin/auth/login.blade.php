<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8" />
    <title>Admin Login — {{ config('app.name') }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="{{ asset('assets/images/login-logo.png') }}">
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pa-root { display: flex; min-height: 100vh; }

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
        .pa-eye-btn { position: absolute; right: 16px; background: none; border: none; color: #55505E; cursor: pointer; padding: 4px; display: flex; align-items: center; transition: color 0.3s; }
        .pa-eye-btn:hover { color: #A9A4B3; }
        .pa-check-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .pa-check { width: 16px; height: 16px; border-radius: 4px; background: rgba(5,5,10,0.5); border: 1px solid rgba(160,150,180,0.18); cursor: pointer; accent-color: #B88CFF; }
        .pa-check-label { font-size: 13px; color: #A9A4B3; cursor: pointer; }
        .pa-error { font-size: 12px; color: #E879F9; margin-top: 6px; padding-left: 4px; }
        .pa-alert-error { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); border-radius: 14px; padding: 14px 18px; margin-bottom: 20px; font-size: 13px; color: #FCA5A5; }
        .pa-alert-success { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.2); border-radius: 14px; padding: 14px 18px; margin-bottom: 20px; font-size: 13px; color: #22C55E; font-weight: 500; }
        .pa-submit-btn { width: 100%; height: 56px; border: 1px solid rgba(185,132,255,0.25); border-radius: 999px; background: rgba(124,58,237,0.15); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); color: white; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s ease; box-shadow: 0 4px 24px rgba(145,85,220,0.2), inset 0 1px 0 rgba(255,255,255,0.08); margin-top: 8px; }
        .pa-submit-btn:hover { background: rgba(124,58,237,0.25); border-color: rgba(185,132,255,0.4); box-shadow: 0 6px 32px rgba(145,85,220,0.3), inset 0 1px 0 rgba(255,255,255,0.1); transform: translateY(-1px); }
        .pa-submit-btn:active { transform: translateY(0) scale(0.99); }
        .pa-footer-link { text-align: center; margin-top: 20px; }
        .pa-footer-link a { color: #B88CFF; font-size: 13px; text-decoration: none; font-weight: 500; transition: color 0.3s; }
        .pa-footer-link a:hover { color: #C6A7FF; }
        .pa-spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: pa-spin 0.7s linear infinite; }
        @keyframes pa-spin { to { transform: rotate(360deg); } }
        @keyframes pa-fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .pa-anim-left { animation: pa-fadeUp 0.9s cubic-bezier(0.2,0.8,0.2,1) forwards; opacity: 0; }
        .pa-anim-card { animation: pa-fadeUp 0.9s cubic-bezier(0.2,0.8,0.2,1) 0.15s forwards; opacity: 0; }

        @media (max-width: 768px) {
            .pa-root { flex-direction: column; }
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
    </style>
</head>
<body>
    <div class="pa-root">
        <div class="pa-bg"></div>

        <div class="pa-left pa-anim-left">
            <div class="pa-brand">
                <div style="margin-bottom: 24px;">
                    <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="55" cy="55" r="54" stroke="#B88CFF" stroke-width="1" opacity="0.4"/>
                        <circle cx="55" cy="55" r="44" stroke="#C6A7FF" stroke-width="0.5" opacity="0.3"/>
                        <text x="55" y="58" text-anchor="middle" dominant-baseline="middle" fill="#B88CFF" font-family="'Cormorant Garamond', serif" font-size="26" font-weight="500" letter-spacing="2">P A</text>
                    </svg>
                </div>
                <div class="pa-brand-name">PASSION</div>
                <div class="pa-brand-sub">
                    <span class="pa-brand-sub-line" />
                    <span class="pa-brand-sub-text">ATELIER</span>
                    <span class="pa-brand-sub-line" />
                </div>
                <div class="pa-brand-tagline">Unstitched Men's Fabrics</div>
            </div>
            <div class="pa-divider">
                <span class="pa-divider-line" /><span class="pa-divider-icon">✦ ✦ ✦</span><span class="pa-divider-line" />
            </div>
            <div class="pa-slogan">
                Woven with Precision,<br />Crafted with Excellence,<br />
                <span class="pa-slogan-accent">Designed for a Standard<br />Beyond Ordinary.</span>
            </div>
            <div class="pa-features">
                <div class="pa-feature"><div class="pa-feature-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" /></svg></div><div class="pa-feature-label">Premium<br />Quality</div></div>
                <div class="pa-feature"><div class="pa-feature-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg></div><div class="pa-feature-label">Finest<br />Weave</div></div>
                <div class="pa-feature"><div class="pa-feature-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="6" cy="6" r="3" /><path d="M8.12 8.12 12 12" /><path d="M20 4 8.12 15.88" /><circle cx="6" cy="18" r="3" /><path d="M14.8 14.8 20 20" /></svg></div><div class="pa-feature-label">Tailored<br />For You</div></div>
                <div class="pa-feature"><div class="pa-feature-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" /><path d="M3 21h18" /></svg></div><div class="pa-feature-label">Timeless<br />Elegance</div></div>
            </div>
            <div class="pa-bottom">Passion Atelier &nbsp;·&nbsp; Estd. 2026</div>
        </div>

        <div class="pa-right pa-anim-card">
            <div class="pa-card">
                <h1 class="pa-card-heading">Welcome Back</h1>
                <p class="pa-card-sub">Sign in to manage your store and orders.</p>

                @if ($errors->any())
                <div class="pa-alert-error">
                    @foreach ($errors->all() as $error)
                    {{ $error }}<br>
                    @endforeach
                </div>
                @endif

                @if (session('status'))
                <div class="pa-alert-success">
                    {{ session('status') }}
                </div>
                @endif

                <form method="POST" action="{{ route('admin.login.attempt') }}">
                    @csrf

                    <div class="pa-field">
                        <div class="pa-input-wrap">
                            <span class="pa-input-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            </span>
                            <input id="email" type="email" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="admin@passionatelier.com" class="pa-input">
                        </div>
                        @error('email')
                        <div class="pa-error">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="pa-field">
                        <div class="pa-input-wrap">
                            <span class="pa-input-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            </span>
                            <input id="password" type="password" name="password" required autocomplete="current-password" placeholder="Enter your password" class="pa-input" style="padding-right: 52px;">
                            <button type="button" class="pa-eye-btn" onclick="togglePassword()">
                                <svg id="eye-open" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                <svg id="eye-closed" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                            </button>
                        </div>
                        @error('password')
                        <div class="pa-error">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="pa-check-row">
                        <input class="pa-check" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                        <label class="pa-check-label" for="remember">Remember me</label>
                    </div>

                    <button type="submit" class="pa-submit-btn" id="submit-btn">
                        <span>Sign In</span>
                    </button>
                </form>

                <div class="pa-footer-link">
                    <a href="{{ route('register') }}">Create an Account →</a>
                </div>
            </div>
        </div>
    </div>

    <script>
        function togglePassword() {
            const pw = document.getElementById('password');
            const open = document.getElementById('eye-open');
            const closed = document.getElementById('eye-closed');
            if (pw.type === 'password') {
                pw.type = 'text';
                open.style.display = 'none';
                closed.style.display = 'block';
            } else {
                pw.type = 'password';
                open.style.display = 'block';
                closed.style.display = 'none';
            }
        }
        document.getElementById('submit-btn').addEventListener('click', function() {
            this.innerHTML = '<div class="pa-spinner"></div>';
            this.disabled = true;
        });
    </script>
</body>
</html>
