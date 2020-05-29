import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postCommentSchema = new Schema(
  {
    text: {
        type: String,
        required: [true, '댓글을 입력해주세요. '],
        max: [255, '255글자 미만으로 입력해주세요. '],
      },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
      },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('PostComment', postCommentSchema);
