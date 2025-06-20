# Streamflix - 映画ストリーミングアプリ

モダンな技術スタックで構築された、映画ストリーミング Web アプリケーションです。

## 🚀 主な機能

- **映画ブラウジング**: 複数のカテゴリーから映画を閲覧
- **ユーザー認証**: Google OAuth による安全な認証
- **お気に入り管理**: 映画をお気に入りに追加・削除
- **映画詳細表示**: 概要、ジャンル、上映時間などの詳細情報
- **予告編再生**: YouTube 統合による予告編視聴
- **レスポンシブデザイン**: 全デバイス対応のモバイルファーストデザイン

## 🛠️ 使用技術

### フロントエンド

- **Next.js 15** - React フレームワーク（App Router）
- **React 19** - UI ライブラリ
- **TypeScript** - 型安全な開発
- **Tailwind CSS 4** - スタイリング

### バックエンド・データベース

- **Prisma** - ORM
- **PostgreSQL** - データベース（Supabase）
- **NextAuth.js** - 認証

### 外部 API・サービス

- **TMDB API** - 映画データ
- **Google OAuth** - ユーザー認証

## 🏗️ アーキテクチャの特徴

- **型安全性**: TypeScript による完全な型定義
- **コンポーネント設計**: 再利用可能な UI コンポーネント
- **カスタムフック**: ビジネスロジックの分離
- **最適化**: 画像の遅延読み込み、楽観的 UI 更新
- **セキュリティ**: セッションベースの認証、環境変数による秘匿情報管理

## 📁 プロジェクト構造

```
src/
├── app/               # ページとAPIルート
├── components/        # UIコンポーネント
├── hooks/            # カスタムReactフック
├── lib/              # ユーティリティ関数
└── types/            # TypeScript型定義
```

## 🔧 セットアップ

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/streamflix.git

# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env.local

# 開発サーバーの起動
npm run dev
```

## 📝 ライセンスとクレジット

このプロジェクトは教育目的で作成されました。

### データソース

映画データは[The Movie Database (TMDB)](https://www.themoviedb.org/)から提供されています。

---

<p align="center">
  Made with ❤️ by [Your Name]
</p>
