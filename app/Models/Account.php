<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;
    
    protected $table = 'account';
	public $timestamps = false;

    protected $fillable = [
        'user_id',
        'number'
    ];

    public function movements()
	{
		return $this->hasMany(Movement::class, 'account_id');
	}

    public function users()
	{
		return $this->belongsTo(User::class, 'user_id');
	}
}
