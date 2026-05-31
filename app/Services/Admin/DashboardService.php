<?php

namespace App\Services\Admin;

use App\Models\User;

class DashboardService
{
    public function getStats(): array
    {
        return [
            'totalSales' => 1452,
            'newOrders' => 938,
            'newUsers' => User::count(),
            'uniqueVisitors' => 29670,
        ];
    }

    public function getEmailSent(): array
    {
        return [
            'marketplace' => 25117,
            'lastWeek' => 34856,
            'lastMonth' => 18225,
        ];
    }

    public function getLatestTransactions(): array
    {
        return [
            ['name' => 'Charles Casey', 'position' => 'Web Developer', 'status' => 'Active', 'age' => 23, 'startDate' => '04 Apr, 2021', 'salary' => '$42,450'],
            ['name' => 'Alex Adams', 'position' => 'Python Developer', 'status' => 'Deactive', 'age' => 28, 'startDate' => '01 Aug, 2021', 'salary' => '$25,060'],
            ['name' => 'Prezy Kelsey', 'position' => 'Senior Javascript Developer', 'status' => 'Active', 'age' => 35, 'startDate' => '15 Jun, 2021', 'salary' => '$59,350'],
            ['name' => 'Ruhi Fancher', 'position' => 'React Developer', 'status' => 'Active', 'age' => 25, 'startDate' => '01 March, 2021', 'salary' => '$23,700'],
            ['name' => 'Juliet Pineda', 'position' => 'Senior Web Designer', 'status' => 'Active', 'age' => 38, 'startDate' => '01 Jan, 2021', 'salary' => '$69,185'],
            ['name' => 'Den Simpson', 'position' => 'Web Designer', 'status' => 'Deactive', 'age' => 21, 'startDate' => '01 Sep, 2021', 'salary' => '$37,845'],
            ['name' => 'Mahek Torres', 'position' => 'Senior Laravel Developer', 'status' => 'Active', 'age' => 32, 'startDate' => '20 May, 2021', 'salary' => '$55,100'],
        ];
    }

    public function getMonthlyEarnings(): array
    {
        return [
            'marketplace' => 3475,
            'lastWeek' => 458,
            'lastMonth' => 9062,
        ];
    }
}
