<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBrandRequest;
use App\Http\Requests\Admin\UpdateBrandRequest;
use App\Models\Brand;
use App\Services\Admin\BrandService;
use Illuminate\Http\Request;
class BrandController extends Controller {
    public function __construct(protected BrandService $brandService) {}
    public function index(Request $request) { return view('admin.brands.index', ['brands' => $this->brandService->paginate($request->only('search'))]); }
    public function create() { return view('admin.brands.create'); }
    public function store(StoreBrandRequest $request) { $this->brandService->create($request->validated(), $request->file('image'), $request->file('banner')); return redirect()->route('admin.brands.index')->with('success', 'Brand created.'); }
    public function edit(Brand $brand) { return view('admin.brands.edit', compact('brand')); }
    public function update(UpdateBrandRequest $request, Brand $brand) { $this->brandService->update($brand, $request->validated(), $request->file('image'), $request->file('banner')); return redirect()->route('admin.brands.index')->with('success', 'Brand updated.'); }
    public function destroy(Brand $brand) { $this->brandService->delete($brand); return redirect()->route('admin.brands.index')->with('success', 'Brand deleted.'); }
}
