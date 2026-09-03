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

        $fabricType = ProductType::create(['name' => 'Unstitched Fabric', 'description' => 'Premium unstitched fabric by the meter', 'sort_order' => 0, 'is_active' => true]);
        ProductType::create(['name' => 'Stitched Suit', 'description' => 'Ready-to-wear stitched suits', 'sort_order' => 1, 'is_active' => true]);
        ProductType::create(['name' => 'Perfume', 'description' => 'Luxury fragrances', 'sort_order' => 2, 'is_active' => true]);
        ProductType::create(['name' => 'Accessory', 'description' => 'Premium accessories', 'sort_order' => 3, 'is_active' => true]);

        $brand = Brand::create(['name' => 'Passion Atelier', 'description' => 'Premium unstitched fabric atelier', 'status' => true, 'sort_order' => 0]);

        $categories = [];
        $categories[] = Category::create(['name' => 'Shalwar Kameez', 'description' => 'Traditional shalwar kameez fabric', 'status' => true, 'sort_order' => 0]);
        $categories[] = Category::create(['name' => 'Suits', 'description' => 'Three-piece and two-piece suit fabric', 'status' => true, 'sort_order' => 1]);
        $categories[] = Category::create(['name' => 'Formal Wear', 'description' => 'Formal and business attire fabric', 'status' => true, 'sort_order' => 2]);
        $categories[] = Category::create(['name' => 'Accessories', 'description' => 'Premium accessories', 'status' => true, 'sort_order' => 3]);

        $tags = [];
        $tags[] = Tag::create(['name' => 'Best Seller']);
        $tags[] = Tag::create(['name' => 'New Arrival']);
        $tags[] = Tag::create(['name' => 'Limited Edition']);
        $tags[] = Tag::create(['name' => 'Premium']);
        $tags[] = Tag::create(['name' => 'Eco Friendly']);

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

        // ── 20 Collections of Men's Unstitched Fabric ─────────────────
        $collectionNames = [
            ['name' => 'Classic Cotton', 'desc' => 'Timeless cotton fabrics for everyday sophistication'],
            ['name' => 'Premium Egyptian Cotton', 'desc' => 'Luxurious long-staple Egyptian cotton for refined comfort'],
            ['name' => 'Executive Latha', 'desc' => 'Premium latha fabrics tailored for the boardroom'],
            ['name' => 'Royal Latha', 'desc' => 'Opulent latha weaves for ceremonial occasions'],
            ['name' => 'Modern Wash & Wear', 'desc' => 'Wrinkle-resistant fabrics for the modern professional'],
            ['name' => 'Business Formal', 'desc' => 'Sharp formal fabrics for power dressing'],
            ['name' => 'Heritage Weave', 'desc' => 'Traditional handloom weaves with a heritage touch'],
            ['name' => 'Daily Comfort', 'desc' => 'Soft breathable fabrics for everyday wear'],
            ['name' => 'Summer Breeze', 'desc' => 'Lightweight cooling fabrics for warm weather'],
            ['name' => 'Winter Warmth', 'desc' => 'Warm cozy fabrics for the colder months'],
            ['name' => 'Office Essential', 'desc' => 'Reliable workwear fabrics that last all day'],
            ['name' => 'Weekend Casual', 'desc' => 'Relaxed easy-going fabrics for off-duty days'],
            ['name' => 'Ceremonial Luxe', 'desc' => 'Rich celebratory fabrics for weddings and events'],
            ['name' => 'Travel Ready', 'desc' => 'Crease-resistant packable fabrics for jet-setters'],
            ['name' => 'Eco Weave', 'desc' => 'Sustainable eco-friendly fabrics for conscious dressing'],
            ['name' => 'Power Suiting', 'desc' => 'Bold authoritative suiting fabrics for leaders'],
            ['name' => 'Signature Collection', 'desc' => 'Curated premium picks from the master atelier'],
            ['name' => 'Urban Edge', 'desc' => 'Contemporary urban fabrics with a modern cut'],
            ['name' => 'Traditional Classic', 'desc' => 'Time-honoured classic fabrics for timeless style'],
            ['name' => 'Bespoke Edition', 'desc' => 'Exclusive limited-run fabrics for discerning gentlemen'],
        ];

        $collections = [];
        foreach ($collectionNames as $i => $c) {
            $collections[] = Collection::create([
                'name' => $c['name'],
                'description' => $c['desc'],
                'image' => null,
                'banner_images' => [],
                'status' => true,
                'sort_order' => $i,
            ]);
        }

        // ── Generate 50 Products per Collection (1000 total) ──────────
        $fabricAdjectives = ['Premium', 'Classic', 'Luxury', 'Refined', 'Essential', 'Heritage', 'Signature', 'Executive', 'Royal', 'Modern'];
        $fabricNouns = ['Weave', 'Cloth', 'Fabric', 'Textile', 'Material', 'Drape', 'Finish', 'Twist', 'Blend', 'Thread'];
        $fabricWeights = ['80s', '100s', '120s', '140s', '2x2', '2 Ply', 'Superfine', 'Ultra Fine', 'Double Twist', 'Single Ply'];
        $colorNames = array_column($colorsData, 'name');
        $seasonLabels = ['All-season', 'Summer', 'Winter', 'Spring · Autumn', 'Year-round'];
        $units = ['meter', 'meter', 'meter', 'meter', 'yard'];
        $descriptions = [
            'Crafted from premium yarns for a superior hand-feel and lasting comfort.',
            'A fine weave that balances breathability with a structured silhouette.',
            'Designed for the discerning gentleman who values quality and tradition.',
            'Expertly woven to deliver unmatched durability and a soft drape.',
            'The perfect choice for refined everyday elegance and effortless style.',
            'Meticulously crafted fabric that holds its shape through the longest days.',
            'A sophisticated textile with a smooth finish and graceful fall.',
            'Lightweight yet substantial — ideal for tailored fits and clean lines.',
            'Timeless quality that transcends seasons and occasions.',
            'Superior craftsmanship meets contemporary design in every yard.',
        ];

        $products = [];
        $variantsData = [];
        $productTags = [];
        $allSlugs = [];

        foreach ($collections as $ci => $collection) {
            $colSlug = Str::slug($collection->name);
            $category = $categories[$ci % 3]; // cycle through first 3 categories

            for ($p = 1; $p <= 50; $p++) {
                $adj = $fabricAdjectives[array_rand($fabricAdjectives)];
                $noun = $fabricNouns[array_rand($fabricNouns)];
                $weight = $fabricWeights[array_rand($fabricWeights)];
                $title = "{$collection->name} {$adj} {$noun} {$weight}";
                $slug = Str::slug($title).'-'.Str::random(4);
                $allSlugs[] = $slug;
                $descKey = array_rand($descriptions);
                $regularPrice = rand(25, 120) * 100; // 2500-12000
                $hasSale = rand(0, 3) > 0; // 75% chance
                $salePrice = $hasSale ? $regularPrice - rand(1, 3) * 500 : null;
                $season = $seasonLabels[array_rand($seasonLabels)];
                $unit = $units[array_rand($units)];
                $stock = rand(20, 200);

                $productData = [
                    'product_type_id' => $fabricType->id,
                    'brand_id' => $brand->id,
                    'collection_id' => $collection->id,
                    'category_id' => $category->id,
                    'title' => $title,
                    'slug' => $slug,
                    'featured_image' => null,
                    'short_description' => $descriptions[$descKey],
                    'full_description' => $descriptions[$descKey].' From the '.$collection->name.', this '.strtolower($adj).' '.strtolower($noun).' offers exceptional quality and a refined finish suitable for any occasion.',
                    'season_label' => $season,
                    'regular_price' => $regularPrice,
                    'sale_price' => $salePrice,
                    'cost_price' => intval($regularPrice * 0.45),
                    'unit' => $unit,
                    'is_featured' => $p <= 3,
                    'is_new_arrival' => $p <= 8,
                    'is_best_seller' => $p <= 5,
                    'is_trending' => $p >= 45,
                    'status' => 'published',
                    'published_at' => now()->subDays(rand(0, 60)),
                    'sort_order' => $ci * 50 + $p,
                    'total_stock' => $stock,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
                $products[] = $productData;

                // 3 variants per product
                $vColors = array_rand(array_flip($colorNames), min(3, count($colorNames)));
                if (! is_array($vColors)) {
                    $vColors = [$vColors];
                }
                $baseSku = strtoupper(Str::slug($collection->name, '_')).'-'.str_pad((string) $p, 3, '0', STR_PAD_LEFT);
                for ($v = 0; $v < 3; $v++) {
                    $vPrice = $regularPrice + ($v * 500);
                    $vSale = $hasSale ? $vPrice - rand(1, 3) * 500 : null;
                    $variantsData[] = [
                        'product_slug' => $slug,
                        'color_name' => $vColors[$v % count($vColors)],
                        'name' => $fabricAdjectives[array_rand($fabricAdjectives)].' '.($v + 1),
                        'sku' => $baseSku.'-'.chr(65 + $v),
                        'price' => $vPrice,
                        'sale_price' => $vSale,
                        'stock' => max(5, intval($stock / 3)),
                        'sort_order' => $v,
                        'is_default' => $v === 0,
                        'status' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }

                // tags
                $assignedTags = [];
                if ($p <= 5) {
                    $assignedTags[] = 'Best Seller';
                }
                if ($p <= 8) {
                    $assignedTags[] = 'New Arrival';
                }
                if ($p >= 48) {
                    $assignedTags[] = 'Limited Edition';
                }
                if ($p <= 3) {
                    $assignedTags[] = 'Premium';
                }
                if (rand(0, 10) > 8) {
                    $assignedTags[] = 'Eco Friendly';
                }
                if (! empty($assignedTags)) {
                    $productTags[] = ['slug' => $slug, 'tags' => $assignedTags];
                }
            }
        }

        // Bulk insert products
        $chunks = array_chunk($products, 100);
        foreach ($chunks as $chunk) {
            Product::insert($chunk);
        }

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
        $vChunks = array_chunk($variantInserts, 200);
        foreach ($vChunks as $chunk) {
            ProductVariant::insert($chunk);
        }

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

        // Reviews (bulk insert)
        $productIds = Product::pluck('id');
        $user = User::first();
        $reviewTitles = [
            'Excellent quality!', 'Superb fabric!', 'Love the texture!',
            'Great value!', 'Exactly what I needed', 'Top-notch quality',
            'Very satisfied', 'Highly recommended', 'Perfect for shalwar kameez',
            'Outstanding finish',
        ];
        $reviewBodies = [
            'The fabric quality is outstanding. Highly recommended for anyone looking for premium unstitched fabric.',
            'Amazing texture and feel. The fabric breathes well and drapes beautifully.',
            'Bought this for my wedding sherwani. The quality exceeded my expectations.',
            'Perfect for daily wear. Comfortable and durable even after multiple washes.',
            'The fabric has a lovely sheen and feels substantial without being heavy.',
            'Excellent craftsmanship — you can feel the quality the moment you touch it.',
            'Great for formal occasions. Holds its shape perfectly throughout the day.',
            'Soft yet sturdy. Exactly what I was looking for in a premium fabric.',
            'The colour is rich and even, and the fabric cuts beautifully.',
            'Will definitely order again. This is my go-to for quality unstitched fabric.',
        ];
        $reviewRatings = [5, 5, 5, 4, 5, 4, 5, 4, 5, 5];
        $reviewData = [];
        foreach ($productIds as $i => $pid) {
            $idx = $i % count($reviewTitles);
            $reviewData[] = [
                'product_id' => $pid,
                'user_id' => $user->id,
                'rating' => $reviewRatings[$idx],
                'title' => $reviewTitles[$idx],
                'body' => $reviewBodies[$idx],
                'is_approved' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        $rChunks = array_chunk($reviewData, 200);
        foreach ($rChunks as $chunk) {
            Review::insert($chunk);
        }

        // FAQs (bulk insert)
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
        $faqChunks = array_chunk($faqData, 200);
        foreach ($faqChunks as $chunk) {
            ProductFaq::insert($chunk);
        }

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
        $featuredIds = $productIds->take(12);
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
        $newIds = Product::where('is_new_arrival', true)->pluck('id')->take(8);
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
