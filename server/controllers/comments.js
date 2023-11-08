import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

/* CREATE */
export const createComment = async (req, res) => {
  try {
    const { commenterId, postId, body } = req.body;
    const user = await User.findById(commenterId);
    
    const newComment = new Comment({
      commenterId,
      body,
      postId,
      firstName: user.firstName,
      lastName: user.lastName,
      userPicturePath: user.picturePath,
      likes: {},
      replies: [],
    });
    
    await newComment.save();
    
    const post = await Post.findById(postId);
    post.comments.push(newComment); 
    await post.save();
    const comments = await Comment.find({postId});
    res.status(200).json(comments);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};



/* READ */
export const getPostComments = async (req, res) => {
  try {
    const {postId} = req.params;
    const comments = await Comment.find({postId});
    res.status(200).json(comments);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const comment = await Comment.findById(id);
    const isLiked = comment.likes.get(userId);

    if (isLiked) {
      comment.likes.delete(userId);
    } else {
      comment.likes.set(userId, true);
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { likes: comment.likes },
      { new: true }
    );

    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Delete

export const deleteComment = async (req, res) => {
  try {
    const { id, postId } = req.params;
    const deletedComment = await Comment.findByIdAndRemove(id);
    
    if (!deletedComment)
      res.status(400).json({"message": "comment not found"})

    const post = await Post.findById(postId).populate("comments")
    post.comments = post.comments.filter(c => c._id != id)  
    await post.save()
 
    const comments = await Comment.find({postId})
      res.status(200).json(comments)

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}