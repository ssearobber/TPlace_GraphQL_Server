import Post from '../../../database/mongoDB/model/Post';

export default {
  Query: {
    getPostById: async (_, { postId }) => {
      try {
        const post = await Post.findById({ _id: postId });
        // .populate({
        //     path: 'user',
        //     model: 'User',
        //     select: 'id name email',
        // });
        return {
          success: true,
          error: null,
          data: post,
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
