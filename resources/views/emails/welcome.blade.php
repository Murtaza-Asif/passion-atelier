<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Epilogue', 'Georgia', serif; background: #faf9f7; margin: 0; padding: 0; color: #1a1a1a; }
        .container { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .header { background: #1a1a1a; padding: 32px 40px; text-align: center; }
        .header h1 { color: #ffffff; font-size: 22px; margin: 0; letter-spacing: 0.5px; }
        .body { padding: 40px; }
        .body h2 { font-size: 18px; margin: 0 0 8px; }
        .body p { font-size: 14px; line-height: 1.7; color: #555; margin: 0 0 16px; }
        .btn { display: inline-block; background: #1a1a1a; color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 40px; font-size: 13px; font-weight: 600; }
        .footer { padding: 24px 40px; border-top: 1px solid #eee; text-align: center; font-size: 12px; color: #999; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>PASSION Atelier</h1>
        </div>
        <div class="body">
            <h2>Welcome, {{ $user->name }}!</h2>
            <p>Your account at PASSION Atelier has been created. You can now browse our collection of premium fabrics, save your favourites, and track your orders.</p>
            @if($password)
            <p>Your temporary password: <strong>{{ $password }}</strong></p>
            <p style="margin-top: 20px;"><a href="{{ route('login') }}" class="btn">Sign In to Your Account</a></p>
            @endif
            <p style="margin-top: 20px;">We look forward to crafting something extraordinary with you.</p>
            <p>— The PASSION Atelier Team</p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} PASSION Atelier. All rights reserved.
        </div>
    </div>
</body>
</html>