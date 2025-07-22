# 数据库设计

下面给出短链系统的基本表结构示例，供参考。

## 1. links 表
| 字段名        | 类型            | 描述             |
|---------------|-----------------|------------------|
| id            | BIGINT PRIMARY KEY AUTO_INCREMENT | 主键 ID |
| code          | VARCHAR(20) UNIQUE NOT NULL | 短码 |
| url           | TEXT NOT NULL   | 原始长链接       |
| expire_at     | DATETIME NULL   | 过期时间         |
| max_visits    | INT NULL        | 最大访问次数限制 |
| created_at    | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP | 创建时间 |

## 2. visits 表
| 字段名    | 类型            | 描述          |
|-----------|-----------------|---------------|
| id        | BIGINT PRIMARY KEY AUTO_INCREMENT | 主键 ID |
| link_id   | BIGINT NOT NULL | 对应 links 表的 ID |
| ip        | VARCHAR(45)     | 访问者 IP 地址 |
| ua        | TEXT            | User-Agent    |
| visit_at  | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP | 访问时间 |

根据业务需求可扩展更多字段，如访问来源、地域信息等。实际使用时可调整字段类型和索引以满足性能要求。
