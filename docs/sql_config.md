# 数据库配置指南

系统默认使用 SQLite 数据库，并将数据保存在 `data/shortlink.db` 文件中，部署时无需额外安装数据库即可直接运行。

若需要连接其他数据库，可在启动前设置环境变量：

- `DATABASE_URL`：标准数据库连接字符串，如 `mysql://user:pass@host:3306/dbname`。
- `DB_FILE`：自定义 SQLite 数据文件路径，默认值为 `./data/shortlink.db`。

`install.sh` 会读取这些环境变量并在 Docker 容器中传递给应用。也可以在前端首次启动时填写数据库地址和凭据，保存后重新部署即可生效。

