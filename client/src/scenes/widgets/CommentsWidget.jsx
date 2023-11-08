import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import { DeleteOutlineOutlined, FavoriteOutlined, FavoriteBorderOutlined } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserImage from "components/UserImage";
import { useNavigate } from "react-router-dom";
import SearchTag from "components/SearchTag";

const CommentsWidget = ({postId , Icomments}) => {
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const commenter = useSelector(state => state.user);
  const token = useSelector(state => state.token);
  const navigate = useNavigate();


  const {palette} = useTheme()

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3001/comments/${postId}`,
      {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
      })
      const data = await response.json()
      setComments(data);
    })();
  }, [])

  const handleAddComment = async () => {
    
    const response = await fetch(
      `http://localhost:3001/comments`,
      {
        method: "POST",
        headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
        body: JSON.stringify({
          commenterId: commenter._id,
          postId: postId,
          body: body,
        })
      }
    )
    const data = await response.json();
    setComments(data);
    setBody("")
  }

  const deleteComment = async (id) => {
    const response = await fetch(`http://localhost:3001/comments/${id}/${postId}`,
    {
      method: "DELETE",
      headers: {Authorization: `Bearer ${token}`}
    })
    const data = await response.json();
    setComments(data)
  }

  const patchLikeComment = async (id) => {
    const response = await fetch(
      `http://localhost:3001/comments/${id}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({userId: commenter._id})
      }
    )
    const updatedComment = await response.json()
    setComments(comments.map(c => c._id === updatedComment._id? updatedComment: c))
  }

  return (
    <Box mt="0.5rem">

      <Divider />
      <FlexBetween gap="1.5rem" mb="0.5rem" mt="1rem">
        <InputBase
          placeholder="Add a comment..."
          value={body}
          onChange={e => setBody(e.target.value)}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "0.75rem",
            padding: "0.75rem 1.5rem",
          }}
        />
        <Button
          disabled={!body}
          onClick={handleAddComment}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "0.5rem",
          }}
        >
          Send
        </Button>
      </FlexBetween>
      <Divider />
      <Box>
        {comments.map((comment, i) => (
        <>
        <FlexBetween mt="1rem">
        <FlexBetween gap="1rem">
          <UserImage image={comment.userPicturePath} size="44px" />
          <Box
            onClick={() => {
              navigate(`/profile/${comment.commenterId}`);
              navigate(0);
            }}
          >
            <Typography
              color={palette.primary.main}
              fontWeight="300"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {(comment.firstName || "Mash") + " " + (comment.lastName || "Mash")} 
            </Typography>
           
          </Box>
        </FlexBetween>
              
        
        { commenter._id === comment.commenterId && <IconButton
          onClick={() => {
            deleteComment(comment._id);
          }}
          sx={{ backgroundColor: palette.background.primaryLight, p: "0.6rem" }}
        >
          <DeleteOutlineOutlined />
        </IconButton>}
      </FlexBetween>
      <Typography m="0.7rem 0 0.6rem 3rem">
        <SearchTag description={comment.body} token={token}/>
      </Typography>
      <FlexBetween gap="0.3rem">
            <IconButton onClick={() => patchLikeComment(comment._id)}>
              {Boolean(comment.likes[commenter._id]) ? (
                <FavoriteOutlined sx={{ color: palette.primary.main }} />
              ) : (
                <FavoriteBorderOutlined />
              )}<Typography ml="0.5rem">{Object.keys(comment.likes).length}</Typography>
            </IconButton>
            
      </FlexBetween>
      <Divider />
      </>
        ))}
      </Box>
    </Box>
  )
}

export default CommentsWidget