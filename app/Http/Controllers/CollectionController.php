<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Product;
use Inertia\Inertia;

class CollectionController extends Controller
{
    public function index()
    {
        $collections = Collection::active()
            ->ordered()
            ->get()
            ->map->toFrontendArray();

        return Inertia::render('collections', [
            'collections' => $collections,
        ]);
    }

    public function show(string $slug)
    {
        $collection = Collection::active()
            ->where('slug', $slug)
            ->first();

        if (!$collection) {
            return Inertia::render('under-development', ['status' => 404])
                ->toResponse(request())
                ->setStatusCode(404);
        }

        $products = Product::with(['variants' => fn ($q) => $q->ordered(), 'variants.color'])
            ->where('collection_id', $collection->id)
            ->where('status', 'published')
            ->ordered()
            ->get()
            ->map->toFrontendArray();

        return Inertia::render('collection-detail', [
            'collection' => $collection->toFrontendArray(),
            'products' => $products,
        ]);
    }
}
