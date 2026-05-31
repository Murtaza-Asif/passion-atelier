<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCategoryRequest;
use App\Http\Requests\Admin\UpdateCategoryRequest;
use App\Models\Category;
use App\Services\Admin\CategoryService;
use Illuminate\Http\Request;
class CategoryController extends Controller {
    public function __construct(protected CategoryService $categoryService) {}
    public function index(Request $request) { return view('admin.categories.index', ['categories' => $this->categoryService->paginate($request->only('search'))]); }
    public function create() { return view('admin.categories.create', ['parentCategories' => $this->categoryService->getParentCategories()]); }
    public function store(StoreCategoryRequest $request) { $this->categoryService->create($request->validated(), $request->file('image'), $request->file('banner')); return redirect()->route('admin.categories.index')->with('success', 'Category created.'); }
    public function edit(Category $category) { return view('admin.categories.edit', ['category' => $category, 'parentCategories' => $this->categoryService->getParentCategories()]); }
    public function update(UpdateCategoryRequest $request, Category $category) { $this->categoryService->update($category, $request->validated(), $request->file('image'), $request->file('banner')); return redirect()->route('admin.categories.index')->with('success', 'Category updated.'); }
    public function destroy(Category $category) { $this->categoryService->delete($category); return redirect()->route('admin.categories.index')->with('success', 'Category deleted.'); }
}
