import { IMiddleware } from "koa-router";
const skipMap = new Map<IMiddleware, IMiddleware>();

export const skip = (fn: IMiddleware) => {
  let skipFn = skipMap.get(fn);
  if (!skipFn) {
    skipFn = (_, next) => {
      next();
    };
    skipMap.set(fn, skipFn);
  }
  return skipFn;
};

export const skipable = (fn: IMiddleware) => {
  const middleware: IMiddleware = (ctx, next) => {
    const skipFn = skipMap.get(middleware);
    const middlewares = ctx.router
      .match(ctx.path, ctx.method)
      .path.flatMap((layer) => layer.stack);

    if (skipFn && middlewares.indexOf(skipFn) > middlewares.indexOf(middleware))
      skipFn(ctx, next);
    else fn(ctx, next);
  };
  return middleware;
};
