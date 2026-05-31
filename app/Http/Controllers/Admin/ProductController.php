<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Http\Requests\Admin\StoreVariantRequest;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Services\Admin\BrandService;
use App\Services\Admin\CategoryService;
use App\Services\Admin\CollectionService;
use App\Services\Admin\ProductService;
use App\Services\Admin\ProductTypeService;
use App\Services\Admin\TagService;
use App\Services\Admin\ColorService;
use App\Services\Admin\AttributeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class ProductController extends Controller {
    public function __construct(
        protected ProductService $productService,
        protected ProductTypeService $productTypeService,
        protected CategoryService $categoryService,
        protected BrandService $brandService,
        protected CollectionService $collectionService,
        protected TagService $tagService,
        protected ColorService $colorService,
        protected AttributeService $attributeService,
    ) {}
    public function index(Request $request) {
        return view('admin.products.index', [
            'products' => $this->productService->paginate($request->only('search', 'status', 'product_type_id', 'category_id', 'brand_id', 'collection_id', 'flag')),
            'productTypes' => $this->productTypeService->getAll(),
            'categories' => $this->categoryService->getAll(),
            'brands' => $this->brandService->getAll(),
            'collections' => $this->collectionService->getAll(),
        ]);
    }
    public function create() {
        return view('admin.products.create', [
            'productTypes' => $this->productTypeService->getAll(),
            'categories' => $this->categoryService->getAll(),
            'brands' => $this->brandService->getAll(),
            'collections' => $this->collectionService->getAll(),
            'tags' => $this->tagService->getAll(),
        ]);
    }
    public function store(StoreProductRequest $request) {
        $data = $request->validated();
        $tags = $data['tags'] ?? [];
        unset($data['tags']);
        $product = $this->productService->create($data, $request->file('featured_image'), $request->file('og_image'), $request->file('gallery_images', []));
        if (!empty($tags)) $product->tags()->sync($tags);
        return redirect()->route('admin.products.edit', $product)->with('success', 'Product created. Add variants and details below.');
    }
    public function edit(Product $product) {
        $product->load(['variants' => fn($q) => $q->ordered(), 'tags']);
        return view('admin.products.edit', [
            'product' => $product,
            'productTypes' => $this->productTypeService->getAll(),
            'categories' => $this->categoryService->getAll(),
            'brands' => $this->brandService->getAll(),
            'collections' => $this->collectionService->getAll(),
            'tags' => $this->tagService->getAll(),
            'colors' => $this->colorService->getAll(),
            'attributes' => $this->attributeService->getAll(),
        ]);
    }
    public function update(UpdateProductRequest $request, Product $product) {
        $data = $request->validated();
        $tags = $data['tags'] ?? [];
        unset($data['tags']);
        $product = $this->productService->update($product, $data, $request->file('featured_image'), $request->file('og_image'), $request->file('gallery_images', []));
        if (!empty($tags)) $product->tags()->sync($tags);
        return redirect()->route('admin.products.edit', $product)->with('success', 'Product updated.');
    }
    public function destroy(Product $product) { $this->productService->delete($product); return redirect()->route('admin.products.index')->with('success', 'Product deleted.'); }
    public function duplicate(Product $product) { $clone = $this->productService->duplicate($product); return redirect()->route('admin.products.edit', $clone)->with('success', 'Product duplicated.'); }
    public function storeVariant(StoreVariantRequest $request, Product $product) {
        $data = $request->validated();
        if ($request->hasFile('image')) $data['image'] = $request->file('image')->store('variants', 'public');
        $product->variants()->create($data);
        $product->update(['total_stock' => $product->variants()->sum('stock')]);
        return redirect()->route('admin.products.edit', $product)->with('success', 'Variant added.');
    }
    public function destroyVariant(Product $product, ProductVariant $variant) {
        if ($variant->image) Storage::disk('public')->delete($variant->image);
        $variant->delete();
        $product->update(['total_stock' => $product->variants()->sum('stock')]);
        return redirect()->route('admin.products.edit', $product)->with('success', 'Variant deleted.');
    }
    public function removeGalleryImage(Product $product, $index) {
        $images = $product->gallery_images ?? [];
        if (isset($images[$index])) {
            Storage::disk('public')->delete($images[$index]);
            unset($images[$index]);
            $product->update(['gallery_images' => array_values($images)]);
        }
        return redirect()->route('admin.products.edit', $product)->with('success', 'Gallery image removed.');
    }
}
