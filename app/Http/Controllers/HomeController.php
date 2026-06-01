<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\Admin\CollectionService;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __construct(
        protected CollectionService $collectionService
    ) {}

    public function __invoke()
    {
        $services = Product::with(['variants' => fn ($q) => $q->ordered(), 'variants.color'])
            ->where('status', 'published')
            ->ordered()
            ->get()
            ->map->toFrontendArray();

        $collections = $this->collectionService->getAll()->map->toFrontendArray()->values();

        return Inertia::render('home', [
            'services' => $services,
            'collections' => $collections,
        ]);
    }
}
