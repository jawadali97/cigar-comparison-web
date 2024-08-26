import React from "react";
import Navbar from "./Navbar";
import { Box } from "@mui/material";

import logo from '../assets/Logo-nobg.png'

const Header = () => {
    return (
        <div>
            <Box
                display="flex"
                justifyContent="center"
            >
                <img src={logo} />
            </Box>
            <Navbar />
        </div>
    )

}

export default Header;