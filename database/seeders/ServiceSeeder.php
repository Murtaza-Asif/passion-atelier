<?php
namespace Database\Seeders;

use App\Models\{User, ProductType, Brand, Collection, Category, Tag, Color, Product, ProductVariant, Review, ProductFaq, HomepageSection, HomepageSectionProduct, AttributeGroup, Attribute, AttributeValue, Coupon, Offer};
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(['email' => 'admin@passionatelier.com'], [
            'name' => 'Admin',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);

        $fabricType = ProductType::create(['name' => 'Unstitched Fabric', 'description' => 'Premium unstitched fabric by the meter', 'sort_order' => 0, 'is_active' => true]);
        ProductType::create(['name' => 'Stitched Suit', 'description' => 'Ready-to-wear stitched suits', 'sort_order' => 1, 'is_active' => true]);
        ProductType::create(['name' => 'Perfume', 'description' => 'Luxury fragrances', 'sort_order' => 2, 'is_active' => true]);
        ProductType::create(['name' => 'Accessory', 'description' => 'Premium accessories', 'sort_order' => 3, 'is_active' => true]);

        $brand = Brand::create(['name' => 'Passion Atelier', 'description' => 'Premium unstitched fabric atelier', 'status' => true, 'sort_order' => 0]);

        $cottonCollection = Collection::create(['name' => 'Premium Cotton Collection', 'description' => 'Breathable luxury cotton woven for daily refinement', 'status' => true, 'sort_order' => 0]);
        $washCollection = Collection::create(['name' => 'Luxury Wash & Wear', 'description' => 'Effortless polish that travels with you', 'status' => true, 'sort_order' => 1]);
        $lathaCollection = Collection::create(['name' => 'Formal Latha Series', 'description' => 'The boardroom standard, redefined', 'status' => true, 'sort_order' => 2]);
        $customCollection = Collection::create(['name' => 'Custom Fabric Selection', 'description' => 'A personal atelier, on demand', 'status' => true, 'sort_order' => 3]);

        $catShalwar = Category::create(['name' => 'Shalwar Kameez', 'description' => 'Traditional shalwar kameez fabric', 'status' => true, 'sort_order' => 0]);
        $catSuits = Category::create(['name' => 'Suits', 'description' => 'Three-piece and two-piece suit fabric', 'status' => true, 'sort_order' => 1]);
        $catFormal = Category::create(['name' => 'Formal Wear', 'description' => 'Formal and business attire fabric', 'status' => true, 'sort_order' => 2]);
        Category::create(['name' => 'Accessories', 'description' => 'Premium accessories', 'status' => true, 'sort_order' => 3]);

        Tag::create(['name' => 'Best Seller']);
        Tag::create(['name' => 'New Arrival']);
        Tag::create(['name' => 'Limited Edition']);
        Tag::create(['name' => 'Premium']);
        Tag::create(['name' => 'Eco Friendly']);

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

        $products = [
            [
                'product_type_id' => $fabricType->id,
                'brand_id' => $brand->id,
                'collection_id' => $cottonCollection->id,
                'category_id' => $catShalwar->id,
                'title' => 'Premium Cotton Collection',
                'slug' => 'premium-cotton',
                'short_description' => 'Breathable luxury cotton woven for daily refinement.',
                'full_description' => 'A meticulously curated cotton collection that pairs heritage weaving with contemporary finish — soft hand-feel, breathable density, and a structure that holds the shape of any tailored cut.',
                'regular_price' => 3999,
                'sale_price' => 3499,
                'cost_price' => 2000,
                'unit' => 'meter',
                'is_featured' => true,
                'is_new_arrival' => false,
                'is_best_seller' => true,
                'is_trending' => true,
                'status' => 'published',
                'published_at' => now(),
                'sort_order' => 0,
                'total_stock' => 150,
                'variants' => [
                    ['sku' => 'COT-SUP-80S', 'price' => 3499, 'stock' => 50, 'color_name' => 'Ivory', 'sort_order' => 0],
                    ['sku' => 'COT-SUP-100S', 'price' => 4499, 'stock' => 60, 'color_name' => 'Stone', 'sort_order' => 1],
                    ['sku' => 'COT-SUP-120S', 'price' => 5999, 'stock' => 40, 'color_name' => 'Navy', 'sort_order' => 2],
                ],
                'tags' => ['Best Seller', 'Premium'],
            ],
            [
                'product_type_id' => $fabricType->id,
                'brand_id' => $brand->id,
                'collection_id' => $washCollection->id,
                'category_id' => $catSuits->id,
                'title' => 'Luxury Wash & Wear',
                'slug' => 'wash-wear',
                'short_description' => 'Effortless polish that travels with you.',
                'full_description' => 'Engineered for the modern professional — wrinkle-resistant, low-maintenance fabrics that retain their crisp silhouette through long days, intercontinental flights, and back-to-back rooms.',
                'regular_price' => 4999,
                'sale_price' => 3999,
                'cost_price' => 2200,
                'unit' => 'meter',
                'is_featured' => true,
                'is_new_arrival' => true,
                'is_best_seller' => true,
                'is_trending' => false,
                'status' => 'published',
                'published_at' => now(),
                'sort_order' => 1,
                'total_stock' => 120,
                'variants' => [
                    ['sku' => 'WW-CLASSIC', 'price' => 3999, 'stock' => 50, 'color_name' => 'White', 'sort_order' => 0],
                    ['sku' => 'WW-STRETCH', 'price' => 4999, 'stock' => 40, 'color_name' => 'Light Grey', 'sort_order' => 1],
                    ['sku' => 'WW-SUPREME', 'price' => 6499, 'stock' => 30, 'color_name' => 'Navy', 'sort_order' => 2],
                ],
                'tags' => ['Best Seller', 'New Arrival'],
            ],
            [
                'product_type_id' => $fabricType->id,
                'brand_id' => $brand->id,
                'collection_id' => $lathaCollection->id,
                'category_id' => $catFormal->id,
                'title' => 'Formal Latha Series',
                'slug' => 'formal-latha',
                'short_description' => 'The boardroom standard, redefined.',
                'full_description' => 'A formal Latha series with a refined satin handle, graceful drape, and a quiet luminosity that reads as authority across boardrooms, ceremonies, and after-hours events.',
                'regular_price' => 7499,
                'sale_price' => 5499,
                'cost_price' => 3000,
                'unit' => 'meter',
                'is_featured' => true,
                'is_new_arrival' => false,
                'is_best_seller' => true,
                'is_trending' => true,
                'status' => 'published',
                'published_at' => now(),
                'sort_order' => 2,
                'total_stock' => 80,
                'variants' => [
                    ['sku' => 'LTH-STD', 'price' => 5499, 'stock' => 30, 'color_name' => 'Silver', 'sort_order' => 0],
                    ['sku' => 'LTH-ROYAL', 'price' => 6999, 'stock' => 30, 'color_name' => 'Charcoal', 'sort_order' => 1],
                    ['sku' => 'LTH-IMPERIAL', 'price' => 8999, 'stock' => 20, 'color_name' => 'Black', 'sort_order' => 2],
                ],
                'tags' => ['Premium', 'Limited Edition'],
            ],
            [
                'product_type_id' => $fabricType->id,
                'brand_id' => $brand->id,
                'collection_id' => $customCollection->id,
                'category_id' => $catShalwar->id,
                'title' => 'Custom Fabric Selection',
                'slug' => 'custom-selection',
                'short_description' => 'A personal atelier, on demand.',
                'full_description' => 'Private consultations with a master fabric advisor — color matching, weight calibration, occasion mapping, and direct sourcing from our reserved heritage stock.',
                'regular_price' => 14999,
                'cost_price' => 8000,
                'unit' => 'service',
                'is_featured' => false,
                'is_new_arrival' => false,
                'is_best_seller' => false,
                'is_trending' => false,
                'status' => 'published',
                'published_at' => now(),
                'sort_order' => 3,
                'total_stock' => 999,
                'variants' => [
                    ['sku' => 'CUSTOM-CONSULT', 'price' => 0, 'stock' => 999, 'color_name' => 'Ivory', 'sort_order' => 0],
                    ['sku' => 'CUSTOM-SWATCH', 'price' => 999, 'stock' => 999, 'color_name' => 'Stone', 'sort_order' => 1],
                    ['sku' => 'CUSTOM-BESPOKE', 'price' => 14999, 'stock' => 999, 'color_name' => 'Black', 'sort_order' => 2],
                ],
                'tags' => ['Premium'],
            ],
        ];

        $colorsByName = Color::pluck('id', 'name');
        $tagsByName = Tag::pluck('id', 'name');

        foreach ($products as $data) {
            $variants = $data['variants'] ?? [];
            $tagNames = $data['tags'] ?? [];
            unset($data['variants'], $data['tags']);

            $product = Product::create($data);

            foreach ($variants as $v) {
                $colorId = $colorsByName[$v['color_name']] ?? null;
                ProductVariant::create([
                    'product_id' => $product->id,
                    'color_id' => $colorId,
                    'sku' => $v['sku'],
                    'price' => $v['price'],
                    'stock' => $v['stock'],
                    'sort_order' => $v['sort_order'],
                    'status' => true,
                    'is_default' => $v['sort_order'] === 0,
                ]);
            }

            $tagIds = [];
            foreach ($tagNames as $tn) {
                if ($id = $tagsByName[$tn] ?? null) {
                    $tagIds[] = $id;
                }
            }
            if (!empty($tagIds)) {
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
                        'slug' => \Illuminate\Support\Str::slug($val),
                        'sort_order' => $i,
                    ]);
                }
            }
        }

        // Reviews
        $productIds = Product::pluck('id');
        $user = User::first();
        foreach ($productIds as $pid) {
            Review::create([
                'product_id' => $pid,
                'user_id' => $user->id,
                'rating' => 5,
                'title' => 'Excellent quality!',
                'body' => 'The fabric quality is outstanding. Highly recommended for anyone looking for premium unstitched fabric.',
                'is_approved' => true,
            ]);
        }

        // FAQs
        foreach ($productIds as $pid) {
            ProductFaq::create([
                'product_id' => $pid,
                'question' => 'What is the return policy?',
                'answer' => 'We offer a 7-day return policy on unopened fabric rolls. Custom orders are non-refundable.',
                'sort_order' => 0,
                'status' => true,
            ]);
            ProductFaq::create([
                'product_id' => $pid,
                'question' => 'How is the fabric packaged?',
                'answer' => 'Each fabric is carefully rolled, wrapped in acid-free tissue paper, and shipped in a branded box.',
                'sort_order' => 1,
                'status' => true,
            ]);
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
        foreach ($productIds as $i => $pid) {
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
        HomepageSectionProduct::create([
            'homepage_section_id' => $newSection->id,
            'product_id' => $productIds->first(),
            'sort_order' => 0,
        ]);

        $this->command->info('Database seeded successfully!');
        $this->command->warn('Admin login: admin@passionatelier.com / password');
    }
}
