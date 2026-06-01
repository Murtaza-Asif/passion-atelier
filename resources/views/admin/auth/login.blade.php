<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8" />
    <title>Admin Login — {{ config('app.name') }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="{{ asset('assets/images/favicon.ico') }}">
    <link href="{{ asset('assets/css/bootstrap-dark.min.css') }}" id="bootstrap-style" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/icons.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/app-dark.min.css') }}" id="app-style" rel="stylesheet" type="text/css" />
    <style>
        body {
            background: #1a1a2e;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 20px;
        }
        .auth-card {
            max-width: 420px;
            width: 100%;
            background: #222736;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.4);
            overflow: hidden;
        }
        .auth-card .card-header {
            background: #2a3042;
            padding: 32px 28px 24px;
            text-align: center;
            border-bottom: 1px solid #2d3548;
        }
        .auth-card .card-header h4 {
            color: #e9ecef;
            font-size: 20px;
            margin: 12px 0 0;
            font-weight: 600;
        }
        .auth-card .card-header p {
            color: #9ca3af;
            font-size: 13px;
            margin: 6px 0 0;
        }
        .auth-card .card-body {
            padding: 28px;
        }
        .auth-card .logo-icon {
            width: 48px;
            height: 48px;
            background: #556ee6;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            color: #fff;
            font-weight: 700;
        }
        .form-label {
            color: #c8ccd4;
            font-size: 13px;
            font-weight: 500;
            margin-bottom: 6px;
        }
        .form-control {
            background: #2a3042;
            border: 1px solid #2d3548;
            color: #e9ecef;
            padding: 10px 14px;
            font-size: 14px;
            border-radius: 6px;
        }
        .form-control:focus {
            background: #2a3042;
            border-color: #556ee6;
            color: #e9ecef;
            box-shadow: 0 0 0 0.15rem rgba(85,110,230,0.15);
        }
        .form-control::placeholder {
            color: #6b7280;
        }
        .input-group-text {
            background: #2a3042;
            border: 1px solid #2d3548;
            color: #9ca3af;
            border-radius: 6px 0 0 6px;
        }
        .form-check-label {
            color: #c8ccd4;
            font-size: 13px;
        }
        .form-check-input {
            background-color: #2a3042;
            border-color: #2d3548;
        }
        .form-check-input:checked {
            background-color: #556ee6;
            border-color: #556ee6;
        }
        .btn-primary {
            background: #556ee6;
            border: none;
            padding: 10px 20px;
            font-weight: 600;
            border-radius: 6px;
        }
        .btn-primary:hover {
            background: #4458b8;
        }
        .auth-footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 16px;
            border-top: 1px solid #2d3548;
        }
        .auth-footer a {
            color: #9ca3af;
            font-size: 13px;
            text-decoration: none;
        }
        .auth-footer a:hover {
            color: #556ee6;
        }
        .text-danger {
            font-size: 12px;
            margin-top: 4px;
        }
        .alert-danger {
            background: rgba(239,68,68,0.1);
            border: 1px solid rgba(239,68,68,0.2);
            color: #fca5a5;
            border-radius: 6px;
            padding: 10px 14px;
            font-size: 13px;
            margin-bottom: 16px;
        }
    </style>
</head>
<body>
    <div class="auth-card">
        <div class="card-header">
            <div class="logo-icon">P</div>
            <h4>Admin Login</h4>
            <p>Sign in to continue to {{ config('app.name') }} Admin</p>
        </div>
        <div class="card-body">
            @if ($errors->any())
            <div class="alert-danger">
                @foreach ($errors->all() as $error)
                {{ $error }}<br>
                @endforeach
            </div>
            @endif

            @if (session('status'))
            <div class="alert-success">
                {{ session('status') }}
            </div>
            @endif

            <form method="POST" action="{{ route('admin.login.attempt') }}">
                @csrf

                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="ri-mail-line"></i></span>
                        <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="Enter email">
                    </div>
                    @error('email')
                    <div class="text-danger">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="ri-lock-line"></i></span>
                        <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password" placeholder="Enter password">
                    </div>
                    @error('password')
                    <div class="text-danger">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3 form-check">
                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                    <label class="form-check-label" for="remember">Remember me</label>
                </div>

                <div class="d-grid">
                    <button type="submit" class="btn btn-primary">Sign In</button>
                </div>
            </form>

            <div class="auth-footer">
                <a href="{{ route('register') }}">Create an Account</a>
            </div>
        </div>
    </div>
</body>
</html>
