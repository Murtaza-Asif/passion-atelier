<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Attribute extends Model
{
    protected $fillable = ['attribute_group_id', 'name', 'slug', 'description', 'input_type', 'is_filterable', 'is_visible_on_front', 'is_specification', 'sort_order', 'status'];

    protected function casts(): array
    {
        return ['is_filterable' => 'boolean', 'is_visible_on_front' => 'boolean', 'is_specification' => 'boolean', 'status' => 'boolean'];
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(AttributeGroup::class, 'attribute_group_id');
    }

    public function values(): HasMany
    {
        return $this->hasMany(AttributeValue::class);
    }

    public function scopeActive($q)
    {
        return $q->where('status', true);
    }

    public function scopeFilterable($q)
    {
        return $q->where('is_filterable', true);
    }

    public function scopeSpecifications($q)
    {
        return $q->where('is_specification', true);
    }

    public function scopeOrdered($q)
    {
        return $q->orderBy('sort_order');
    }
}
