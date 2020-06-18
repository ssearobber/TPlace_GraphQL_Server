import PostComment from '../../../database/mongoDB/model/PostComment';
import Post from '../../../database/mongoDB/model/Post';
import User from '../../../database/mongoDB/model/User';

export default {
  Mutation: {
    createPostComment: async (_, { postId, text }, { request, isAuthenticated }) => {
      const currentUserId = await isAuthenticated(request);

      try {
        let postComment = await PostComment.create({
          text,
          post: postId,
          user: currentUserId,
        });

        const user = await User.findById({ _id: currentUserId });
        user.postComments.push(postComment._id);
        await user.save();

        const post = await Post.findById({ _id: postId });
        post.postComments.push(postComment._id);
        await post.save();

        postComment = await PostComment.findById({ _id: postComment._id }).populate({
          path: 'user',
          model: 'User',
          select: 'id username email',
        });

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
