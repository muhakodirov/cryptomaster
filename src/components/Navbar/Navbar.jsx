import React from 'react'
import styles from './Navbar.module.css'

function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.navbarLogo}>
                <h2> CRYPTO MASTER. </h2>
            </div>
            <div className={styles.navbarItems}>
                <h3>
                    <a href=""> CRYPTO NEWS </a>
                </h3>
            </div>
        </div>
    )
}

export default Navbar