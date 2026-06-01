<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductTypeRequest;
use App\Http\Requests\Admin\UpdateProductTypeRequest;
use App\Models\ProductType;
use App\Services\Admin\ProductTypeService;
use Illuminate\Http\Request;

class ProductTypeController extends Controller
{
    public function __construct(protected ProductTypeService $productTypeService) {}

    public function index(Request $request)
    {
        return view('admin.product-types.index', ['productTypes' => $this->productTypeService->paginate($request->only('search'))]);
    }

    public function create()
    {
        return view('admin.product-types.create');
    }

    public function store(StoreProductTypeRequest $request)
    {
        $this->productTypeService->create($request->validated());

        return redirect()->route('admin.product-types.index')->with('success', 'Product type created.');
    }

    public function edit(ProductType $productType)
    {
        return view('admin.product-types.edit', compact('productType'));
    }

    public function update(UpdateProductTypeRequest $request, ProductType $productType)
    {
        $this->productTypeService->update($productType, $request->validated());

        return redirect()->route('admin.product-types.index')->with('success', 'Product type updated.');
    }

    public function destroy(ProductType $productType)
    {
        $this->productTypeService->delete($productType);

        return redirect()->route('admin.product-types.index')->with('success', 'Product type deleted.');
    }
}
