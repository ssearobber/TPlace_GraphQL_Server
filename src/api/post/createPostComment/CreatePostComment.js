import PostComment from '../../../database/mongoDB/model/PostComment';

export default {
  Mutation: {
    CreatePostComment: async (_, {text, postId}, { request, isAuthenticated }) => {

      isAuthenticated(request);
      const { userId: currentUserId } = request;

      try {
        const postComment = await PostComment.create({
          text,
          post: postId,
          user: currentUserId,
        });

        console.log(postComment);

        return {
          success: true,
          error: null,
          data: postComment,
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
