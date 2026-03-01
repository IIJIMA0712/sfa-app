<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DealController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ログインしている時のみ、閲覧可能
Route::middleware(['auth', 'verified'])->group(function () {
    // 一覧処理
    Route::get('/companies', [CompanyController::class, 'index'])->name('companies.index');
    // 新規作成画面の表示
    Route::get('/companies/create', [CompanyController::class, 'create'])->name('companies.create');
    // 企業情報登録処理
    Route::post('/companies', [CompanyController::class, 'store'])->name('companies.store');
    // 企業情報編集画面の表示
    Route::get('/companies/{company}/edit', [CompanyController::class, 'edit'])->name('companies.edit');
    // 企業情報更新処理
    Route::patch('/companies/{company}', [CompanyController::class, 'update'])->name('companies.update');
    // 企業情報削除処理
    Route::delete('/companies/{company}', [CompanyController::class, 'destroy'])->name('companies.destroy');
    // 企業詳細画面の表示
    Route::get('/companies/{company}', [CompanyController::class, 'show'])->name('companies.show');
    // 担当案件管理画面の表示
    Route::get('/deals', [DealController::class, 'index'])->name('deals.index');
    // 担当案件更新処理
    Route::patch('/deals/{deal}', [DealController::class, 'update'])->name('deals.update');
});

require __DIR__.'/auth.php';
