# Job Application Tracker  
就職活動の応募状況を管理するフルスタックWebアプリです。

A full-stack web application for tracking job applications and their statuses.

---

## Features / 主な機能
- Add new job applications / 応募の追加  
- View application list / 応募一覧の表示 
- Search and filter applications / 応募の検索・絞り込み 
- Edit application details / 応募情報の編集  
- Delete applications / 応募の削除  
- REST API communication between frontend and backend / フロントエンドとバックエンドの連携  
- MySQL database persistence / MySQLへのデータ保存  

---

## Tech Stack / 使用技術

### Frontend
- React  
- TypeScript 
- CSS  

### Backend
- Spring Boot  
- Java  
- REST API  

### Database
- MySQL  

---

## What I Learned / 学んだこと
- React + Spring Bootの連携  
- REST APIの設計と利用  
- CRUD機能の実装  
- 検索・絞り込み機能の実装
- フロントエンドとバックエンドの分離構成  
- データベース連携（MySQL）  

---

## Future Improvements / 今後の改善
- 応募情報の並び替え機能（応募日・締切日・企業名など）
- 認証機能（ログイン）
- メール管理機能
- メールページでのTo-Do・メモ機能
- Docker化  
- AWSなどへのデプロイ  

---

## Running Locally / 起動方法

### Prerequisites
- Node.js v18+  
- Java 17+  
- MySQL  

---

### Database Setup
```sql
CREATE DATABASE job_tracker;
```
### Backend Setup
```sql
cd backend
./mvnw spring-boot:run
```

### Frontend Setup
```sql
cd frontend
npm install
npm run dev
```

### Demo Video: https://youtu.be/jhobCZUL3f0
