import { Box, useMediaQuery } from "@mui/material";

import AdvertSection from "views/widgets/AdvertSection";
import FriendList from "views/widgets/FriendList";
import MiniProfile from "views/widgets/MiniProfile";
import Navbar from "views/navbar";
import PostCreator from "views/widgets/PostCreator";
import Posts from "views/widgets/Posts";
import { useSelector } from "react-redux";

const HomePage = () => {
    const isMobileScreen = useMediaQuery("(max-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
   
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isMobileScreen ? "block" : "flex"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isMobileScreen ? undefined : "26%"}>
                    <MiniProfile userId={_id} picturePath={picturePath}/>
                </Box>
                <Box 
                    flexBasis={isMobileScreen ? undefined : "42%"}
                    mt={isMobileScreen ? "2rem" : undefined}
                >
                    <PostCreator picturePath={picturePath}/>  
                    <Posts userId={_id} />      
                </Box>
                {!isMobileScreen && (
                    <Box flexBasis="26%">
                        <AdvertSection />
                        <Box m="2rem 0" />
                        <FriendList userId ={_id}/>
                    </Box>
                )}
            </Box>
        </Box>
    )
};

export default HomePage;