import PostComment from '../../../database/mongoDB/model/PostComment';

export default {
  Query: {
    getPostComment: async (_, { postId }) => {
      try {
        const postComments = await PostComment.findById({ _id: postId });

        return {
          success: true,
          error: null,
          data: postComments,
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
