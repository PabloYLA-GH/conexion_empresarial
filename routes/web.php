<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');
Route::inertia('directorio', 'directorio')->name('directory');
Route::inertia('vinculaciones', 'vinculaciones')->name('vinculaciones');
Route::inertia('proximamente', 'proximamente')->name('proximamente');
Route::inertia('registro/pendiente', 'auth/registration-pending')->name('registration.pending');

Route::middleware(['auth'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
