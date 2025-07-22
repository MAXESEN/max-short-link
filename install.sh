#!/bin/bash
set -e

REPO_URL="https://github.com/example/max-short-link.git"
APP_DIR="${APP_DIR:-/opt/max-short-link}"

info() {
  echo -e "\e[32m[*]\e[0m $1"
}

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker 未安装，请先安装 Docker。"
  exit 1
fi

if [ -d "$APP_DIR" ]; then
  info "更新仓库 $APP_DIR"
  git -C "$APP_DIR" pull
else
  info "克隆仓库到 $APP_DIR"
  git clone --depth 1 "$REPO_URL" "$APP_DIR"
fi

cd "$APP_DIR"

if command -v docker compose >/dev/null 2>&1; then
  info "启动 Docker Compose 服务"
  docker compose up -d
else
  info "构建 Docker 镜像"
  docker build -t shortlink:latest .
  info "启动容器"
  docker run -d --name shortlink -p 8080:8080 shortlink:latest
fi

info "部署完成，访问 http://localhost:8080"
