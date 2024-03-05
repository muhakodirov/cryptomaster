import React, { useEffect, useState } from 'react'
import styles from './Content.module.css'
import { SlArrowDownCircle } from "react-icons/sl";
import { Link as ScrollLink } from 'react-scroll';
import { FaArrowUp } from 'react-icons/fa';
import { CoinsTable } from '../CoinsTable';
import { fetchCoins } from '../../slice/coinSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../CoinsTable.css';
import { LuSearchX } from "react-icons/lu";
const url = "https://api.coingecko.com/api/v3/search/trending"






function Content() {
    const dispatch = useDispatch();
    // const isLoading = useSelector((state) => state.coin.isLoading)
   const [searchInput, setSearchInput] = useState('')
    console.log(searchInput)
    const [trending, setTrending] = useState([])
    const coinsList = useSelector((state) => state.coin.coin)

   


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
            setTrending(data.coins)
        }
        getTrending()
        dispatch(fetchCoins())

    }, [])

    return (
        <div className={styles.content}>
            <h3>TRENDING COINS</h3>
            <div className={styles.contentHeader}>
                {trending.slice(8, 15).map((coin, id) => {
                    return <div key={id} className={styles.coinItem} >
                        <img src={coin?.item?.large} alt="" />
                        <h3>{coin.item.name}</h3>
                        <p>{coin?.item?.data?.price.substring(0,8)}</p>
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
                    <input onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="Search coins" />
                </div>
                {searchInput ? (
    <>
            <div className="table-container" >
                <table className="coinsTable">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>24Std.%</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                         {coinsList.data?.filter(coin => coin.name.includes(searchInput)).map((coin, index) => (
                        <tr key={index}>
                            <td>
                              
                                <b>{coin.name} - {coin.symbol}</b>
                            </td>
                            <td>{coin.priceUsd.substring(0, 10)}</td>
                            <td className={coin.changePercent24Hr.charAt(0) === '-' ? 'priceChangeColor_red' : 'priceChangeColor_green'}>
                                {coin.changePercent24Hr.substring(0, 5) + ' %'}
                            </td>
                        </tr>
                    ) )}
                    </tbody>
                    {coinsList.data.filter(coin => !coin.name.includes(searchInput)).length === coinsList.data.length && (
                       
                            
                                <LuSearchX className='centered-big' /> 
                                
                        
                    )}
                </table>
            </div>
    </>
) : (
    <CoinsTable />
)}

<div className={styles.scrollToTop} onClick={scrollToTop}>
    <FaArrowUp />
</div>
</div>
</div>

    )
}

export default Content