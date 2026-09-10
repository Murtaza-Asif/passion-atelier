<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['variants' => fn ($q) => $q->ordered(), 'variants.color', 'category', 'collection'])
            ->where('status', 'published')
            ->ordered();

        if ($request->has('category')) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $request->category));
        }

        if ($request->has('collection')) {
            $query->whereHas('collection', fn ($q) => $q->where('slug', $request->collection));
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('short_description', 'like', "%{$search}%");
            });
        }

        if ($request->has('sort')) {
            match ($request->sort) {
                'price-asc' => $query->orderByRaw('COALESCE(sale_price, regular_price) ASC'),
                'price-desc' => $query->orderByRaw('COALESCE(sale_price, regular_price) DESC'),
                'name' => $query->orderBy('title'),
                default => $query->ordered(),
            };
        }

        $products = $query->get()->map->toFrontendArray();

        return response()->json($products);
    }

    public function featured()
    {
        $products = Product::with(['variants' => fn ($q) => $q->ordered(), 'variants.color'])
            ->where('status', 'published')
            ->where('is_featured', true)
            ->ordered()
            ->get()
            ->map->toFrontendArray();

        return response()->json($products);
    }

    public function newArrivals()
    {
        $products = Product::with(['variants' => fn ($q) => $q->ordered(), 'variants.color'])
            ->where('status', 'published')
            ->where('is_new_arrival', true)
            ->ordered()
            ->get()
            ->map->toFrontendArray();

        return response()->json($products);
    }

    public function bestSellers()
    {
        $products = Product::with(['variants' => fn ($q) => $q->ordered(), 'variants.color'])
            ->where('status', 'published')
            ->where('is_best_seller', true)
            ->ordered()
            ->get()
            ->map->toFrontendArray();

        return response()->json($products);
    }

    public function trending()
    {
        $products = Product::with(['variants' => fn ($q) => $q->ordered(), 'variants.color'])
            ->where('status', 'published')
            ->where('is_trending', true)
            ->ordered()
            ->get()
            ->map->toFrontendArray();

        return response()->json($products);
    }

    public function show(string $slug)
    {
        $product = Product::with(['variants' => fn ($q) => $q->ordered(), 'variants.color'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product->toFrontendArray());
    }
}
