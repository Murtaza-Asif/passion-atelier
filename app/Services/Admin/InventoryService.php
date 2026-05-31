<?php
namespace App\Services\Admin;
use App\Models\InventoryLog;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
class InventoryService {
    public function paginate(array $filters = []): LengthAwarePaginator {
        return InventoryLog::query()->with('product', 'variant')
            ->when($filters['product_id'] ?? null, fn($q, $v) => $q->where('product_id', $v))
            ->when($filters['type'] ?? null, fn($q, $v) => $q->where('type', $v))
            ->latest()->paginate(15);
    }
    public function adjustStock(Product $product, int $quantity, string $type, ?string $notes = null, ?ProductVariant $variant = null): void {
        DB::transaction(function () use ($product, $quantity, $type, $notes, $variant) {
            $target = $variant ?? $product;
            $previousStock = $target->stock;
            $newStock = $previousStock + $quantity;
            $target->update(['stock' => max(0, $newStock)]);
            InventoryLog::create([
                'product_id' => $product->id,
                'product_variant_id' => $variant?->id,
                'type' => $type,
                'quantity' => $quantity,
                'previous_stock' => $previousStock,
                'new_stock' => max(0, $newStock),
                'notes' => $notes,
            ]);
        });
    }
    public function getLowStockProducts() {
        return Product::where('total_stock', '>', 0)
            ->whereColumn('total_stock', '<=', DB::raw('5'))
            ->orderBy('total_stock')->get();
    }
    public function getOutOfStockProducts() {
        return Product::where('total_stock', 0)->orWhereNull('total_stock')->get();
    }
}
