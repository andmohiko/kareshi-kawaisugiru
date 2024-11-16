# firestore 設計

- [scenes](#scenes)
- [tags](#tags)

## scenes

### 概要

```
/scenes/{sceneId}
```

- スクショ
- ID: 自動生成 ID

### 詳細

- createdAt: Timestamp 作成日時
- likes: number いいね数
- screenshotUrl: string カードの画像リンク
- shares: number リンク共有された数
- tags: string[] タグ
- title: string タイトル
- updatedAt: Timestamp 作成日時
- userId: string | null 投稿したユーザー ID
- videoName: string 動画名

## tags

### 概要

```
/tags/{tagId}
```

- タグ
- ID: 自動生成 ID

### 詳細

- createdAt: Timestamp 作成日時
- label: string タグ名
- scenesCount: number タグがつけられている画像の数
- updatedAt: Timestamp 作成日時
