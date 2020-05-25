import Post from '../../../database/model/Post';

export default {
  Mutation: {
    createPost: async (_, args, { request, isAuthenticated }) => {
      console.log(request.headers.authorization);
      isAuthenticated(request);
      const { userId: currentUserId } = request;

      if (!args.imgUrl) {
        args.imgUrl = 'https://b-rise.jp/wp-content/themes/b-rise/images/sample_img.gif';
      }
      try {
        const post = await Post.create({
          ...args,
          user: currentUserId,
        });

        console.log(post);

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
