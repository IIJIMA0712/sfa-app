<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CompanyController extends Controller
{
    /**
     * 一覧表示（検索・ダッシュボード連動・マイ案件フィルター）
     */
    public function index(Request $request)
    {
        // クエリを作成（関連データも一緒に持ってくる）
        $query = Company::with(['contacts', 'deals.user']);

        // 検索ワードがあれば絞り込み
        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        // ダッシュボードやボタンからのフィルターがあれば絞り込み
        $filter = $request->input('filter');

        if ($filter === 'stale') {
            // 放置案件（30日以上更新なし）がある企業
            $query->whereHas('deals', function ($q) {
                $q->whereIn('status', [1, 2, 3, 4])
                ->where('updated_at', '<', now()->subDays(30));
            });
        } elseif ($filter === 'expired') {
            // 期限切れ案件（完了予定日超過）がある企業
            $query->whereHas('deals', function ($q) {
                $q->whereIn('status', [1, 2, 3, 4])
                ->where('expected_closing_date', '<', now()->toDateString());
            });
        } elseif ($filter === 'mine') {
            // 自分の担当案件がある企業
            $query->whereHas('deals', function ($q) {
                $q->where('user_id', auth()->id());
            });
        }

        // データを確定（並び替えとページネーション）
        $companies = $query->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Companies/Index', [
            'companies' => $companies,
            // React側で入力欄の状態を保つために検索ワードとフィルターを返す
            'filters' => $request->only(['search', 'filter']),
        ]);
    }

    /**
     * 新規登録画面を表示する
     */
    public function create()
    {
        return Inertia::render('Companies/Create');
    }

    /**
     * 新しく企業を登録する
     */
    public function store(Request $request)
    {
        // 1. バリデーション（入力チェック）
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // 2. データベースへ保存
        Company::create($validated);

        // 3. 一覧画面へ戻る（メッセージ付き）
        return redirect()->route('companies.index')
            ->with('message', '企業を登録しました！');
    }

    /**
     * 編集画面を表示
     */
    public function edit(Company $company)
    {
        // $company にURLのIDに一致するデータが自動で入る。
        return Inertia::render('Companies/Edit', [
            'company' => $company
        ]);
    }

    /**
     * データを更新
     */
    public function update(Request $request, Company $company)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $company->update($validated);

        return redirect()->route('companies.index')
            ->with('message', '企業情報を更新しました');
    }

    /**
     * データを削除
     */
    public function destroy(Company $company)
    {
        $company->delete();

        return redirect()->route('companies.index')
            ->with('message', '企業を削除しました');
    }

    /**
     * 詳細画面を表示
     */
    public function show(Company $company)
    {
        $company->load(['contacts', 'deals.user']); 
    
        return Inertia::render('Companies/Show', [
            'company' => $company,
            // 最新の更新日を取得
            'latest_deal_date' => $company->deals->sortByDesc('updated_at')->first()?->updated_at,
            
            'can' => [
                'edit' => auth()->user()->can_edit,
            ]
        ]);
    }
}