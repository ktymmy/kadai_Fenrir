# 簡易仕様書サンプル

### 作者
片山 美結
### アプリ名
ぱくぱく

#### コンセプト
現在地から近くのお店がすぐに見つかる。

#### こだわったポイント
女性向けのアプリにしてみたいと思い作成しました。
検索条件に女子会などでお店が見つかりやすいようにしました。

### 公開したアプリの URL（Store にリリースしている場合）


### 該当プロジェクトのリポジトリ URL（GitHub,GitLab など Git ホスティングサービスを利用されている場合）
https://github.com/ktymmy/kadai_Fenrir.git

## 開発環境
### 開発環境
Node.js 20.9.0
npm 10.1.0
Next.js @15.1.6
Typescript　5.7.3

### 開発言語
Typescript(Next.js)

### テーブル定義(ER図)などの設計ドキュメント（ウェブアプリ）


### 開発環境構築手順(ウェブアプリ)
コマンドプロンプト
ディレクトリにて
-npm install next@latest
-npm install @types/next

## 動作対象端末・OS
### 動作対象OS
windows
ios

## 開発期間
2週間

## アプリケーション機能

### 機能一覧
- レストラン検索：ホットペッパーグルメサーチAPIを使用して現在地周辺の飲食店を検索する。【設定した検索条件：現在地からの検索半径・店舗名・キーワード・個室ありなし】
- レストラン情報取得：ホットペッパーグルメサーチAPIを使用して、飲食店の詳細情報を取得する。

### 画面一覧
- 検索画面 ：条件を指定してレストランを検索する。
- 一覧画面 ：検索結果の飲食店を一覧表示する。
- 店舗詳細画面:選択した店舗の詳細な情報を表示する。

### 使用しているAPI,SDK,ライブラリなど
- ホットペッパーグルメサーチAPI

### 技術面でアドバイスして欲しいポイント
ディレクトリ構造に悩んでいます。今回のような規模の開発において、どのようなアーキテクチャ設計が適切か教えていただきたいです。
また、レンダリングの最適化を目指しているため、コードのパフォーマンス向上に関してアドバイスをいただけると幸いです。
