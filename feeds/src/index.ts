import koa from "koa";
import koarouter from "@koa/router";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
// import dotenv from ".env";
import router from "./routes/main";
import dotenv from "dotenv";
dotenv.config();
const app = new koa();
app.use(json());
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods({notImplemented: ()=>{console.log('method not implemented')} , methodNotAllowed: ()=>{console.log('method not allowed')}}))
export default app;