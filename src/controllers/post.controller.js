import { response } from "express";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getPosts = async (req, res = response) => {

    const { post_id_req } = req.query;
    
    try {
        const post = await prisma.post.findUnique({
        where: { post_id: Number(post_id_req) },
        });
    
        if (!post) {
        console.log('No se encontró el post con el post_id', post_id_req);
        return;
        }
    
        const user = await prisma.user.findUnique({
        where: { user_id: post.post_user_id },
        });
        
        const postWithUser = {
            ...post,
            user,
        }

        res.json(postWithUser);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}