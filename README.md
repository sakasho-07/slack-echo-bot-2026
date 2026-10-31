# Slack Echo Bot

Slack Bolt for JavaScript・Node.js・Vercelを使用して作成した、Slackのメンションに反応するオウム返しBotです。

## 1. 概要

SlackのチャンネルでBotにメンションすると、メンションされたメッセージと同じ内容をスレッド内に返信します。

Slack Events APIを利用してメッセージを受け取り、Vercel上で処理を実行します。

## 2. 主な機能

- SlackでBotにメンションすると自動返信
- 受け取ったメッセージと同じテキストを返信
- 元のメッセージに紐づくスレッド内に返信
- Slack Events APIによるイベント受信
- Vercelへのデプロイによる公開

## 3. 使用技術

| 技術 | 用途 |
|---|---|
| Node.js | JavaScriptの実行環境 |
| JavaScript | Botの処理を記述 |
| Slack Bolt | Slack Botの開発 |
| Vercel | アプリケーションのデプロイ |
| @vercel/slack-bolt | VercelとSlack Boltの連携 |
| dotenv | 環境変数の読み込み |
| Git / GitHub | ソースコードの管理 |

## 4. 処理の流れ

1. SlackのチャンネルでユーザーがBotにメンションする。
2. Slack Events APIがメンションイベントを送信する。
3. VercelのAPIエンドポイントがイベントを受け取る。
4. Slack Boltが `app_mention` イベントを検知する。
5. `client.chat.postMessage()` で返信メッセージを送信する。
6. 元のメッセージのスレッド内に返信が表示される。

## 5. ファイル構成

```text
slack-echo-bot/
├── api/
│   └── slack/
│       └── events.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── package-lock.json
```

### 主要ファイル

- `api/slack/events.js`：Slackイベントの受信と返信処理
- `.env`：Bot TokenとSigning Secretを管理
- `.gitignore`：`.env` や `node_modules/` をGitの管理対象から除外
- `package.json`：使用するパッケージや設定を管理
- `package-lock.json`：インストールしたパッケージのバージョンを管理

## 6. 環境変数

以下の環境変数を設定する必要があります。

```env
SLACK_BOT_TOKEN=取得したBot User OAuth Token
SLACK_SIGNING_SECRET=取得したSigning Secret
```

ローカル環境では `.env` に設定し、VercelではプロジェクトのEnvironment Variablesに登録します。

※実際のTokenやSecretは公開しないでください。

## 7. セキュリティ対策

- 秘密情報を環境変数で管理
- `.env` を `.gitignore` に追加
- GitHubにTokenやSigning Secretを公開しない
- Slackのリクエスト署名を検証する仕組みを利用
- npm auditで依存パッケージの脆弱性を確認
- Zodの脆弱性に対してnpm overridesでバージョンを修正

## 8. 脆弱性対応

開発途中で `npm audit` を実行したところ、依存パッケージ内のZodに脆弱性が確認されました。

原因は、`@vercel/cli-config` が古い `zod@4.1.11` を使用していたことです。

`package.json` の `overrides` を利用して、Zodを `4.6.7` に変更しました。

修正後、以下のコマンドで確認しました。

```bash
npm explain zod
npm audit
```

結果：`found 0 vulnerabilities`

## 9. 動作確認

- SlackでBotにメンションできること
- Botがメッセージを受け取ること
- 元のメッセージのスレッド内に返信すること
- 返信までの時間が3秒以内であること
- Vercel上で正常に動作すること

## 10. 学習したこと

今回の課題を通じて、以下の内容を学びました。

- Slack Botの基本的な仕組み
- Slack Events APIによるイベントの受信
- Slack Boltを使用したイベント処理
- APIエンドポイントの役割
- 環境変数による秘密情報の管理
- Vercelへのデプロイ
- Git・GitHubによるバージョン管理
- npm auditによる脆弱性チェック
- npm overridesによる依存パッケージのバージョン調整

## 11. 今後の応用

今回作成したBotの仕組みを応用することで、以下のような機能を実装できます。

- 問い合わせ内容への自動返信
- Slackへの通知Bot
- 特定のキーワードに反応するBot
- AIと連携した質問回答Bot
- 業務連絡やタスク管理の自動化

今回の課題では、Slackからイベントを受け取り、サーバー側で処理してSlackに返信する一連の流れを実装しました。