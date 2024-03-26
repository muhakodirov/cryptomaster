
import React from 'react'
import styles from './Navbar.module.css'
import { NavLink, Outlet } from 'react-router-dom'
import MenuDrawer from './drawer'


function Layout() {

    return (
        <>
        <div className={styles.navbar}>
            
            <div className={styles.navbarLogo}>
                <h2> CRYPTO </h2> 
                <div className={styles.words}>
                  
                    <span className={styles.span}>NEWS</span>
                    <span className={styles.span}>TRACKER</span>
                    <span className={styles.span}>CONVERTER</span>
                </div>
            </div>
            
            <div className={styles.navbarLinks}>
                    <NavLink
                        className={styles.navLink}
                   
                        to="/">
                            Home 
                    </NavLink>
                    <NavLink
                    
                        className={styles.navLink}
                        to="/watchlist">
                            Watchlist 
                    </NavLink>
                    <NavLink
                        className={styles.navLink}
                        to="/news">
                            News
                    </NavLink>
                    <NavLink
                        className={styles.navLink}
                        to="/converter">
                            Converter
                    </NavLink>
                </div>
        <MenuDrawer />
        </div>
        {/* <hr /> */}
        <Outlet />
        </>
        )

}


export default Layout