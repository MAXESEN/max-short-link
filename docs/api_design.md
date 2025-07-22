# 短链系统 API 设计

本文件描述系统提供的主要 RESTful API 接口，帮助开发者在不同应用中集成短链服务。

## 1. 生成短链接
- **接口**：`POST /api/links`
- **参数**：
  - `url`：待转换的长链接（必填）
  - `expire_at`：过期时间（可选）
  - `max_visits`：访问次数限制（可选）
- **返回**：
  ```json
  {
    "code": "abc123",
    "short_url": "https://sho.rt/abc123"
  }
  ```

## 2. 查询短链接详情
- **接口**：`GET /api/links/{code}`
- **描述**：根据短码获取原始链接及统计信息。
- **返回**：
  ```json
  {
    "url": "https://example.com/long",
    "visits": 42,
    "created_at": "2024-01-01T12:00:00Z"
  }
  ```

## 3. 删除短链接
- **接口**：`DELETE /api/links/{code}`
- **描述**：删除对应的短链接记录，后续访问将失效。

## 4. 列出所有短链接
- **接口**：`GET /api/links`
- **参数**：支持分页，如 `page` 和 `limit`。
- **返回**：短链接列表及分页信息。

以上接口均建议在请求头或参数中携带认证信息，可采用 JWT 等方式。
