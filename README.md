# MEMO Markdown

## はじめに
- 本サイトは、書籍「Vue.jsとFirebaseで作るミニWebサービス」(ISBN978-4-8443-9861-5)を参考にし、以下の変更を加えながら学習用に再構築したものです。

## 主な変更点
### コード 環境・構成の見直し
- Vue2+webpack => Vue3+Vite
- Vue OptionsAPI => ConpositonAPI('script setup' syntax)
- Javascript => Typescript
- コンポーネント間データ連携　props/emit => pinia ('setup function' syntax)
- Firebase/Auth関連の汎用的関数部分をコンポーサブルへ分離
- Firebase接続初期化スニペットを環境変数へ分離保管。dotenvのモードオプションでgit公開非公開を管理。
- Firebase 使用APIのアップデート　the namespaced API => the modular API 
- データベースのアップデート　realtimeDatabase => Firestore
- メモデータのDBをfirebaseDBからブラウザsessionStorageとpersistするpinia Storeに。直接常時更新していたfirestoreのデータ使用量を削減。
- Firestore関連の汎用的な関数部分をコンポーサブルへ分離
- 任意のタイミングでメモデータをFirestoreからのリストア、Firestoreへセーブする機能を追加
  
### レイアウトデザイン、サイトデザインの改善
- メモリストをタブレイアウト化。タブ数が多数になる場合に対してカルーセル機能を付与。
- ボタンにツールチップでの説明を追加
- アカウントアイコン、メニューアイコン　ボタン追加
- 利用規約（例）、プライバシーポリシー（例）　ページ追加
- レスポンシブル対応
- ダークモード対応
- 日英言語切替対応