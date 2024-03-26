import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'



export default function MenuDrawer(){
    const [open, setOpen] = useState(false)


    return(
        <div className={styles.drawer_container}>
            <Button onClick={()=>setOpen(true)}> { !open && <IoMenu className={styles.drawer_menu}/>} </Button>
            <Drawer anchor={'right'} open={open} onClose={()=>setOpen(!open)}>
                <div className={styles.drawer_div}>
                <NavLink
                        className={styles.drawer_link}
                        to="/">
                            Home 
                    </NavLink>
                   
                    <NavLink
                    
                        className={styles.drawer_link}
                        to="/watchlist">
                            Watchlist 
                    </NavLink>
                  

                    <NavLink
                        className={styles.drawer_link}
                        to="/news">
                            News
                    </NavLink>
                    <NavLink
                        className={styles.drawer_link}
                        to="/converter">
                            Converter
                    </NavLink>
                </div>
            </Drawer>
        </div>
    )
}