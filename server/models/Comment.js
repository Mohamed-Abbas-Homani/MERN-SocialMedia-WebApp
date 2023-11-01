import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    commenterId: {
      type: String,
      required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    body: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    replies: {
        type: Array,
        default: [],
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
