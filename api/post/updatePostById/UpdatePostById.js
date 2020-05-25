import Post from '../../../database/model/Post';

export default {
    Mutation: {
        updatePostById: async (_, { title, description, imgUrl, postId }, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { userId: currentUserId  } = request;

            let post = await Post.findById({ _id: request.params.postId });
            // post가 존재하지 않을 때
            if (!post) {
                return {
                    success: false,
                    error: '포스트가 존재하지 않습니다.',
                  }}

            if (post.user.toString() !== currentUserId ) {
                return {
                    success: false,
                    error: '해당 권한이 없습니다.',
                    data: post
                  }}

            try {
                post = await Post.findByIdAndUpdate(
                    {
                        _id: postId
                    },
                    {
                        title,
                        description,
                        imgUrl
                    },
                    {
                        new: true
                    }).populate({
                        path: "user",
                        model: "User",
                        select: "id name"
                    });

                    return {
                        success: true,
                        error: null,
                        data: post
                      };
            } catch (error) {
                return {
                    success: false,
                    error: error.message,
                    data: null
                  };
            }
        }
    }
}