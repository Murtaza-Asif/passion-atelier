<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Product::with(['variants' => fn ($q) => $q->ordered(), 'variants.color'])
            ->where('status', 'published')
            ->ordered()
            ->get()
            ->map->toFrontendArray();

        return Inertia::render('services', [
            'services' => $services,
        ]);
    }

    public function show(string $slug)
    {
        $product = Product::with(['variants' => fn ($q) => $q->ordered(), 'variants.color'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->first();

        if (! $product) {
            return Inertia::render('product-detail', [
                'slug' => $slug,
                'service' => null,
            ]);
        }

        return Inertia::render('product-detail', [
            'slug' => $slug,
            'service' => $product->toFrontendArray(),
        ]);
    }
}
