import koarouter from "@koa/router";
import { feeds } from "../controllers/getFeeds";
const router = new koarouter();

router.get('/feeds', feeds);
export default router;