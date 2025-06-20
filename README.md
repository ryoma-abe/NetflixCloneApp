# Streamflix - 映画ストリーミングアプリ

Next.js 15を使用して構築された、映画閲覧、ユーザー認証、お気に入り管理機能を備えたモダンな映画ストリーミングWebアプリケーションです。

## 🚀 主な機能

- **映画ブラウジング**: オリジナル、トレンド、高評価、アクション、ニュース、キッズ、ロマンス、ドキュメンタリーなど、複数のカテゴリーから映画を閲覧
- **ユーザー認証**: NextAuth.jsを使用したGoogle OAuthによる安全な認証
- **お気に入りシステム**: 個人のお気に入りリストに映画を追加・削除
- **映画詳細表示**: 映画の概要、ジャンル、上映時間などの詳細情報を表示
- **YouTube連携**: アプリ内で直接映画の予告編を視聴
- **レスポンシブデザイン**: すべてのデバイスでシームレスに動作するモバイルファーストデザイン
- **リアルタイム更新**: スムーズなユーザー体験のための楽観的UI更新

## 🛠️ 技術スタック

### フロントエンド
- **[Next.js 15.3.3](https://nextjs.org/)** - App Routerを使用したReactフレームワーク
- **[React 19.0.0](https://react.dev/)** - UIライブラリ
- **[TypeScript 5](https://www.typescriptlang.org/)** - 型安全なJavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - ユーティリティファーストのCSSフレームワーク

### バックエンド・データベース
- **[Prisma 6.9.0](https://www.prisma.io/)** - モダンなORM
- **SQLite** - ローカルデータベース
- **[NextAuth.js 4.24.11](https://next-auth.js.org/)** - 認証ライブラリ

### 外部サービス
- **[The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api)** - 映画データソース
- **Google OAuth** - ユーザー認証

### 主要ライブラリ
- **axios** - HTTPクライアント
- **react-hot-toast** - トースト通知
- **react-icons** - アイコンライブラリ
- **react-youtube** - YouTubeプレーヤー統合
- **bcryptjs** - パスワードハッシュ化

## 📁 プロジェクト構造

```
netflixcloneapp/
├── prisma/
│   └── schema.prisma       # データベーススキーマ定義
├── public/                 # 静的アセット
├── src/
│   ├── app/               # Next.js App Routerページ
│   │   ├── api/          # APIルート
│   │   │   ├── auth/     # NextAuth設定
│   │   │   └── favorite/ # お気に入りCRUD操作
│   │   ├── favorites/    # お気に入りページ
│   │   ├── layout.tsx    # プロバイダーを含むルートレイアウト
│   │   └── page.tsx      # ホームページ
│   ├── components/        # Reactコンポーネント
│   │   ├── Banner.tsx    # ヒーローバナーコンポーネント
│   │   ├── Header.tsx    # ナビゲーションヘッダー
│   │   ├── MovieCard.tsx # 個別の映画カード
│   │   ├── MovieModal.tsx# 映画詳細モーダル
│   │   └── Row.tsx       # 映画の行表示
│   ├── hooks/            # カスタムReactフック
│   │   └── useFavorites.ts # お気に入り管理フック
│   ├── lib/              # ユーティリティ関数
│   │   ├── auth.ts       # 認証ユーティリティ
│   │   ├── axios.ts      # Axiosインスタンス設定
│   │   ├── favorite.ts   # お気に入り操作
│   │   ├── prisma.ts     # Prismaクライアントインスタンス
│   │   ├── request.ts    # TMDB APIエンドポイント
│   │   └── tmdb.ts       # TMDB axios設定
│   └── types/            # TypeScript型定義
│       └── Movie.ts      # Movie型定義
├── .env.local            # 環境変数
├── package.json          # プロジェクト依存関係
├── tsconfig.json         # TypeScript設定
└── tailwind.config.ts    # Tailwind CSS設定
```

## 🗄️ データベーススキーマ

アプリケーションはPrismaとSQLiteデータベースを使用し、以下のスキーマを持ちます：

### Userモデル
- `id`: 一意識別子
- `email`: ユーザーのメールアドレス（一意）
- `name`: ユーザーの表示名
- `image`: プロフィール画像URL
- `hashedPassword`: 暗号化されたパスワード（オプション、メール認証用）
- `favorites`: 映画との多対多リレーション

### Movieモデル
- `id`: 一意識別子
- `title`: 映画タイトル
- `description`: 映画の概要
- `videoUrl`: 予告編URL
- `thumbnailUrl`: 映画ポスターURL
- `genre`: 映画ジャンル
- `duration`: 上映時間
- `favoritedBy`: ユーザーとの多対多リレーション

## 🔧 セットアップ・インストール

1. **リポジトリのクローン**
   ```bash
   git clone https://github.com/yourusername/netflixcloneapp.git
   cd netflixcloneapp
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   ```

3. **環境変数の設定**
   ルートディレクトリに`.env.local`ファイルを作成：
   ```env
   # データベース
   DATABASE_URL="file:./dev.db"
   
   # TMDB API
   NEXT_PUBLIC_TMDB_API_KEY="your_tmdb_api_key"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_nextauth_secret"
   
   # Google OAuth
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   ```

4. **データベースのセットアップ**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **データベースのシード（オプション）**
   ```bash
   npm run seed
   ```

6. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

7. **アプリケーションを開く**
   [http://localhost:3000](http://localhost:3000)にアクセス

## 📡 APIルート

### 認証
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js認証エンドポイント

### お気に入り
- `GET /api/favorite` - ユーザーのお気に入り映画を取得
- `POST /api/favorite` - お気に入りに映画を追加
- `DELETE /api/favorite` - お気に入りから映画を削除

## 🏗️ アーキテクチャ詳細

### コンポーネントアーキテクチャ
アプリケーションは、関心の分離が明確なコンポーネントベースのアーキテクチャに従っています：

- **ページ**: Next.js App Routerを使用して`app/`ディレクトリに配置
- **コンポーネント**: `components/`内の再利用可能なUIコンポーネント
- **フック**: ビジネスロジック用のカスタムReactフック
- **APIルート**: `app/api/`内のサーバーサイドエンドポイント

### 状態管理
- UI操作用のローカルコンポーネント状態
- 複雑な状態ロジック用のカスタムフック
- 認証状態用のNextAuthセッション
- お気に入り機能の楽観的更新

### データフロー
1. **TMDB API** → 映画データの取得
2. **APIルート** → リクエストの処理とデータベースとの対話
3. **カスタムフック** → クライアントサイドの状態とAPIコールの管理
4. **コンポーネント** → データに基づいたUIのレンダリング

### 主要なデザインパターン
- **カスタムフックパターン**: ビジネスロジックのカプセル化（例：`useFavorites`）
- **コンポーネント構成**: 再利用可能なUIコンポーネント
- **APIルートハンドラー**: RESTful API設計
- **型安全性**: 完全なTypeScript実装

## 🚀 デプロイ

このアプリケーションはNext.jsをサポートするプラットフォームにデプロイできます：

### Cloudflare Pages

#### 前提条件
- SQLiteは使用できないため、別のデータベースサービス（Supabase、Neon、PlanetScale等）への移行が必要
- Cloudflareアカウント
- GitHubリポジトリ

#### デプロイ手順

1. **データベースの準備**
   - Cloudflare PagesではSQLiteが使用できないため、外部データベースサービスを使用
   - 推奨: Supabase（PostgreSQL）、Neon（PostgreSQL）、PlanetScale（MySQL）
   - 選択したサービスでデータベースを作成し、接続URLを取得

2. **Prismaスキーマの更新**
   ```prisma
   // prisma/schema.prisma
   datasource db {
     provider = "postgresql" // または "mysql"
     url      = env("DATABASE_URL")
   }
   ```

3. **ビルドコマンドの設定**
   ```json
   // package.json に追加
   "scripts": {
     "postinstall": "prisma generate",
     "build": "prisma generate && next build"
   }
   ```

4. **Cloudflare Pagesでのセットアップ**
   - Cloudflareダッシュボードにログイン
   - 「Pages」セクションに移動
   - 「プロジェクトを作成」をクリック
   - GitHubアカウントを接続し、リポジトリを選択

5. **ビルド設定**
   - フレームワークプリセット: `Next.js`
   - ビルドコマンド: `npm run build`
   - ビルド出力ディレクトリ: `.next`

6. **環境変数の設定**
   Cloudflare Pagesダッシュボードで以下の環境変数を追加：
   ```
   DATABASE_URL=your_database_url
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
   NEXTAUTH_URL=https://your-app.pages.dev
   NEXTAUTH_SECRET=your_nextauth_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

7. **デプロイ**
   - 「保存してデプロイ」をクリック
   - 初回ビルドが完了するまで待機

#### 注意事項
- Cloudflare Pagesは静的サイトホスティングサービスのため、一部のNext.js機能に制限があります
- Edge Runtimeの使用を推奨
- ISR（Incremental Static Regeneration）は制限付きサポート

### Vercel（推奨）
1. GitHubにプッシュ
2. Vercelでプロジェクトをインポート
3. 環境変数を設定
4. デプロイ

### その他のプラットフォーム
- アプリケーションのビルド: `npm run build`
- プロダクションサーバーの起動: `npm start`

## 🔒 セキュリティ考慮事項

- NextAuth.jsによる安全なセッション管理での認証処理
- 機密データ用の環境変数
- セッションチェックで保護されたAPIルート
- bcryptjsによるパスワードハッシュ化（メール認証実装時）

## 🤝 コントリビューション

1. リポジトリをフォーク
2. フィーチャーブランチを作成（`git checkout -b feature/AmazingFeature`）
3. 変更をコミット（`git commit -m 'Add some AmazingFeature'`）
4. ブランチにプッシュ（`git push origin feature/AmazingFeature`）
5. プルリクエストを開く

## 📝 ライセンスとクレジット

### ライセンス
このプロジェクトは教育目的のものです。

### データソース
このアプリケーションは、映画データの取得に[The Movie Database (TMDB) API](https://www.themoviedb.org/)を使用しています。

#### TMDB利用規約
- すべての映画データ、画像、情報はTMDB APIから提供されています
- TMDB APIの利用には[利用規約](https://www.themoviedb.org/terms-of-use)への同意が必要です
- TMDBのロゴと帰属表示は必須です

#### 免責事項
- このアプリケーションはTMDBによって承認されておらず、TMDBと提携していません
- 映画の著作権は各権利保有者に帰属します
- このプロジェクトは非営利の教育目的でのみ使用してください

## 🙏 謝辞

- 映画データベースAPIを提供してくれた[TMDB](https://www.themoviedb.org/)
- 素晴らしいフレームワークを提供してくれた[Next.js](https://nextjs.org/)チーム
- ホスティングソリューションを提供してくれた[Vercel](https://vercel.com/)