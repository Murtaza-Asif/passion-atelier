<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index($productId)
    {
        $product = Product::where('slug', $productId)->orWhere('id', $productId)->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $reviews = Review::where('product_id', $product->id)
            ->approved()
            ->with('user:name')
            ->orderByDesc('created_at')
            ->get();

        return response()->json($reviews);
    }

    public function store(Request $request, $productId)
    {
        $product = Product::where('slug', $productId)->orWhere('id', $productId)->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string', 'max:2000'],
        ]);

        $review = Review::create([
            'product_id' => $product->id,
            'user_id' => $request->user()->id,
            'rating' => $validated['rating'],
            'title' => $validated['title'],
            'body' => $validated['body'],
            'is_approved' => false,
        ]);

        return response()->json([
            'message' => 'Review submitted for approval',
            'review' => $review,
        ], 201);
    }
}
