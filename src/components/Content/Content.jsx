import React, { useEffect, useState } from 'react'
import styles from './Content.module.css'
import { SlArrowDownCircle } from "react-icons/sl";
import { Link as ScrollLink } from 'react-scroll';
import { FaArrowUp } from 'react-icons/fa';
import { CoinsTable } from '../CoinsTable';
import { fetchCoins } from '../../slice/coinSlice';
import { useDispatch } from 'react-redux';

const url = "https://api.coingecko.com/api/v3/search/trending"






function Content() {
    const dispatch = useDispatch();


    const [trending, setTrending] = useState([])


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {

        async function getTrending() {
            const res = await fetch(url)
            const data = await res.json()
            // console.log(data.coins)
            setTrending(data.coins)
        }
        getTrending()
        dispatch(fetchCoins())

    }, [dispatch])

    return (
        <div className={styles.content}>
            <h3>TRENDING COINS</h3>
            <div className={styles.contentHeader}>
                {trending.slice(0, 10).map((coin, id) => {
                    return <div key={id} className={styles.coinItem} >
                        <img src={coin?.item?.large} alt="" />
                        <h3>{coin.item.name}</h3>
                        <p>{coin?.item?.data?.price}</p>
                    </div>
                })}
            </div>
            <div className={styles.arrowDownIcon}>
                <ScrollLink to="contentHeader" smooth={true} duration={500}>
                    <SlArrowDownCircle />
                </ScrollLink>
            </div>


            <div id="contentHeader" className={styles.contentBody}>

                <div className={styles.searchInput}>
                    <input type="text" placeholder="Search coins" />
                </div>

                <CoinsTable />



                <div className={styles.scrollToTop} onClick={scrollToTop}>
                    <FaArrowUp />
                </div>
            </div>


        </div>
    )
}

export default Content