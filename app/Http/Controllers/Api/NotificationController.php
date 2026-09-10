<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DeviceToken;
use App\Models\NotificationLog;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function registerToken(Request $request)
    {
        $request->validate([
            'token' => ['required', 'string'],
        ]);

        DeviceToken::updateOrCreate(
            ['user_id' => $request->user()->id, 'token' => $request->token],
            [
                'platform' => PHP_OS_FAMILY === 'Darwin' ? 'ios' : 'android',
                'is_active' => true,
            ]
        );

        return response()->json(['message' => 'Token registered']);
    }

    public function index(Request $request)
    {
        $notifications = NotificationLog::where('user_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->limit(50)
            ->get();

        return response()->json($notifications);
    }

    public function unreadCount(Request $request)
    {
        $count = NotificationLog::where('user_id', $request->user()->id)
            ->unread()
            ->count();

        return response()->json(['count' => $count]);
    }

    public function markAsRead(Request $request, $id)
    {
        $notification = NotificationLog::where('user_id', $request->user()->id)->findOrFail($id);
        $notification->update(['is_read' => true]);

        return response()->json(['message' => 'Marked as read']);
    }

    public function markAllAsRead(Request $request)
    {
        NotificationLog::where('user_id', $request->user()->id)
            ->unread()
            ->update(['is_read' => true]);

        return response()->json(['message' => 'All marked as read']);
    }
}
