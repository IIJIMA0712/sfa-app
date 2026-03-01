# SFA (Sales Force Automation) / CRM システム　(sfa-app)
営業活動を可視化し、チーム全体の連携の迅速化を支援する顧客・案件管理システムです。

# 🚀 プロジェクトの概要
「誰が、いつ、どの案件を動かしたか」をリアルタイムで把握し、
放置案件や期限切れ案件を未然に防ぐことを目的として開発しました。

# 🛠 使用技術
バックエンド: Laravel 11 (PHP 8.3)

フロントエンド: React (Inertia.js), Tailwind CSS

データベース: MySQL 8.0

インフラストラクチャー: Laravel Sail (Docker)

ツール: Vite, Laravel Breeze (Authenticated Layout)

# 📊 主な機能

## 1. ダッシュボード
   営業担当が「今日優先すべきタスク」を直感的に判断できるよう、以下の集計ロジックを実装しました。

<img width="1386" height="1032" alt="image" src="https://github.com/user-attachments/assets/b19589cb-8c60-4f86-9c85-9fadc700b6e7" />

### 放置案件の可視化

抽出条件: 完了（受注・失注）以外、かつ最終活動日（last_activity_at）から30 日以上経過 した担当案件を抽出。

目的: アプローチ漏れをゼロにし、営業効率を最大化します。
押下すると、対象案件が表示されます。
<img width="1070" height="988" alt="image" src="https://github.com/user-attachments/assets/e1558044-e2ef-4028-9f8c-1d396835ecfe" />



### 今月の着地予想集計

集計条件: 完了予定日（expected_closing_date）が 当月中 かつ未完了案件の金額を合計。

技術点: whereMonth や whereYear を用いた動的なクエリ発行。
<img width="499" height="325" alt="image" src="https://github.com/user-attachments/assets/e0ad2a3f-73f5-4bf1-8aa8-283e6c763c92" />


### 期限切れ案件の警告

抽出条件: 完了予定日が過ぎているにもかかわらず、ステータスが「完了」になっていない案件。

押下すると、対象案件が表示されます。
<img width="1070" height="988" alt="image" src="https://github.com/user-attachments/assets/6690b602-93f5-44a3-9144-899cd4aa346a" />





## 2. 案件管理 (CRUD) 
   ### 編集・削除権限の切り替え

   権限あり
   <img width="1070" height="988" alt="image" src="https://github.com/user-attachments/assets/8ce0d62b-1b95-4c7e-bc58-c345b5a3efb2" />

   権限無し
   <img width="1070" height="988" alt="image" src="https://github.com/user-attachments/assets/37d982fb-769b-405d-98fa-ca35e77534d4" />

## 3.案件詳細画面

 ### 期限切れ：完了予定日が過ぎているにもかかわらず、ステータスが「完了」になっていない案件
 ### 放置(経過日)：完了（受注・失注）以外、かつ最終活動日から30 日以上経過 した担当案件
  <img width="1070" height="988" alt="image" src="https://github.com/user-attachments/assets/08f30337-fbb7-4d02-93c3-9229a92d3aca" />

## 4.担当案件管理画面

 ### 担当案件の進捗をその場で更新可能
 <img width="1070" height="988" alt="image" src="https://github.com/user-attachments/assets/5675e3d6-68d5-4f14-8980-05bb16f0dafe" />


## 5. 自動アクティビティログ
   案件のステータス変更をシステムが自動検知し、全ユーザーの動きをタイムライン形式で表示。
   <img width="998" height="530" alt="image" src="https://github.com/user-attachments/assets/ab65ee11-9a4f-4c96-96d6-4d889db028cd" />


#💡 こだわったポイント

## 1. Observer パターンによる自動ログ生成
   ステータス変更を検知してログを生成する際、Controller にロジックを記述せず、
   Laravel の Observer を採用しました。

メリット: ビジネスロジックの肥大化を防ぐ（疎結合）とともに、確実にログが残る堅牢性を確保。

実装の工夫: isDirty() や getOriginal() を活用。DB 上の数値（ID）をユーザーが理解しやすい日本語ラベルに変換して保存することで、情報の視認性を高めました。

## 2. Docker (Laravel Sail) による開発環境の共通化
   チーム開発を意識し、OS 等の環境に左右されず、誰でもコマンド一つで同一の開発環境を構築できるよう Docker でパッケージ化しています。

🗄 データベース設計
案件（deals）を中心に、企業（companies）、ユーザー（users）、および変更履歴（activity_logs）が適切に紐づくリレーショナル設計を行っています。

🏁 セットアップ（Laravel Sail 使用）
Docker Desktop が起動していることを確認してください。

Bash

# 1. クローン

git clone [[リポジトリ URL](https://github.com/IIJIMA0712/sfa-app)]
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
