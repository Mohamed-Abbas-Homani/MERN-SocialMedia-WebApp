import { DeleteOutlineOutlined, PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useCallback, useState } from "react";


const Friend = ({ friendId, name, subtitle, userPicturePath, deletePost, inPost=true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {_id} = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const myFriends =  useSelector((state) => state.user.friends);
  const userPage = useSelector(state => state.userPage)

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const [isFriend, setIsFriend] = useState(myFriends.find(friend => friend._id === friendId))
  
  const patchFriend =  useCallback(async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userPage}/${userPage === _id ? friendId : _id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  }, [_id, userPage, friendId, dispatch, token]);



  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      { _id !== friendId && (inPost || userPage === _id) && <IconButton
        onClick={() => {
          patchFriend();
          setIsFriend(!isFriend)
        }}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        { isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>}
      { _id === friendId && inPost && <IconButton
        onClick={() => {
          deletePost();
        }}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        <DeleteOutlineOutlined />
      </IconButton>}
    </FlexBetween>
  );
};

export default Friend;