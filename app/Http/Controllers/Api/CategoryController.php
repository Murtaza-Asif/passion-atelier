<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::active()->ordered()->parents()
            ->withCount(['products' => fn ($q) => $q->where('status', 'published')])
            ->get()
            ->map(function ($cat) {
                return [
                    'id' => $cat->id,
                    'name' => $cat->name,
                    'slug' => $cat->slug,
                    'description' => $cat->description,
                    'image_url' => $cat->image_url,
                    'product_count' => $cat->products_count,
                ];
            });

        return response()->json($categories);
    }

    public function show(string $slug)
    {
        $category = Category::active()->where('slug', $slug)->first();

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $products = Product::with(['variants' => fn ($q) => $q->ordered(), 'variants.color'])
            ->where('category_id', $category->id)
            ->where('status', 'published')
            ->ordered()
            ->get()
            ->map->toFrontendArray();

        return response()->json([
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
                'image_url' => $category->image_url,
            ],
            'products' => $products,
        ]);
    }
}
