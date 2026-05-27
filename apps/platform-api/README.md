# Scalar API

Shared API host for Scalar, the multi-client platform by Tachyon X Labs.

## Run locally

Required environment:

```sh
DATABASE_URL=postgres://...
PLATFORM_CLIENT_KEY=reign-services
PORT=5000
NODE_ENV=development
```

Start the host:

```sh
npm run dev -w @platform/api
```

Health check:

```sh
curl http://localhost:5000/healthz
```

## Client keys

Supported values come from `@platform/config`:

- `dent-society`
- `dent-society-dfw`
- `reign-services`
- `tachyonbuilt`
- `creations-by-oracle`

The current host mounts the shared routers for:

- cms
- auth
- users
- leads
- blog
- services
- gallery
- ratings
- settings

Webhook admin, portal, ecommerce, and logo-processing routes are still pending extraction.
