// import prismaClient
import { PrismaClient } from "@prisma/client";
// create new instance of prismaClient
const prisma = new PrismaClient()

class Post {
    constructor() {
    }

    // crear un nuevo post
    static async createPost(text, category, image, post_user_id ) {
        try {
            const post = await prisma.post.create({
                data: {
                    text,
                    category,
                    image,
                    post_user_id
                }
            });
            return post;
        } catch (error) {
            console.error(error);
        }
    }

    // obtener todos los posts
    static async getAllPosts() {
        try {
            const posts = await prisma.post.findMany();
            return posts;
        } catch (error) {
            console.error(error);
        }
    }

    // obtener un post por Id
    static async getPostById(id) {
        try {
            const post = await prisma.post.findUnique({
                where: {
                    post_id: id
                }
            });
            return post;
        } catch (error) {
            console.error(error);
        }
    }

    // obtener todos los posts de un usuario
    static async getPostsByUserId(userId) {
        try {
            const posts = await prisma.post.findMany({
                where: {
                    post_user_id: userId
                }
            });
            return posts;
        } catch (error) {
            console.error(error);
        }
    }

    // actualizar un post
    static async updatePost(id, text, image, category, likes, post_user_id ) {
        try {
            const post = await prisma.post.update({
                where: {
                    post_id: id
                },
                data: {
                    text,
                    image,
                    category,
                    likes,
                    post_user_id
                }
            });
            return post;
        } catch (error) {
            console.error(error);
        }
    }

    // eliminar un post
    static async deletePost(id) {
        try {
            const post = await prisma.post.delete({
                where: {
                    post_id: id
                }
            });
            return post;
        } catch (error) {
            console.error(error);
        }
    }

    // obtener post por los follows de un usuario (feed)
    static async getPostsByFollows(userId) {
        try {
            const userFollows = await prisma.follow.findMany({
                where: {
                    followerId: userId
                }
            })

            const userFollowsIds = userFollows.map((follow) => {
                return follow.followedId;
            });

            const postsRaw = await prisma.post.findMany();
            
            const posts = postsRaw.filter((post) => {
                return userFollowsIds.includes(post.post_user_id);
            });

            // Traer tambien los posts del usuario
            const userPosts = await prisma.post.findMany({
                where: {
                    post_user_id: userId
                }
            });

            // Concatenar los posts del usuario con los posts de los follows
            posts.push(...userPosts);
            
            return posts;
        } catch (error) {
            console.error(error);
        }
    }

    // obtener post por categoria
    static async getPostsByCategory(category) {
        try {
            const posts = await prisma.post.findMany({
                where: {
                    category: category
                }
            });
            return posts;
        } catch (error) {
            console.error(error);
        }
    }

    // crear categoria de un post
    static async createCategory(category) {
        try {
            const newCategory = await prisma.postCategoryType.create({
                data: {
                    category
                }
            });
            return newCategory;
        } catch (error) {
            console.error(error);
        }
    }

    // obtener todas las categorias
    static async getAllCategories() {
        try {
            const categories = await prisma.postCategoryType.findMany();
            return categories;
        } catch (error) {
            console.error(error);
        }
    }

    // obtener categoria por id 
    static async getCategoryById(id) {
        try {
            const category = await prisma.postCategoryType.findUnique({
                where: {
                    post_id: id
                }
            });
            return category;
        } catch (error) {
            console.error(error);
        }
    }

    // borrar categoria por id
    static async deleteCategory(id) {
        try {
            const category = await prisma.postCategoryType.delete({
                where: {
                    post_id: id
                }
            });
            return category;
        } catch (error) {
            console.error(error);
        }
    }

}

export default Post;
