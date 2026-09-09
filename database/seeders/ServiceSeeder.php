<?php

namespace Database\Seeders;

use App\Models\Attribute;
use App\Models\AttributeGroup;
use App\Models\AttributeValue;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Color;
use App\Models\Coupon;
use App\Models\HomepageSection;
use App\Models\HomepageSectionProduct;
use App\Models\Offer;
use App\Models\Product;
use App\Models\ProductFaq;
use App\Models\ProductType;
use App\Models\ProductVariant;
use App\Models\Review;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(['email' => 'admin@passionatelier.com'], [
            'name' => 'Admin',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            'is_admin' => true,
        ]);

        // ── Product Types ────────────────────────────────────────────
        $fabricType = ProductType::create(['name' => 'Unstitched Fabric', 'description' => 'Premium unstitched fabric by the meter', 'sort_order' => 0, 'is_active' => true]);
        ProductType::create(['name' => 'Stitched Suit', 'description' => 'Ready-to-wear stitched suits', 'sort_order' => 1, 'is_active' => true]);
        ProductType::create(['name' => 'Perfume', 'description' => 'Luxury fragrances', 'sort_order' => 2, 'is_active' => true]);
        ProductType::create(['name' => 'Accessory', 'description' => 'Premium accessories', 'sort_order' => 3, 'is_active' => true]);

        // ── Brand ────────────────────────────────────────────────────
        $brand = Brand::create(['name' => 'Passion Atelier', 'description' => 'Premium unstitched fabric atelier', 'status' => true, 'sort_order' => 0]);

        // ── 6 Categories ─────────────────────────────────────────────
        $categories = [];
        $categories[] = Category::create(['name' => 'Cotton Collection', 'description' => 'Premium cotton fabrics for all seasons', 'status' => true, 'sort_order' => 0]);
        $categories[] = Category::create(['name' => 'Linen Series', 'description' => 'Breathable linen fabrics for warm weather', 'status' => true, 'sort_order' => 1]);
        $categories[] = Category::create(['name' => 'Latha Premium', 'description' => 'Premium latha fabrics for formal wear', 'status' => true, 'sort_order' => 2]);
        $categories[] = Category::create(['name' => 'Silk Blend', 'description' => 'Luxurious silk blend fabrics', 'status' => true, 'sort_order' => 3]);
        $categories[] = Category::create(['name' => 'Wool Classic', 'description' => 'Warm wool fabrics for winter', 'status' => true, 'sort_order' => 4]);
        $categories[] = Category::create(['name' => 'Wash & Wear', 'description' => 'Low-maintenance wrinkle-free fabrics', 'status' => true, 'sort_order' => 5]);

        // ── Tags ─────────────────────────────────────────────────────
        $tags = [];
        $tags[] = Tag::create(['name' => 'Best Seller']);
        $tags[] = Tag::create(['name' => 'New Arrival']);
        $tags[] = Tag::create(['name' => 'Limited Edition']);
        $tags[] = Tag::create(['name' => 'Premium']);
        $tags[] = Tag::create(['name' => 'Eco Friendly']);

        // ── Colors ───────────────────────────────────────────────────
        $colorsData = [
            ['name' => 'Ivory', 'hex_code' => '#f5f0e8', 'status' => true, 'sort_order' => 0],
            ['name' => 'White', 'hex_code' => '#f8f8f6', 'status' => true, 'sort_order' => 1],
            ['name' => 'Stone', 'hex_code' => '#c4b8a0', 'status' => true, 'sort_order' => 2],
            ['name' => 'Light Grey', 'hex_code' => '#d0d0cc', 'status' => true, 'sort_order' => 3],
            ['name' => 'Silver', 'hex_code' => '#c0c0c0', 'status' => true, 'sort_order' => 4],
            ['name' => 'Navy', 'hex_code' => '#1a2744', 'status' => true, 'sort_order' => 5],
            ['name' => 'Midnight Blue', 'hex_code' => '#191970', 'status' => true, 'sort_order' => 6],
            ['name' => 'Charcoal', 'hex_code' => '#3a3a3a', 'status' => true, 'sort_order' => 7],
            ['name' => 'Black', 'hex_code' => '#111111', 'status' => true, 'sort_order' => 8],
            ['name' => 'Sage', 'hex_code' => '#8a9a7a', 'status' => true, 'sort_order' => 9],
            ['name' => 'Espresso', 'hex_code' => '#3a2518', 'status' => true, 'sort_order' => 10],
            ['name' => 'Burgundy', 'hex_code' => '#4a1928', 'status' => true, 'sort_order' => 11],
            ['name' => 'Forest', 'hex_code' => '#1a3a2a', 'status' => true, 'sort_order' => 12],
        ];
        foreach ($colorsData as $c) {
            Color::create($c);
        }

        // ── Collections (one per category) ───────────────────────────
        $collectionsData = [
            ['name' => 'Classic Cotton', 'desc' => 'Timeless cotton fabrics for everyday sophistication'],
            ['name' => 'Summer Linen', 'desc' => 'Lightweight breathable linen for warm days'],
            ['name' => 'Royal Latha', 'desc' => 'Opulent latha weaves for ceremonial occasions'],
            ['name' => 'Silk Luxe', 'desc' => 'Luxurious silk blend fabrics with elegant drape'],
            ['name' => 'Winter Wool', 'desc' => 'Warm cozy wool fabrics for colder months'],
            ['name' => 'Daily Fresh', 'desc' => 'Wrinkle-free low-maintenance everyday fabrics'],
        ];

        $collections = [];
        foreach ($collectionsData as $i => $c) {
            $collections[] = Collection::create([
                'name' => $c['name'],
                'description' => $c['desc'],
                'image' => null,
                'banner_images' => [],
                'status' => true,
                'sort_order' => $i,
            ]);
        }

        // ── Product Names per Category ───────────────────────────────
        $productsByCategory = [
            // Cotton Collection (5 products)
            [
                ['title' => 'Classic Cotton Ivory', 'price' => 3500, 'sale' => 2999, 'image' => 'cotton'],
                ['title' => 'Premium Cotton White', 'price' => 4200, 'sale' => null, 'image' => 'cotton'],
                ['title' => 'Heritage Cotton Navy', 'price' => 5500, 'sale' => 4800, 'image' => 'cotton'],
                ['title' => 'Signature Cotton Stone', 'price' => 4800, 'sale' => null, 'image' => 'cotton'],
                ['title' => 'Executive Cotton Charcoal', 'price' => 6200, 'sale' => 5500, 'image' => 'cotton'],
            ],
            // Linen Series (5 products)
            [
                ['title' => 'Summer Linen Ivory', 'price' => 4500, 'sale' => 3999, 'image' => 'latha'],
                ['title' => 'Breeze Linen White', 'price' => 5200, 'sale' => null, 'image' => 'latha'],
                ['title' => 'Airy Linen Sage', 'price' => 5800, 'sale' => 5200, 'image' => 'latha'],
                ['title' => 'Cool Linen Light Grey', 'price' => 4900, 'sale' => null, 'image' => 'latha'],
                ['title' => 'Natural Linen Stone', 'price' => 5500, 'sale' => 4800, 'image' => 'latha'],
            ],
            // Latha Premium (5 products)
            [
                ['title' => 'Royal Latha Midnight', 'price' => 7500, 'sale' => 6800, 'image' => 'latha'],
                ['title' => 'Executive Latha Navy', 'price' => 8200, 'sale' => null, 'image' => 'latha'],
                ['title' => 'Premium Latha Black', 'price' => 9500, 'sale' => 8500, 'image' => 'latha'],
                ['title' => 'Elite Latha Charcoal', 'price' => 8800, 'sale' => null, 'image' => 'latha'],
                ['title' => 'Heritage Latha Burgundy', 'price' => 10200, 'sale' => 9200, 'image' => 'latha'],
            ],
            // Silk Blend (5 products)
            [
                ['title' => 'Silk Luxe Ivory', 'price' => 12000, 'sale' => 10800, 'image' => 'custom'],
                ['title' => 'Silk Blend Navy', 'price' => 14500, 'sale' => null, 'image' => 'custom'],
                ['title' => 'Royal Silk Black', 'price' => 15800, 'sale' => 14200, 'image' => 'custom'],
                ['title' => 'Premium Silk Stone', 'price' => 13200, 'sale' => null, 'image' => 'custom'],
                ['title' => 'Signature Silk Forest', 'price' => 16500, 'sale' => 15000, 'image' => 'custom'],
            ],
            // Wool Classic (5 products)
            [
                ['title' => 'Winter Wool Charcoal', 'price' => 8500, 'sale' => 7800, 'image' => 'washwear'],
                ['title' => 'Classic Wool Navy', 'price' => 9200, 'sale' => null, 'image' => 'washwear'],
                ['title' => 'Premium Wool Black', 'price' => 10500, 'sale' => 9500, 'image' => 'washwear'],
                ['title' => 'Heritage Wool Espresso', 'price' => 9800, 'sale' => null, 'image' => 'washwear'],
                ['title' => 'Elite Wool Midnight', 'price' => 11200, 'sale' => 10000, 'image' => 'washwear'],
            ],
            // Wash & Wear (5 products)
            [
                ['title' => 'Fresh White W&W', 'price' => 3200, 'sale' => 2800, 'image' => 'washwear'],
                ['title' => 'Daily Navy W&W', 'price' => 3800, 'sale' => null, 'image' => 'washwear'],
                ['title' => 'Smart Grey W&W', 'price' => 4200, 'sale' => 3600, 'image' => 'washwear'],
                ['title' => 'Easy Stone W&W', 'price' => 3500, 'sale' => null, 'image' => 'washwear'],
                ['title' => 'Executive Black W&W', 'price' => 4800, 'sale' => 4200, 'image' => 'washwear'],
            ],
        ];

        $descriptions = [
            'Crafted from premium yarns for a superior hand-feel and lasting comfort.',
            'A fine weave that balances breathability with a structured silhouette.',
            'Designed for the discerning gentleman who values quality and tradition.',
            'Expertly woven to deliver unmatched durability and a soft drape.',
            'The perfect choice for refined everyday elegance and effortless style.',
        ];

        $colorNames = array_column($colorsData, 'name');
        $products = [];
        $variantsData = [];
        $productTags = [];
        $allSlugs = [];

        foreach ($productsByCategory as $catIdx => $catProducts) {
            $category = $categories[$catIdx];
            $collection = $collections[$catIdx];

            foreach ($catProducts as $pIdx => $pData) {
                $title = $pData['title'];
                $slug = Str::slug($title);
                $allSlugs[] = $slug;
                $regularPrice = $pData['price'];
                $salePrice = $pData['sale'];
                $stock = rand(30, 150);
                $desc = $descriptions[$pIdx % count($descriptions)];

                $products[] = [
                    'product_type_id' => $fabricType->id,
                    'brand_id' => $brand->id,
                    'collection_id' => $collection->id,
                    'category_id' => $category->id,
                    'title' => $title,
                    'slug' => $slug,
                    'featured_image' => $pData['image'],
                    'short_description' => $desc,
                    'full_description' => $desc.' From the '.$collection->name.' collection, this fabric offers exceptional quality and a refined finish suitable for any occasion.',
                    'season_label' => ['All-season', 'Summer', 'Winter', 'Spring · Autumn'][array_rand([0, 1, 2, 3])],
                    'regular_price' => $regularPrice,
                    'sale_price' => $salePrice,
                    'cost_price' => intval($regularPrice * 0.45),
                    'unit' => 'meter',
                    'is_featured' => $pIdx < 2,
                    'is_new_arrival' => $pIdx < 3,
                    'is_best_seller' => $pIdx < 2,
                    'is_trending' => $pIdx >= 3,
                    'status' => 'published',
                    'published_at' => now()->subDays(rand(0, 30)),
                    'sort_order' => $catIdx * 5 + $pIdx + 1,
                    'total_stock' => $stock,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                // 2 variants per product
                $baseSku = strtoupper(Str::slug($collection->name, '_')).'-'.str_pad((string) ($catIdx * 5 + $pIdx + 1), 3, '0', STR_PAD_LEFT);
                for ($v = 0; $v < 2; $v++) {
                    $vPrice = $regularPrice + ($v * 500);
                    $vSale = $salePrice ? $vPrice - 500 : null;
                    $variantsData[] = [
                        'product_slug' => $slug,
                        'color_name' => $colorNames[($catIdx * 2 + $v) % count($colorNames)],
                        'name' => ['Standard', 'Premium'][$v],
                        'sku' => $baseSku.'-'.chr(65 + $v),
                        'price' => $vPrice,
                        'sale_price' => $vSale,
                        'stock' => max(5, intval($stock / 2)),
                        'sort_order' => $v,
                        'is_default' => $v === 0,
                        'status' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }

                // tags
                $assignedTags = [];
                if ($pIdx < 2) {
                    $assignedTags[] = 'Best Seller';
                }
                if ($pIdx < 3) {
                    $assignedTags[] = 'New Arrival';
                }
                if ($pIdx >= 4) {
                    $assignedTags[] = 'Limited Edition';
                }
                if ($pIdx < 2) {
                    $assignedTags[] = 'Premium';
                }
                if (! empty($assignedTags)) {
                    $productTags[] = ['slug' => $slug, 'tags' => $assignedTags];
                }
            }
        }

        // Bulk insert products
        Product::insert($products);

        // Fetch all inserted products keyed by slug
        $productModels = Product::whereIn('slug', $allSlugs)->get()->keyBy('slug');

        // Bulk insert variants
        $colorsByName = Color::pluck('id', 'name');
        $variantInserts = [];
        foreach ($variantsData as $vd) {
            $product = $productModels[$vd['product_slug']] ?? null;
            if (! $product) {
                continue;
            }
            $variantInserts[] = [
                'product_id' => $product->id,
                'color_id' => $colorsByName[$vd['color_name']] ?? null,
                'name' => $vd['name'],
                'sku' => $vd['sku'],
                'price' => $vd['price'],
                'sale_price' => $vd['sale_price'],
                'stock' => $vd['stock'],
                'sort_order' => $vd['sort_order'],
                'is_default' => $vd['is_default'],
                'status' => $vd['status'],
                'created_at' => $vd['created_at'],
                'updated_at' => $vd['updated_at'],
            ];
        }
        ProductVariant::insert($variantInserts);

        // Attach tags
        $tagsByName = Tag::pluck('id', 'name');
        foreach ($productTags as $pt) {
            $product = $productModels[$pt['slug']] ?? null;
            if (! $product) {
                continue;
            }
            $tagIds = [];
            foreach ($pt['tags'] as $tn) {
                if ($id = $tagsByName[$tn] ?? null) {
                    $tagIds[] = $id;
                }
            }
            if (! empty($tagIds)) {
                $product->tags()->sync($tagIds);
            }
        }

        // Attribute Groups & Attributes
        $fabricGroup = AttributeGroup::create(['name' => 'Fabric Details', 'sort_order' => 0]);
        $sizeGroup = AttributeGroup::create(['name' => 'Size & Fit', 'sort_order' => 1]);

        $fabricAttr = Attribute::create(['attribute_group_id' => $fabricGroup->id, 'name' => 'Fabric Type', 'slug' => 'fabric-type', 'input_type' => 'select', 'sort_order' => 0, 'status' => true]);
        $weightAttr = Attribute::create(['attribute_group_id' => $fabricGroup->id, 'name' => 'Fabric Weight', 'slug' => 'fabric-weight', 'input_type' => 'select', 'sort_order' => 1, 'status' => true]);
        $careAttr = Attribute::create(['attribute_group_id' => $fabricGroup->id, 'name' => 'Care Instructions', 'slug' => 'care-instructions', 'input_type' => 'text', 'sort_order' => 2, 'status' => true]);

        $attributeValues = [
            [$fabricAttr->id => ['Cotton', 'Linen', 'Wool', 'Silk Blend', 'Polyester Blend']],
            [$weightAttr->id => ['Lightweight (80-120 GSM)', 'Medium (120-180 GSM)', 'Heavy (180-250 GSM)', 'Ultra Heavy (250+ GSM)']],
        ];
        foreach ($attributeValues as $items) {
            foreach ($items as $attrId => $values) {
                foreach ($values as $i => $val) {
                    AttributeValue::create([
                        'attribute_id' => $attrId,
                        'value' => $val,
                        'slug' => Str::slug($val),
                        'sort_order' => $i,
                    ]);
                }
            }
        }

        // Reviews
        $productIds = Product::pluck('id');
        $user = User::first();
        $reviewTitles = ['Excellent quality!', 'Superb fabric!', 'Love the texture!', 'Great value!', 'Exactly what I needed'];
        $reviewBodies = [
            'The fabric quality is outstanding. Highly recommended for anyone looking for premium unstitched fabric.',
            'Amazing texture and feel. The fabric breathes well and drapes beautifully.',
            'Bought this for a special occasion. The quality exceeded my expectations.',
            'Perfect for daily wear. Comfortable and durable even after multiple washes.',
            'The fabric has a lovely sheen and feels substantial without being heavy.',
        ];
        $reviewData = [];
        foreach ($productIds as $i => $pid) {
            $idx = $i % count($reviewTitles);
            $reviewData[] = [
                'product_id' => $pid,
                'user_id' => $user->id,
                'rating' => [5, 5, 4, 5, 5][$idx],
                'title' => $reviewTitles[$idx],
                'body' => $reviewBodies[$idx],
                'is_approved' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        Review::insert($reviewData);

        // FAQs
        $faqData = [];
        foreach ($productIds as $pid) {
            $faqData[] = [
                'product_id' => $pid,
                'question' => 'What is the return policy?',
                'answer' => 'We offer a 7-day return policy on unopened fabric rolls. Custom orders are non-refundable.',
                'sort_order' => 0,
                'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ];
            $faqData[] = [
                'product_id' => $pid,
                'question' => 'How is the fabric packaged?',
                'answer' => 'Each fabric is carefully rolled, wrapped in acid-free tissue paper, and shipped in a branded box.',
                'sort_order' => 1,
                'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        ProductFaq::insert($faqData);

        // Coupon
        Coupon::create([
            'code' => 'WELCOME10',
            'type' => 'percentage',
            'value' => 10,
            'min_order_amount' => 2000,
            'max_discount_amount' => 1000,
            'usage_limit_per_coupon' => 100,
            'usage_limit_per_user' => 1,
            'is_stackable' => false,
            'status' => true,
        ]);

        // Offer
        Offer::create([
            'name' => 'Summer Sale',
            'type' => 'percentage',
            'value' => 15,
            'min_order_amount' => 5000,
            'max_discount_amount' => 2000,
            'starts_at' => now(),
            'expires_at' => now()->addDays(30),
            'status' => true,
        ]);

        // Homepage Sections
        $featuredSection = HomepageSection::create([
            'section_type' => 'featured',
            'title' => 'Featured Collection',
            'description' => 'Our most prized collection, crafted for those who demand the extraordinary.',
            'sort_order' => 0,
            'is_active' => true,
        ]);
        $featuredIds = $productIds->take(6);
        foreach ($featuredIds as $i => $pid) {
            HomepageSectionProduct::create([
                'homepage_section_id' => $featuredSection->id,
                'product_id' => $pid,
                'sort_order' => $i,
            ]);
        }

        $newSection = HomepageSection::create([
            'section_type' => 'new_arrivals',
            'title' => 'New Arrivals',
            'description' => 'Fresh from the atelier — our latest creations.',
            'sort_order' => 1,
            'is_active' => true,
        ]);
        $newIds = Product::where('is_new_arrival', true)->pluck('id')->take(6);
        foreach ($newIds as $i => $pid) {
            HomepageSectionProduct::create([
                'homepage_section_id' => $newSection->id,
                'product_id' => $pid,
                'sort_order' => $i,
            ]);
        }

        $this->command->info('Database seeded successfully!');
        $this->command->warn('Admin login: admin@passionatelier.com / password');
    }
}
