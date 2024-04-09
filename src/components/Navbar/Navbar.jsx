
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

                        <span className={styles.span1}>.</span>
                        <span className={styles.span}>TRACKER</span>
                        <span className={styles.span}>CONVERTER</span>
                        <span className={styles.span}>NEWS</span>
                    </div>
                </div>

                <div className={styles.navbarLinks}>

                    <NavLink
                        className={styles.navLink}
                        to="/" exact={true}>
                        Home
                    </NavLink>

                    <NavLink
                        className={styles.navLink}
                        exact={true}
                        to="/watchlist">
                        Watchlist
                    </NavLink>
                    <NavLink

                        className={styles.navLink}
                        exact={true}
                        to="/news">
                        News
                    </NavLink>
                    <NavLink

                        className={styles.navLink}
                        exact={true}
                        to="/converter">
                        Converter
                    </NavLink>
                </div>
                <MenuDrawer />
            </div>

            <Outlet />
        </>
    )

}


export default Layout