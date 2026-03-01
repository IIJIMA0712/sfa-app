SFA (Sales Force Automation) / CRM システム　(sfa-app)
営業活動を可視化し、チーム全体の連携の迅速化を支援する顧客・案件管理システムです。

🚀 プロジェクトの概要
「誰が、いつ、どの案件を動かしたか」をリアルタイムで把握し、
放置案件や期限切れ案件を未然に防ぐことを目的として開発しました。

🛠 使用技術
バックエンド: Laravel 11 (PHP 8.3)

フロントエンド: React (Inertia.js), Tailwind CSS

データベース: MySQL 8.0

インフラストラクチャー: Laravel Sail (Docker)

ツール: Vite, Laravel Breeze (Authenticated Layout)

📊 主な機能

1. ダッシュボード
   営業担当が「今日優先すべきタスク」を直感的に判断できるよう、以下の集計ロジックを実装しました。

放置案件の可視化

抽出条件: 完了（受注・失注）以外、かつ最終活動日（last_activity_at）から
　　　　　 30 日以上経過 した案件を抽出。

目的: アプローチ漏れをゼロにし、営業効率を最大化します。

今月の着地予想集計

集計条件: 完了予定日（expected_closing_date）が 当月中 かつ未完了案件の金額を合計。

技術点: whereMonth や whereYear を用いた動的なクエリ発行。

期限切れ案件の警告

抽出条件: 完了予定日が過ぎているにもかかわらず、ステータスが「完了」になっていない案件。

2. 案件管理 (CRUD) & フィルタリング
   案件の登録・編集、および進捗フェーズの更新。

3. 自動アクティビティログ
   案件のステータス変更をシステムが自動検知し、全ユーザーの動きをタイムライン形式で表示。

💡 こだわったポイント

1. Observer パターンによる自動ログ生成
   ステータス変更を検知してログを生成する際、Controller にロジックを記述せず、
   Laravel の Observer を採用しました。

メリット: ビジネスロジックの肥大化を防ぐ（疎結合）とともに、確実にログが残る堅牢性を確保。

実装の工夫: isDirty() や getOriginal() を活用。DB 上の数値（ID）をユーザーが理解しやすい日本語ラベルに変換して保存することで、情報の視認性を高めました。

2. Docker (Laravel Sail) による開発環境の共通化
   チーム開発を意識し、OS 等の環境に左右されず、誰でもコマンド一つで同一の開発環境を構築できるよう Docker でパッケージ化しています。

🗄 データベース設計
案件（deals）を中心に、企業（companies）、ユーザー（users）、および変更履歴（activity_logs）が適切に紐づくリレーショナル設計を行っています。

🏁 セットアップ（Laravel Sail 使用）
Docker Desktop が起動していることを確認してください。

Bash

# 1. クローン

git clone [リポジトリ URL]
cd sfa-app

# 2. 依存関係のインストール（Docker 上の Composer を利用）

docker run --rm \
 -u "$(id -u):$(id -g)" \
 -v "$(pwd):/var/www/html" \
 -w /var/www/html \
 laravelsail/php83-composer:latest \
 composer install --ignore-platform-reqs

# 3. 環境設定

cp .env.example .env

# 4. Sail の起動（バックグラウンド実行）

./vendor/bin/sail up -d

# 5. アプリケーション準備

./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate --seed
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
