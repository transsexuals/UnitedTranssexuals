### PostgreSQL (Plugin) setup:

Note: Needed for UUIDs of table users.

```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### Postgres (Table) setup:

Note: Used for storage of (cookie) session.
```
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
```

Note: Used for storage users.
```
CREATE TABLE "public"."users" (
    "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "email" varchar NOT NULL,
    "password" varchar NOT NULL,
    "language" varchar,
    "permission" varchar
);
```

### Developer Note: pg-promise APIs -
https://github.com/vitaly-t/pg-promise
