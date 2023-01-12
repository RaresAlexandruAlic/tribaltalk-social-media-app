import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

import FriendList from "views/widgets/FriendList";
import MiniProfile from "views/widgets/MiniProfile";
import Navbar from "views/navbar";
import PostCreator from "views/widgets/PostCreator";
import Posts from "views/widgets/Posts";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <MiniProfile userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendList userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <PostCreator picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <Posts userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;