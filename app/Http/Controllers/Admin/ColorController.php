<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreColorRequest;
use App\Http\Requests\Admin\UpdateColorRequest;
use App\Models\Color;
use App\Services\Admin\ColorService;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    public function __construct(protected ColorService $colorService) {}

    public function index(Request $request)
    {
        return view('admin.colors.index', ['colors' => $this->colorService->paginate($request->only('search'))]);
    }

    public function create()
    {
        return view('admin.colors.create');
    }

    public function store(StoreColorRequest $request)
    {
        $this->colorService->create($request->validated(), $request->file('image'));

        return redirect()->route('admin.colors.index')->with('success', 'Color created.');
    }

    public function edit(Color $color)
    {
        return view('admin.colors.edit', compact('color'));
    }

    public function update(UpdateColorRequest $request, Color $color)
    {
        $this->colorService->update($color, $request->validated(), $request->file('image'));

        return redirect()->route('admin.colors.index')->with('success', 'Color updated.');
    }

    public function destroy(Color $color)
    {
        $this->colorService->delete($color);

        return redirect()->route('admin.colors.index')->with('success', 'Color deleted.');
    }
}
