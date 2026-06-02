<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Jobs\SendWelcomeEmail;
use App\Models\User;
use App\Notifications\NewUserRegistered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirectToGoogle()
    {
        session(['socialite_intended' => url()->previous()]);

        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $existingUser = User::where('google_id', $googleUser->getId())->orWhere('email', $googleUser->getEmail())->first();

        if ($existingUser && $existingUser->google_id) {
            Auth::login($existingUser);

            return redirect(session('socialite_intended', route('home')));
        }

        $password = Str::password(12);

        $user = User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'password' => Hash::make($password),
                'email_verified_at' => now(),
            ]
        );

        $wasRecentlyCreated = $user->wasRecentlyCreated;

        Auth::login($user);

        if ($wasRecentlyCreated) {
            dispatch(new SendWelcomeEmail($user, $password));

            User::where('is_admin', true)->get()->each(
                fn ($admin) => $admin->notify(new NewUserRegistered($user))
            );
        }

        return redirect(session('socialite_intended', route('home')));
    }
}
