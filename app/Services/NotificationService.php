<?php

namespace App\Services;

use App\Models\DeviceToken;
use App\Models\NotificationLog;
use App\Models\User;

class NotificationService
{
    public static function sendPushNotification(User $user, string $title, string $body, array $data = []): void
    {
        // Save to in-app notifications
        NotificationLog::create([
            'user_id' => $user->id,
            'title' => $title,
            'body' => $body,
            'type' => $data['type'] ?? 'order_update',
            'data' => $data,
        ]);

        // Get user's active device tokens
        $tokens = DeviceToken::where('user_id', $user->id)
            ->active()
            ->pluck('token')
            ->toArray();

        if (empty($tokens)) {
            return;
        }

        // Send via Expo Push Notification Service
        $messages = array_map(fn($token) => [
            'to' => $token,
            'title' => $title,
            'body' => $body,
            'data' => $data,
            'sound' => 'default',
            'badge' => 1,
            'channelId' => 'order-updates',
        ], $tokens);

        // Send in chunks of 100 (Expo limit)
        $chunks = array_chunk($messages, 100);
        foreach ($chunks as $chunk) {
            self::sendToExpo($chunk);
        }
    }

    private static function sendToExpo(array $messages): void
    {
        $ch = curl_init('https://exp.host/--/api/v2/push/send');
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => [
                'Accept: application/json',
                'Content-Type: application/json',
            ],
            CURLOPT_POSTFIELDS => json_encode($messages),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
        ]);
        curl_exec($ch);
        curl_close($ch);
    }

    public static function sendOrderStatusUpdate(User $user, $order, string $newStatus): void
    {
        $statusMessages = [
            'confirmed' => 'Your order #' . $order->order_number . ' has been confirmed!',
            'processing' => 'Your order #' . $order->order_number . ' is now being processed.',
            'shipped' => 'Great news! Your order #' . $order->order_number . ' has been shipped.',
            'delivered' => 'Your order #' . $order->order_number . ' has been delivered. Enjoy!',
            'cancelled' => 'Your order #' . $order->order_number . ' has been cancelled.',
        ];

        $title = 'Order ' . ucfirst($newStatus);
        $body = $statusMessages[$newStatus] ?? 'Your order #' . $order->order_number . ' status has been updated to ' . $newStatus;

        self::sendPushNotification($user, $title, $body, [
            'type' => 'order_update',
            'order_id' => $order->id,
            'order_number' => $order->order_number,
            'status' => $newStatus,
        ]);
    }
}
