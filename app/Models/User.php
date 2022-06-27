<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'user';
	public $timestamps = false;

    protected $fillable = [
        'name',
        'email',
        'birthday',
        'initial_value'
    ];

    public function accounts()
	{
		return $this->hasMany(Account::class, 'user_id');
	}
}
