<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MovementType extends Model
{
    protected $table = 'movement_type';
	public $timestamps = false;

    protected $fillable = [
        'description',
    ];

    public function movements()
	{
		return $this->hasMany(Movement::class, 'movement_type_id');
	}
}
