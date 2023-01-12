import { Box, FormControl, IconButton, InputBase, MenuItem, Select, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Close, DarkMode, Help, LightMode, Menu, Message, Notifications, Search } from "@mui/icons-material";
import { setLogout, setMode } from "state";
import { useDispatch, useSelector } from "react-redux";

import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isMobileScreen = useMediaQuery("(max-width:1000px)");
    
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;

    return <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
            <Typography 
                fontWeight="bold" 
                fontSize="clamp(1rem, 2rem, 2.25rem)" 
                color="primary" 
                onClick={() => navigate("/")}
                sx={{
                    "&:hover": {
                        color: primaryLight,
                        cursor: "pointer"
                    }
                }}>
                TribalTalk
            </Typography>
            {!isMobileScreen && (
                <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 0.15rem">
                    <InputBase placeholder="Search..."/>
                    <IconButton>
                        <Search/>
                    </IconButton>
                </FlexBetween>
            )}   
        </FlexBetween>
        
        {/* Normal Navigation */}
        {isMobileScreen ? (
            <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
                <Menu/>   
            </IconButton>
        ) : (
            <FlexBetween gap="2rem">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{ fontSize: "25px"}}/>
                    ) : (
                        <LightMode sx={{ color: dark, fontSize: "25px" }}/>
                    )}
                </IconButton>
                <Message sx={{ fontSize: "25px"}}/>
                <Notifications sx={{ fontSize: "25px"}}/>
                <Help sx={{ fontSize: "25px"}}/>
                <FormControl variant="standard" value={fullName}>
                    <Select 
                        value={fullName}
                        sx = {{ 
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr:"0.25rem",
                                width:"3rem",
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight
                            }
                        }}
                        input={<InputBase />}
                    >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>
        )}

        {/* Mobile Navigation */}
        {isMobileScreen && isMobileMenuToggled && (
            <Box
                position="fixed"
                right="0"
                bottom="0"
                height="100%"
                zIndex="10"
                maxWidth="500px"
                minWidth="300px"
                backgroundColor={background}
            >
                {/* Close */}
                <Box display="flex" justifyContent="flex-end" p="1rem">
                    <IconButton
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Close />
                    </IconButton>
                </Box>
                {/* Mobile Menu Items */}
                <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
                <IconButton 
                    onClick={() => dispatch(setMode())}
                    sx={{ fontSize: "25px"}}
                >
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{ fontSize: "25px"}}/>
                    ) : (
                        <LightMode sx={{ color: dark, fontSize: "25px" }}/>
                    )}
                </IconButton>
                <Message sx={{ fontSize: "25px"}}/>
                <Notifications sx={{ fontSize: "25px"}}/>
                <Help sx={{ fontSize: "25px"}}/>
                <FormControl variant="standard" value={fullName}>
                    <Select 
                        value={fullName}
                        sx = {{ 
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr:"0.25rem",
                                width:"3rem",
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor:neutralLight
                            }
                        }}
                        input={<InputBase />}
                    >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>   
            </Box>
        )}
    </FlexBetween>
};

export default Navbar;