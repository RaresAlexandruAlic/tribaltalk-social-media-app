import { Box, useMediaQuery } from "@mui/material";

import MiniProfile from "views/widgets/MiniProfile";
import Navbar from "views/navbar";
import PostCreator from "views/widgets/PostCreator";
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
                </Box>
                {!isMobileScreen && (
                    <Box flexBasis="26%">
                        
                    </Box>
                )}
            </Box>
        </Box>
    )
};

export default HomePage;