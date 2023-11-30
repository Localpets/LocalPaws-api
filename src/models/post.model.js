// import prismaClient
import { PrismaClient } from "@prisma/client";
// create new instance of prismaClient
const prisma = new PrismaClient()

class Post {
    constructor() {
    }

    // crear un nuevo post
    static async createPost(text, category, image, post_user_id ) {
    
        if (!image) {
            image = 'no image'
        }

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
            
            if (!post) {
                return null;
            }

            const postUser = await prisma.user.findUnique({
                where: {
                    user_id: post.post_user_id
                }
            });

            return {
                // Pasar las props de post
                ...post,
                postUser
            };
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
    static async updatePost(post_id, text, category, image, post_user_id ) {
        console.log('Data received in model: ', post_id, text, category, image, post_user_id)
        if (text === 'null' && category === 'null' && image === 'null') return;

        if (text === 'null' && category === 'null') {
            try {
                const post = await prisma.post.update({
                    where: {
                        post_id: post_id,
                        post_user_id: post_user_id
                    },
                    data: {
                        image,
                        updatedAt: new Date()
                    }
                });
                return post;
            } catch (error) {
                console.error(error);
            }
        } else if (text === 'null' && image === 'null') {
            try {
                const post = await prisma.post.update({
                    where: {
                        post_id: post_id,
                        post_user_id: post_user_id
                    },
                    data: {
                        category,
                        updatedAt: new Date()
                    }
                });
                return post;
            } catch (error) {
                console.error(error);
            }
        }

        else if (category === 'null' && image === 'null') {
            try {
                const post = await prisma.post.update({
                    where: {
                        post_id: post_id,
                        post_user_id: post_user_id
                    },
                    data: {
                        text,
                        updatedAt: new Date()
                    }
                });
                return post;
            } catch (error) {
                console.error(error);
            }
        }

        else if (text === 'null') {
            try {
                const post = await prisma.post.update({
                    where: {
                        post_id: post_id,
                        post_user_id: post_user_id
                    },
                    data: {
                        category,
                        image,
                        updatedAt: new Date()
                    }
                });
                return post;
            } catch (error) {
                console.error(error);
            }
        }

        else if (category === 'null') {
            try {
                const post = await prisma.post.update({
                    where: {
                        post_id: post_id,
                        post_user_id: post_user_id
                    },
                    data: {
                        text,
                        image,
                        updatedAt: new Date()
                    }
                });
                return post;
            } catch (error) {
                console.error(error);
            }
        }

        else if (image === null) {
            try {
                const post = await prisma.post.update({
                    where: {
                        post_id: post_id,
                        post_user_id: post_user_id
                    },
                    data: {
                        text,
                        category,
                        updatedAt: new Date()
                    }
                });
                return post;
            } catch (error) {
                console.error(error);
            }
        }

        else {
            try {
                const post = await prisma.post.update({
                    where: {
                        post_id: post_id,
                        post_user_id: post_user_id
                    },
                    data: {
                        text,
                        category,
                        image,
                        updatedAt: new Date()
                    }
                });
                return post;
            } catch (error) {
                console.error(error);
            }
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
    static async getPostsByFollows(userId, page = 1) {
        try {
            const id = userId;
            
            const userFollows = await prisma.follow.findMany({
                where: {
                    followerId: parseInt(id)
                }
            });
    
            const userFollowsIds = userFollows.map((follow) => {
                return follow.followedId;
            });
    
            const postsRaw = await prisma.post.findMany();
    
            const posts = postsRaw.filter((post) => {
                return userFollowsIds.includes(post.post_user_id);
            });
    
            // Add the user's own posts to the list
            const userPosts = await prisma.post.findMany({
                where: {
                    post_user_id: id
                }
            });
    
            posts.push(...userPosts);
    
            // Sort the posts by creation date
            posts.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
    
            // Define the number of posts per page
            const postsPerPage = 8;
    
            // Calculate the start and end indices for the current page
            const startIndex = (page - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
    
            // Get the posts for the current page
            const postsForPage = posts.slice(startIndex, endIndex);
    
            // Determine if there are more posts
            const hasMore = endIndex < posts.length;
    

            // Si el usuario no tiene seguidos recomendar posts random
            if (posts.length === 0) {
                const randomPosts = await prisma.post.findMany({
                    take: 8,
                    orderBy: {
                        createdAt: 'desc'
                    }
                });
                return {
                    posts: randomPosts,
                    hasMore
                };
            }

            return {
                posts: postsForPage,
                hasMore
            };
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
