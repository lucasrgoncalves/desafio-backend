<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movement extends Model
{
    protected $table = 'movement';
	public $timestamps = false;

    protected $fillable = [
        'account_id',
        'movement_type_id',
        'value'
    ];

    public function movement_types()
	{
		return $this->belongsTo(MovementType::class, 'movement_type_id');
	}

    public function accounts()
	{
		return $this->belongsTo(Account::class, 'account_id')->with('users');
	}
}
