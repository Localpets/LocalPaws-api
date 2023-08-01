import { Router } from "express";
import { getPosts } from '../controllers/post.controller.js';

const postRouter = Router();

postRouter.get('/', getPosts);

export default postRouter;