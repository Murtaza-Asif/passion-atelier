<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\InventoryAdjustRequest;
use App\Models\Product;
use App\Services\Admin\InventoryService;
use App\Services\Admin\ProductService;
use Illuminate\Http\Request;
class InventoryController extends Controller {
    public function __construct(protected InventoryService $inventoryService, protected ProductService $productService) {}
    public function index(Request $request) { return view('admin.inventory.index', ['logs' => $this->inventoryService->paginate($request->only('product_id', 'type')), 'products' => \App\Models\Product::ordered()->get()]); }
    public function create() { return view('admin.inventory.adjust', ['products' => \App\Models\Product::with('variants')->ordered()->get()]); }
    public function adjust(InventoryAdjustRequest $request) {
        $product = Product::findOrFail($request->product_id);
        $variant = $request->product_variant_id ? $product->variants()->find($request->product_variant_id) : null;
        $this->inventoryService->adjustStock($product, $request->quantity, $request->type, $request->notes, $variant);
        $product->update(['total_stock' => $product->variants()->sum('stock')]);
        return redirect()->route('admin.inventory.index')->with('success', 'Stock adjusted.');
    }
    public function lowStock() { return view('admin.inventory.low-stock', ['products' => $this->inventoryService->getLowStockProducts()]); }
}
