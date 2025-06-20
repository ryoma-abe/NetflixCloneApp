# Supabase + Vercel デプロイガイド

このガイドでは、Supabase（PostgreSQLデータベース）とVercel（ホスティング）を使用してNext.jsアプリケーションをデプロイする手順を詳細に説明します。

## 前提条件

- GitHubアカウント
- Supabaseアカウント（無料枠あり）
- Vercelアカウント（無料枠あり）
- Node.js 18以上がローカルにインストール済み
- TMDBアカウント（API key取得用）
- Googleアカウント（OAuth設定用）

## ステップ1: TMDBアカウントとAPI Keyの取得

### 1.1 TMDBアカウントの作成
1. [TMDB (The Movie Database)](https://www.themoviedb.org/)にアクセス
2. 「Sign Up」をクリックしてアカウントを作成
3. メール認証を完了

### 1.2 API Keyの取得
1. ログイン後、右上のプロフィールアイコンをクリック
2. 「Settings」→「API」に移動
3. 「Request an API Key」をクリック
4. 「Developer」を選択
5. 利用規約に同意し、アプリケーション情報を入力：
   - Application Name: `StreamFlix`
   - Application URL: `http://localhost:3000`（開発用）
   - Application Summary: `Netflix clone for learning purposes`
6. API Key (v3 auth)をコピーして保存

## ステップ2: Supabaseプロジェクトのセットアップ

### 2.1 Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com)にログイン
2. 「New project」をクリック
3. 以下の情報を入力：
   - Project name: `streamflix-db`（任意）
   - Database password: 強力なパスワードを設定（**必ず保存**）
   - Region: Tokyo（東京）を選択
4. 「Create new project」をクリック
5. プロジェクトの初期化を待つ（2-3分）

### 2.2 データベース接続情報の取得

1. プロジェクトダッシュボードで「Settings」→「Database」に移動
2. 「Connection string」セクションから以下をコピー：
   - **URI** (Connection pooling enabled): 
     ```
     postgresql://postgres.[project-ref]:[password]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
     ```
   - **Direct connection**:
     ```
     postgresql://postgres.[project-ref]:[password]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres
     ```

> **重要**: `[password]`部分は作成時に設定したパスワードに置き換えてください

## ステップ3: Prismaの設定とデータベースマイグレーション

### 3.1 環境変数の設定

プロジェクトルートに`.env`ファイルを作成（既にある場合は更新）：

```env
# Supabase Database URLs
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15"
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"

# TMDB API
NEXT_PUBLIC_TMDB_API_KEY="your_tmdb_api_key_here"

# NextAuth（後でVercelのURLに更新）
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_super_secret_nextauth_key_here"

# Google OAuth（後で設定）
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

### 3.2 NextAuth秘密キーの生成

強力な秘密キーを生成します：

```bash
# Mac/Linux
openssl rand -base64 32

# Windows (PowerShell)
[System.Web.Security.Membership]::GeneratePassword(32, 0)
```

生成された文字列を`NEXTAUTH_SECRET`に設定してください。

### 3.3 データベースマイグレーション

```bash
# 依存関係のインストール
npm install

# Prismaクライアントの生成
npx prisma generate

# データベースの作成とマイグレーション
npx prisma db push

# 動作確認
npx prisma studio
```

### 3.4 シードデータの投入（オプション）

```bash
npm run seed
```

## ステップ4: ローカルでの動作確認

### 4.1 開発サーバーの起動

```bash
npm run dev
```

### 4.2 動作確認チェックリスト

- [ ] http://localhost:3000 でアプリが表示される
- [ ] TMDB API経由で映画データが表示される
- [ ] データベース接続エラーが発生しない
- [ ] Prisma Studioでテーブルが作成されている

## ステップ5: Google OAuth の設定

### 5.1 Google Cloud Consoleでの設定

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成または既存プロジェクトを選択
3. 「APIとサービス」→「ライブラリ」に移動
4. 「Google+ API」を検索して有効化
5. 「APIとサービス」→「認証情報」に移動
6. 「OAuth同意画面」を設定：
   - User Type: 外部
   - アプリ名: StreamFlix
   - ユーザーサポートメール: あなたのメールアドレス
   - 開発者の連絡先情報: あなたのメールアドレス
7. 「認証情報を作成」→「OAuth クライアント ID」を選択
8. 以下を設定：
   - アプリケーションの種類: ウェブアプリケーション
   - 名前: StreamFlix Web Client
   - 承認済みのJavaScript生成元: 
     - `http://localhost:3000`（開発用）
   - 承認済みのリダイレクトURI: 
     - `http://localhost:3000/api/auth/callback/google`（開発用）

### 5.2 認証情報の設定

作成されたクライアントIDとシークレットを`.env`ファイルに追加：

```env
GOOGLE_CLIENT_ID="your_actual_google_client_id.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your_actual_google_client_secret"
```

## ステップ6: Vercelでのデプロイ

### 6.1 GitHubへのプッシュ

```bash
# すべての変更をステージング
git add .

# コミット
git commit -m "Setup for Vercel deployment with Supabase"

# GitHubにプッシュ
git push origin main
```

### 6.2 Vercelプロジェクトの作成

1. [Vercel](https://vercel.com)にアクセス
2. GitHubアカウントでログイン
3. 「New Project」をクリック
4. 該当するGitHubリポジトリを選択
5. 「Import」をクリック

### 6.3 環境変数の設定

「Environment Variables」セクションで以下を追加：

#### Production環境変数:

```
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15

DIRECT_URL=postgresql://postgres.[project-ref]:[password]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres

NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

NEXTAUTH_URL=https://your-app-name.vercel.app

NEXTAUTH_SECRET=your_super_secret_nextauth_key_here

GOOGLE_CLIENT_ID=your_google_client_id.googleusercontent.com

GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> **注意**: `NEXTAUTH_URL`は後でVercelが自動生成するURLに更新します

### 6.4 デプロイの実行

1. 「Deploy」をクリック
2. ビルドプロセスを監視
3. デプロイ完了後、URLをコピー

### 6.5 本番環境用の設定更新

#### 6.5.1 Google OAuth設定の更新

1. Google Cloud Consoleに戻る
2. OAuth クライアントIDの設定を編集
3. 承認済みのJavaScript生成元に追加：
   - `https://your-app-name.vercel.app`
4. 承認済みのリダイレクトURIに追加：
   - `https://your-app-name.vercel.app/api/auth/callback/google`

#### 6.5.2 Vercel環境変数の更新

1. Vercelプロジェクトの「Settings」→「Environment Variables」
2. `NEXTAUTH_URL`を実際のVercel URLに更新
3. 「Redeploy」をクリックして再デプロイ

## ステップ7: 動作確認とテスト

### 7.1 本番環境での動作確認

- [ ] アプリが正常に表示される
- [ ] 映画データが表示される
- [ ] Googleログインが機能する
- [ ] お気に入り機能が動作する
- [ ] データベースに正しくデータが保存される

### 7.2 パフォーマンステスト

1. [PageSpeed Insights](https://pagespeed.web.dev/)でテスト
2. [GTmetrix](https://gtmetrix.com/)でテスト
3. Lighthouse分析を実行

## トラブルシューティング

### よくある問題と解決策

#### 1. ビルドエラー: "Cannot find module '@prisma/client'"

**解決策:**
```bash
# package.jsonのpostinstallスクリプトを確認
"postinstall": "prisma generate"

# buildスクリプトを確認
"build": "prisma generate && next build"
```

#### 2. データベース接続エラー

**解決策:**
- Supabaseプロジェクトがアクティブか確認
- 接続文字列のパスワードが正しいか確認
- `pgbouncer=true`パラメータが含まれているか確認
- ファイアウォール設定を確認

#### 3. 認証エラー

**解決策:**
- `NEXTAUTH_URL`がVercelのURLと完全に一致しているか確認
- Google OAuthのリダイレクトURIが正しく設定されているか確認
- `NEXTAUTH_SECRET`が設定されているか確認

#### 4. 環境変数が読み込まれない

**解決策:**
- Vercelの環境変数セクションで全ての変数が設定されているか確認
- 変数名が正確に一致しているか確認（大文字小文字含む）
- 再デプロイを実行

#### 5. TMDB API エラー

**解決策:**
- API Keyが正しく設定されているか確認
- TMDB APIの利用制限に達していないか確認
- ネットワーク接続を確認

### デバッグ方法

#### 1. Vercelのログ確認

1. Vercelプロジェクトの「Functions」タブ
2. エラーログを確認
3. リアルタイムログを監視

#### 2. データベース接続確認

```bash
# ローカルでPrisma Studioを起動
npx prisma studio

# データベース接続テスト
npx prisma db pull
```

#### 3. 環境変数確認

Vercelの環境変数が正しく設定されているか、以下のAPI endpointで確認：

```javascript
// pages/api/debug/env.js（本番では削除すること）
export default function handler(req, res) {
  res.json({
    DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not set',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Set' : 'Not set',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set',
  });
}
```

## セキュリティのベストプラクティス

### 1. 環境変数の管理
- 本番環境の環境変数は絶対にコードにコミットしない
- `NEXTAUTH_SECRET`は強力なランダム文字列を使用
- 定期的にシークレットをローテーション

### 2. データベースセキュリティ
- Row Level Security (RLS)をSupabaseで有効化
- 最小権限の原則に従ってアクセスを制限
- 定期的にアクセスログを確認

### 3. API セキュリティ
- TMDB API Keyを適切に保護
- レート制限を実装
- エラーハンドリングで機密情報を漏洩させない

## パフォーマンス最適化

### 1. Next.js最適化
- Image コンポーネントの使用
- 動的インポートの活用
- ISR（Incremental Static Regeneration）の利用

### 2. データベース最適化
- Connection Poolingの活用
- 適切なインデックスの設定
- クエリの最適化

### 3. Vercel最適化
- Edge Functionsの活用
- Vercel Analytics の導入
- CDNキャッシュの最適化

## 継続的デプロイメント（CI/CD）

### 1. 自動デプロイ設定
Vercelでは、GitHubへのプッシュで自動的にデプロイされます。

### 2. プレビューデプロイ
- プルリクエストごとにプレビュー環境が自動作成
- 本番環境と同じ設定でテスト可能

### 3. ロールバック
- Vercelダッシュボードから簡単にロールバック可能
- Git commitベースでのバージョン管理

これで、Supabase + Vercelでの完全なデプロイが完了します！

## 追加リソース

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)