<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTagRequest;
use App\Http\Requests\Admin\UpdateTagRequest;
use App\Models\Tag;
use App\Services\Admin\TagService;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function __construct(protected TagService $tagService) {}

    public function index(Request $request)
    {
        return view('admin.tags.index', ['tags' => $this->tagService->paginate($request->only('search'))]);
    }

    public function create()
    {
        return view('admin.tags.create');
    }

    public function store(StoreTagRequest $request)
    {
        $this->tagService->create($request->validated());

        return redirect()->route('admin.tags.index')->with('success', 'Tag created.');
    }

    public function edit(Tag $tag)
    {
        return view('admin.tags.edit', compact('tag'));
    }

    public function update(UpdateTagRequest $request, Tag $tag)
    {
        $this->tagService->update($tag, $request->validated());

        return redirect()->route('admin.tags.index')->with('success', 'Tag updated.');
    }

    public function destroy(Tag $tag)
    {
        $this->tagService->delete($tag);

        return redirect()->route('admin.tags.index')->with('success', 'Tag deleted.');
    }
}
