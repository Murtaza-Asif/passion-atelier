<?php

namespace Tests\Feature;

use App\Models\Collection;
use App\Models\Color;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CollectionDetailTest extends TestCase
{
    use RefreshDatabase;

    public function test_collection_detail_returns_inertia_page()
    {
        $color = Color::create(['name' => 'Test', 'hex_code' => '#000']);
        $collection = Collection::create(['name' => 'Test Collection', 'slug' => 'test-collection', 'status' => true]);
        $product = Product::create([
            'title' => 'Test Product',
            'slug' => 'test-product',
            'collection_id' => $collection->id,
            'status' => 'published',
            'regular_price' => 1000,
            'sort_order' => 0,
        ]);
        ProductVariant::create([
            'product_id' => $product->id,
            'color_id' => $color->id,
            'price' => 1000,
            'sort_order' => 0,
        ]);

        $response = $this->get('/collections/test-collection');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('collection-detail')
            ->has('collection')
            ->has('products')
        );
    }

    public function test_collections_listing_returns_inertia_page()
    {
        Collection::create(['name' => 'Test', 'slug' => 'test', 'status' => true]);

        $response = $this->get('/collections');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('collections')
            ->has('collections')
        );
    }

    public function test_nonexistent_collection_returns_404()
    {
        $response = $this->get('/collections/nonexistent-slug');

        $response->assertStatus(404);
    }
}
