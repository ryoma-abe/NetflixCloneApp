# Supabase + Cloudflare Pages デプロイガイド

このガイドでは、Supabase（PostgreSQLデータベース）とCloudflare Pages（ホスティング）を使用してアプリケーションをデプロイする手順を説明します。

## 前提条件

- GitHubアカウント
- Supabaseアカウント（無料枠あり）
- Cloudflareアカウント（無料）
- Node.js 18以上がローカルにインストール済み

## ステップ1: Supabaseプロジェクトのセットアップ

### 1.1 Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com)にログイン
2. 「New project」をクリック
3. 以下の情報を入力：
   - Project name: `streamflix-db`（任意）
   - Database password: 強力なパスワードを設定（後で使用するので保存）
   - Region: Tokyo（東京）を選択
4. 「Create new project」をクリック

### 1.2 データベース接続情報の取得

1. プロジェクトダッシュボードで「Settings」→「Database」に移動
2. 「Connection string」セクションから以下をコピー：
   - **URI** (Connection pooling enabled): `postgresql://postgres.[project-ref]:[password]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
   - **DIRECT URL**: `postgresql://postgres.[project-ref]:[password]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres`

## ステップ2: Prismaの設定

### 2.1 Prismaスキーマの更新

`prisma/schema.prisma`を以下のように更新：

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id             String   @id @default(cuid())
  email          String   @unique
  name           String?
  image          String?
  hashedPassword String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  favorites      Movie[]
}

model Movie {
  id           Int      @id
  title        String
  description  String?
  videoUrl     String?
  thumbnailUrl String
  genre        String?
  duration     String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  favoritedBy  User[]
}
```

### 2.2 環境変数の設定

`.env.local`ファイルを更新：

```env
# Supabase Database URLs
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15"
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"

# TMDB API
NEXT_PUBLIC_TMDB_API_KEY="your_tmdb_api_key"

# NextAuth
NEXTAUTH_URL="https://your-app.pages.dev"  # Cloudflare PagesのURL
NEXTAUTH_SECRET="your_nextauth_secret"  # openssl rand -base64 32 で生成

# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

### 2.3 データベースのマイグレーション

```bash
# Prismaクライアントの生成
npx prisma generate

# データベースの作成とマイグレーション
npx prisma db push

# （オプション）シードデータの投入
npm run seed
```

## ステップ3: プロジェクトの調整

### 3.1 package.jsonの更新

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "postinstall": "prisma generate",
    "seed": "tsx prisma/seed.ts"
  }
}
```

### 3.2 Prismaクライアントの設定確認

`src/lib/prisma.ts`が以下のようになっていることを確認：

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

## ステップ4: Cloudflare Pagesでのデプロイ

### 4.1 GitHubへのプッシュ

```bash
git add .
git commit -m "Setup for Supabase and Cloudflare Pages deployment"
git push origin main
```

### 4.2 Cloudflare Pagesプロジェクトの作成

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)にログイン
2. 「Pages」セクションに移動
3. 「Create a project」をクリック
4. 「Connect to Git」を選択
5. GitHubアカウントを連携し、リポジトリを選択

### 4.3 ビルド設定

以下の設定を入力：

- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Node version**: `18`（環境変数で設定）

### 4.4 環境変数の設定

「Environment variables」セクションで以下を追加：

```
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15
DIRECT_URL=postgresql://postgres.[project-ref]:[password]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
NEXTAUTH_URL=https://your-app.pages.dev
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NODE_VERSION=18
```

### 4.5 デプロイの実行

「Save and Deploy」をクリックしてデプロイを開始

## ステップ5: Google OAuth の設定

### 5.1 Google Cloud Consoleでの設定

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. プロジェクトを作成または選択
3. 「APIとサービス」→「認証情報」に移動
4. 「認証情報を作成」→「OAuth クライアント ID」を選択
5. 以下を設定：
   - アプリケーションの種類: ウェブアプリケーション
   - 承認済みのJavaScript生成元: `https://your-app.pages.dev`
   - 承認済みのリダイレクトURI: `https://your-app.pages.dev/api/auth/callback/google`

## トラブルシューティング

### よくある問題と解決策

1. **ビルドエラー: "Cannot find module '@prisma/client'"**
   - `postinstall`スクリプトが正しく設定されているか確認
   - `npm run build`コマンドに`prisma generate`が含まれているか確認

2. **データベース接続エラー**
   - Supabaseプロジェクトがアクティブか確認
   - 接続文字列のパスワードが正しいか確認
   - `pgbouncer=true`パラメータが含まれているか確認

3. **認証エラー**
   - `NEXTAUTH_URL`がCloudflare PagesのURLと一致しているか確認
   - Google OAuthのリダイレクトURIが正しく設定されているか確認

4. **環境変数が読み込まれない**
   - Cloudflare Pagesの環境変数セクションで全ての変数が設定されているか確認
   - 変数名が正確に一致しているか確認

## パフォーマンスの最適化

1. **Edge Runtime の使用**
   - 可能な限りEdge Runtimeを使用してレスポンス時間を短縮

2. **データベース接続プーリング**
   - SupabaseのConnection Poolingを有効にして接続を最適化

3. **キャッシュの活用**
   - 静的なデータはISRまたはSSGを使用してキャッシュ

## セキュリティのベストプラクティス

1. **環境変数の管理**
   - 本番環境の環境変数は絶対にコードにコミットしない
   - `NEXTAUTH_SECRET`は強力なランダム文字列を使用

2. **データベースセキュリティ**
   - Row Level Security (RLS)をSupabaseで有効化
   - 最小権限の原則に従ってアクセスを制限

3. **CORS設定**
   - 必要に応じてCORS設定を調整

これで、Supabase + Cloudflare Pagesでのデプロイが完了します！