
import koa, { Context } from "koa";
import json from "koa-json";

import bookRouter from "./routes/booksRoutes";
import reviewRouter from "./routes/reviewsRoutes";
import userRouter from "./routes/usersRoutes"; 
const app = new koa();
app.use(json());

//user 

//book 

//review






app.use(userRouter.routes())
app.use(userRouter.allowedMethods({ notImplemented: () => "userRouter not found", methodNotAllowed: () => "Method not found" }))
app.use(bookRouter.routes())
app.use(bookRouter.allowedMethods({ notImplemented: () => "userRouter not found", methodNotAllowed: () => "Method not found" }))
app.use(reviewRouter.routes())
app.use(reviewRouter.allowedMethods({ notImplemented: () => "userRouter not found", methodNotAllowed: () => "Method not found" }))


// app.listen(process.env.PORT, () => console.log(`server is running at port ${process.env.PORT}`))
export { app };