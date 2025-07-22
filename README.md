# Max Short Link

这是一个用于生成和管理短链接的项目，后端基于 **Spring Boot**，前端使用 **Vue 3**，目录中的 `docs` 文件夹包含了项目相关的文档：

- `requirements.md`：需求文档，说明系统需要实现的功能及非功能要求。
- `developer_manual.md`：开发手册，介绍项目的架构、核心模块以及部署和扩展建议。
- `api_design.md`：主要接口设计，方便在其他系统中调用短链服务。
- `database_schema.md`：数据库表结构说明，便于快速初始化数据表。
- `deployment_guide.md`：Docker 部署指南，提供一键部署示例。
- `integration_guide.md`：系统集成指南，说明如何与其他项目融合。

- `extension_guide.md`：扩展与定制指南，帮助将短链模块无缝嵌入其他项目。

- `architecture_overview.md`：架构与扩展规划，为长远发展提供参考。
- `sql_config.md`：数据库配置指南。
- `operation_guide.md`：运维指南，介绍备份、监控与升级流程。
- `development_process.md`：开发流程与技术选型，给出项目实施步骤和推荐方案。
- `frontend/`：基于 Vue 3 的示例界面代码。
- `backend/`：Spring Boot 实现的后端服务源码。


欢迎根据需求进行二次开发或提出改进建议。

## 一键部署
可以使用以下命令快速安装并运行：

```bash
bash <(curl -Ls https://raw.githubusercontent.com/example/max-short-link/main/install.sh)
```

系统默认使用 SQLite 数据库，详情见 `docs/sql_config.md`。
