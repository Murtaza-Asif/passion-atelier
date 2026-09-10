<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Models\Product;

class CollectionController extends Controller
{
    public function index()
    {
        $collections = Collection::active()->ordered()->get()->map->toFrontendArray();
        return response()->json($collections);
    }

    public function show(string $slug)
    {
        $collection = Collection::active()->where('slug', $slug)->first();

        if (!$collection) {
            return response()->json(['message' => 'Collection not found'], 404);
        }

        $products = Product::with(['variants' => fn ($q) => $q->ordered(), 'variants.color'])
            ->where('collection_id', $collection->id)
            ->where('status', 'published')
            ->ordered()
            ->get()
            ->map->toFrontendArray();

        return response()->json([
            'collection' => $collection->toFrontendArray(),
            'products' => $products,
        ]);
    }
}
