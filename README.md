# Rokaro bachelor project website

Bachelor project website for Rokaro. Built with Vue 3, Vite and TypeScript.

## Getting started

This project uses [Bun](https://bun.sh) as its package manager and runtime.

### Prerequisites

Install Bun (see the [official guide](https://bun.sh/docs/installation) for other platforms):

```sh
curl -fsSL https://bun.sh/install | bash
```

### Install dependencies

```sh
bun install
```

### Develop

Start the local dev server with hot module replacement:

```sh
bun run dev
```

### Build

Type-check and produce a production build in the `dist/` directory:

```sh
bun run build
```

The contents of `dist/` are the build output that gets pushed to the university web area.

You can preview the production build locally before deploying with:

```sh
bun run preview
```