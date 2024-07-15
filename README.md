# EAS 開發專案 Starter

### 前端 + 後端，開發起始包，配置 Nginx 靜態網站及反向代理；使用 docker-compose 部署。

## 使用方式

Option

```sh
# 建議使用 pnpm，速度快、穩定
npm install -g pnpm
```

開發

```sh
# Step 1. 進入資料夾
cd frontend

# Step 2. 安裝專案套件
pnpm install
# or
npm install

# Step 3. 啟動
pnpm run dev
# or
npm run dev
```

部署

```sh
docker-compose up --build
```

## 包含

- frontend
- backend
- nginx

## Some Tip

- 切記啊！反向代理時，要記得加 "/"
- ex. :5000/
