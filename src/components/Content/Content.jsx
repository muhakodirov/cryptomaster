import React, { useEffect, useState } from 'react'
import styles from './Content.module.css'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { SlArrowDownCircle } from "react-icons/sl";
import { IoIosHeartEmpty } from "react-icons/io"
import { FcLike } from "react-icons/fc";
import { Link as ScrollLink } from 'react-scroll';
import { FaArrowUp } from 'react-icons/fa';
import { CoinsTable } from '../CoinsTable';
import { fetchCoins } from '../../slice/coinSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../CoinsTable.css';
import { toggleFavorite } from '../../slice/coinSlice';
import { LuSearchX } from "react-icons/lu";
import Card from '../Card/Card';
const url = "https://api.coingecko.com/api/v3/search/trending"






function Content() {
    const dispatch = useDispatch();
    // const isLoading = useSelector((state) => state.coin.isLoading)
   const [searchInput, setSearchInput] = useState('')

    const [trending, setTrending] = useState([])
    const coinsList = useSelector((state) => state.coin.coin)

    const isLoading = useSelector((state) => state.coin.isLoading)
  
   



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

    }, [dispatch])





    if (isLoading) return <>
    <Stack 
           paddingTop={20}     
           alignItems="center"
           justifyContent="center"
           sx={{ color: 'grey.500' }} spacing={2} direction="row">
     <CircularProgress color="secondary" />
   </Stack>
   </>





    return (
        <div className={styles.content}>
            <div className={styles.contentH3}>
                <h3> <span className={styles.trendH3Text}> IN TRAND FOR NOW</span> </h3>
            </div>
            <div className={styles.contentHeader}>
                {trending.slice(0,6).map((coin, id) => {
                    return (
                        <div key={id}>
                            <Card
                                image={coin?.item?.large}
                                name={coin?.item?.name}
                                price={Number(coin?.item?.data?.price).toFixed(4)}
                                marketCap={coin.item?.data?.market_cap}
                                volume={coin.item?.data?.total_volume}
                                />
                        </div>
                    ) 
                
                })}
            </div>

            <div className={styles.arrowDownIcon}>
                <ScrollLink to="contentHeader" smooth={true} duration={500}>
                    <SlArrowDownCircle />
                </ScrollLink>
            </div>


            <div id="contentHeader" className={styles.contentBody}>
           
             


                <div className={styles.searchInput}>
                    <input onChange={(e) => setSearchInput(e.target.value.toLowerCase())} type="text" placeholder="Search for another coins" />
                </div>
                {searchInput ? (
    <>
            <div className="table-container" >
                <table className="coinsTable">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price in $</th>
                            <th>Change (24Std.%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                         {coinsList?.filter(coin => coin.name.toLowerCase().includes(searchInput)).map((coin, index) => (
                        <tr key={index}>
                           <td>
                            {coin.isFavorite ? 
                            <FcLike className='coinFavorite' onClick={() => dispatch(toggleFavorite(coin.id))}/>
                            : <IoIosHeartEmpty className='coinFavorite' onClick={() => dispatch(toggleFavorite(coin.id))}/>
                          }
                            <b> {coin.name} </b>
                          </td>
                            <td>{coin.priceUsd.substring(0, 10)}</td>
                            <td>
                           <span className={coin.changePercent24Hr.charAt(0) === '-' ? 'priceChangeColor_red' : 'priceChangeColor_green'}> {coin.changePercent24Hr.substring(0, 5) + ' ' + '%'} </span>
                          </td>
                        </tr>
                    ) )}
                    </tbody>
                    {coinsList.filter(coin => !coin.name.toLowerCase().includes(searchInput)).length === coinsList.length && (
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