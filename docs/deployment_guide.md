# Docker 部署指南

本文介绍如何使用 Docker 快速部署短链系统，适用于开发和生产环境。

## 1. 环境要求
- Docker 20+ 版本
- 可选：Docker Compose 1.25+

## 2. 构建镜像
在项目根目录执行以下命令生成镜像：
```bash
docker build -t shortlink:latest .
```
镜像中包含运行所需的依赖，可直接用于启动容器。

## 3. 运行容器
单机测试可直接启动：
```bash
docker run -d \
  -p 8080:8080 \
  --name shortlink \
  shortlink:latest
```
容器启动后访问 `http://localhost:8080` 即可。

## 4. 使用 Docker Compose
若需要同时启动数据库等服务，可使用 `docker-compose.yml`：
```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: example
    volumes:
      - db_data:/var/lib/mysql
volumes:
  db_data:
```
执行 `docker compose up -d` 即可一键部署。

## 5. 环境变量
- `DB_HOST`：数据库地址
- `DB_FILE`：SQLite 文件路径（未设置时使用 ./data/shortlink.db）
- `DB_USER`、`DB_PASSWORD`：数据库凭据
- `REDIS_HOST`：Redis 地址

可在 `docker-compose.yml` 中进行配置，也可在命令行中传入。

## 6. 更新与扩容
- 镜像更新后重新执行 `docker compose pull && docker compose up -d`。
- 通过负载均衡可横向扩容多个容器实例。

