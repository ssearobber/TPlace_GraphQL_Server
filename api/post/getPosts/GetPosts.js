import Post from '../../../database/mongoDB/model/Post';

export default {
  Query: {
    getPosts: async (_, args) => {
      try {
        const posts = await Post.find().populate({
          path: 'user',
          model: 'User',
          select: 'id name email',
        });

        return {
          success: true,
          error: null,
          data: posts,
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
          data: null,
        };
      }
    },
  },
};
