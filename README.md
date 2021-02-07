# [koa-router-skip-middleware](https://github.com/ranjan-purbey/koa-router-skip-middleware#readme)

Provides utilities to skip upstream [koa-router](https://github.com/ZijianHe/koa-router) middlewares.

## Installation

```
yarn add koa-router-skip-middleware
```

or

```
npm i koa-router-skip-middleware
```

## Usage

Create a koa server

```typescript
import Koa from "koa";
import Router from "koa-router";

const app = new Koa();
const router = new Router();
```

Import the utilities

```typescript
import { skipable, skip } from "koa-router-skip-middleware";
```

Create a skipable middleware

```typescript
const myMiddleware = skipable((ctx, next) => {
  ctx.state.myMessage = "Hello from myMiddleware";
});
router.use(myMiddleware);
```

Add routes

```typescript
const handler = (ctx) => {
  ctx.body = {
    date: new Date(),
    message: ctx.state.myMessage,
  };
};

// Route with middleware
router.get("/", handler);

// Route without middleware
router.get("/skip", skip(myMiddleware), handler);
```

This works across nested routes as well 🎉

_Note: The skipable middleware instance passed to `router.use` and to `skip` should be the same. In other words, following won't work because the two calls to `skipable` return different instances:_

```typescript
const middleware = (ctx, next) => {
  // ...middleware logic
  next();
};
router.use(skipable(middleware)); // skipable_instance_1
router.get("/skip", skip(skipable(middleware)), handler); // skipable_instance_2

// skipable_instance_1 != skipable_instance_2
```
