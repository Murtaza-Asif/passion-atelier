<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class Tag extends Model {
    protected $fillable = ['name', 'slug'];
    protected static function booted(): void {
        static::creating(function (self $model) { if (empty($model->slug)) $model->slug = Str::slug($model->name); });
    }
}
