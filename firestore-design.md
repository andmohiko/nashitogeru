<!-- @format -->

# Firestore 設計

- [goals](#goals)
  - [progresses](#progresses)
- [users](#users)

## goals

### 概要

```
/goals/{goalId}
```

- 成し遂げたいこと
- ID: 自動生成
- permission
  - read: client
  - create: client
  - update: client
  - delete: client

### 詳細

- createdAt: Timestamp 作成日時
- description: String 詳細
- isPublished: Boolean 公開フラグ
- target: String 目標
- updatedAt: Timestamp 更新日時
- userId: String ユーザー ID

## progresses

### 概要

```
/goals/{goalId}/progresses/${progressId}
```

- 進捗の投稿
- ID: 自動生成
- permission
  - read: client
  - create: client
  - update: client
  - delete: client

### 詳細

- createdAt: Timestamp 作成日時
- imagePaths: Array<String> 画像 URL の配列
- note: String コメント
- progressRate: Number 進捗率
- updatedAt: Timestamp 更新日時

## users

### 概要

```
/users/{userId}
```

- ユーザー
- ID: Firebase Auth の Uid
- permission
  - read: client
  - create: client
  - update: client
  - delete: なし

### 詳細

- createdAt: Timestamp 作成日時
- displayName: String 表示名
- email: String メールアドレス
- profileImagePath: String プロフィール画像 URL
- updatedAt: Timestamp 更新日時
- username: String ユーザー名
