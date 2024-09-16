# 2098courses frontend

## Project Setup Local

### Install dependencies

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## Dev Project Run In Docker

### [Install docker](https://docs.docker.com/engine/install/)

### Build Dev Image And Run Container

```sh
docker build . -f Dockerfile.dev -t 2098coursesdev
docker run --rm -p 8080:8080 --name 2098coursesdev 2098coursesdev
```

## JSON-Server for dev template data

### Install JSON-server

```sh
npm i -g json-server
```

### Run JSON-server

```sh
json-server ./dev/mock-api/db.json
```

## Prod Project Run In Docker

### [Install docker](#install-docker)

### Build Prod Image And Run Container

```sh
docker build . -t 2098courses
docker run --rm -p 8080:80 --name 2098courses 2098courses
```
