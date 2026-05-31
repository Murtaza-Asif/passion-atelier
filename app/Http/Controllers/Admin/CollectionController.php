<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCollectionRequest;
use App\Http\Requests\Admin\UpdateCollectionRequest;
use App\Models\Collection;
use App\Services\Admin\CollectionService;
use Illuminate\Http\Request;
class CollectionController extends Controller {
    public function __construct(protected CollectionService $collectionService) {}
    public function index(Request $request) { return view('admin.collections.index', ['collections' => $this->collectionService->paginate($request->only('search'))]); }
    public function create() { return view('admin.collections.create'); }
    public function store(StoreCollectionRequest $request) { $this->collectionService->create($request->validated(), $request->file('image'), $request->file('banner')); return redirect()->route('admin.collections.index')->with('success', 'Collection created.'); }
    public function edit(Collection $collection) { return view('admin.collections.edit', compact('collection')); }
    public function update(UpdateCollectionRequest $request, Collection $collection) { $this->collectionService->update($collection, $request->validated(), $request->file('image'), $request->file('banner')); return redirect()->route('admin.collections.index')->with('success', 'Collection updated.'); }
    public function destroy(Collection $collection) { $this->collectionService->delete($collection); return redirect()->route('admin.collections.index')->with('success', 'Collection deleted.'); }
}
