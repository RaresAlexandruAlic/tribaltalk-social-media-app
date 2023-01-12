import { Box, Divider, Typography, useTheme } from "@mui/material";
import  { EditOutlined, LocationOnOutlined, ManageAccountsOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";

import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage"
import WidgetWrapper from "components/WidgetWrapper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MiniProfile = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, 
            {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    
    if( !user ) return null;

    const {
        firstName,
        lastName,
        location,
        occupation,
        profileLikes,
        profileViews,
        friends,
    } = user;

    return (
        <WidgetWrapper>
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>
                            {friends.length} Friends
                        </Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>
                
            <Divider />
            
            <Box p="1rem 0">
                <Box
                    display="flex"
                    alignItems="center"
                    gap="1rem"
                    mb="0.5rem"
                >
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    gap="1rem"
                    mb="0.5rem"
                >
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>

            <Divider />

            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Profile views: </Typography>
                    <Typography color={main} fontWeight="700">{profileViews}</Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>Profile likes: </Typography>
                    <Typography color={main} fontWeight="700">{profileLikes}</Typography>
                </FlexBetween>
            </Box>

            <Divider />

            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Linked Social profiles:
                </Typography>
                
                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem" mb="0.5rem">
                        <img src="../assets/linkedin.png" alt="LinkedIn" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>
                                Social Network
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }}/>
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="Twitter" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>
                                Social Network
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }}/>
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    )
}

export default MiniProfile;