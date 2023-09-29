import { useState } from "react";
import { Box } from "@mui/material";

import Header from "./Header";
import Search from "./Search";
// import Conversations from "./Conversations";
import FriendList from "./FriendList";

const Menu = () => {

    return(
        <Box>
            <Header />
            <Search/>
                <FriendList/>

        </Box>
    )
}

export default Menu