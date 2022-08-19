import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import './header.css';
const Header = () => {

    



    return (
        <AppBar position="static">
            <Toolbar className='toolbar'>
                <Typography variant="h5" className='title'>
                    Travel Advisor
                </Typography>
                <Box display="flex" className='box'>
                    <Typography variant="h6" className='.title'>
                        Explore new places
                    </Typography>
                    {/* <Autocomplete > */}
                        <div className='search'>
                            <div className='searchIcon'>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder="Search..." className='inputRoot inputInput ' />
                        </div>
                     {/* </Autocomplete> */}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
