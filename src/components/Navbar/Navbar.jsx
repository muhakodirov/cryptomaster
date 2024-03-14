
import React from 'react'
import styles from './Navbar.module.css'
import { NavLink, Outlet } from 'react-router-dom'


function Layout() {

    return (
        <>
        <div className={styles.navbar}>
            <div className={styles.navbarLogo}>
                <h2> CRYPTO TRACKER. </h2>
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
                </div>
        </div>
         <Outlet />
         </>
    )

}


export default Layout