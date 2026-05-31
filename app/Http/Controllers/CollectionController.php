<?php
namespace App\Http\Controllers;
use App\Models\Product;
use Inertia\Inertia;

class CollectionController extends Controller
{
    public function __invoke()
    {
        $services = Product::with(['variants' => fn ($q) => $q->ordered(), 'variants.color'])
            ->where('status', 'published')
            ->ordered()
            ->get()
            ->map->toFrontendArray();

        return Inertia::render('collections', [
            'services' => $services,
        ]);
    }
}
