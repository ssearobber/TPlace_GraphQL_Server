import User from '../../../database/mongoDB/model/User';
import Post from '../../../database/mongoDB/model/Post';

export default {
  Mutation: {
    deletePostById: async (_, { postId }, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { userId: currentUserId } = request;
      try {
        let post = await Post.findById({ _id: request.params.postId });
        // post가 존재하지 않을 때
        if (!post) {
          return {
            success: false,
            error: '포스트가 존재하지 않습니다.',
          };
        }

        if (post.user.toString() !== currentUserId) {
          return {
            success: false,
            error: '해당 권한이 없습니다.',
            data: post,
          };
        }

        post = await Post.findByIdAndDelete({ _id: postId });

        return {
          success: true,
          error: null,
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
        };
      }
    },
  },
};
