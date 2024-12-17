# firestore 設計

- [kareshis](#kareshis)
- [users](#users)

## kareshis

### 概要

```
/kareshis/{userId}
```

- 彼氏ページ一覧
- ID: 作成ユーザーの Uid

### 詳細

- createdAt: Timestamp 作成日時
- kareshiName: String 彼氏名
- landscapeImageUrl: String? 横向きの画像 URL
- ogpImageUrl: String? OGP 画像 URL
- portraitImageUrl: String? 縦向きの画像 URl
- squareImageUrl: String? 正方形の画像 URL
- updatedAt: Timestamp 作成日時
- username: String ユーザー名

## users

### 概要

```
/users/{userId}
```

- ユーザー一覧
- ID: Firebase Auth の Uid

### 詳細

- createdAt: Timestamp 作成日時
- email: String メールアドレス
- name: String? 名前
- updatedAt: Timestamp 作成日時
