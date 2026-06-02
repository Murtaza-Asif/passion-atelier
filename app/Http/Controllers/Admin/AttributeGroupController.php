<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAttributeGroupRequest;
use App\Http\Requests\Admin\UpdateAttributeGroupRequest;
use App\Models\AttributeGroup;
use App\Services\Admin\AttributeGroupService;
use Illuminate\Http\Request;

class AttributeGroupController extends Controller
{
    public function __construct(protected AttributeGroupService $attributeGroupService) {}

    public function index(Request $request)
    {
        return view('admin.attribute-groups.index', ['groups' => $this->attributeGroupService->paginate($request->only('search'))]);
    }

    public function create()
    {
        return view('admin.attribute-groups.create');
    }

    public function store(StoreAttributeGroupRequest $request)
    {
        $this->attributeGroupService->create($request->validated());

        return redirect()->route('admin.attribute-groups.index')->with('success', 'Attribute group created.');
    }

    public function edit(AttributeGroup $attributeGroup)
    {
        return view('admin.attribute-groups.edit', compact('attributeGroup'));
    }

    public function update(UpdateAttributeGroupRequest $request, AttributeGroup $attributeGroup)
    {
        $this->attributeGroupService->update($attributeGroup, $request->validated());

        return redirect()->route('admin.attribute-groups.index')->with('success', 'Attribute group updated.');
    }

    public function destroy(AttributeGroup $attributeGroup)
    {
        $this->attributeGroupService->delete($attributeGroup);

        return redirect()->route('admin.attribute-groups.index')->with('success', 'Attribute group deleted.');
    }
}
