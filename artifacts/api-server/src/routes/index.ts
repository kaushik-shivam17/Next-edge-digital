import { Router, type IRouter } from "express";
import healthRouter from "./health";
import chatRouter from "./chat";
import submissionsRouter from "./submissions";

const router: IRouter = Router();

router.use(healthRouter);
router.use(chatRouter);
router.use(submissionsRouter);

export default router;
