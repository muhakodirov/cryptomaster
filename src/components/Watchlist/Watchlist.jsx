
import { useDispatch, useSelector } from 'react-redux';
import { IoIosHeartEmpty } from "react-icons/io"
import { FcLike } from "react-icons/fc";
import { toggleFavorite } from '../../slice/coinSlice';
import { FcDislike } from "react-icons/fc";
import styles from './Watchlist.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import SinglePage from '../SingleCoinPage/SinglePage';
import { url } from '../../slice/coinSlice';



function Watchlist() {
  const allCoinsFromState = useSelector((state) => state.coin.coin)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [data, setData] = useState(null)

  const favoriteCoins = allCoinsFromState.filter(coin => coin.isFavorite)

  const openASinglePage = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setData(data);
      navigate(`/${id}`, { state: data?.data }); // Navigate to new route with coinData
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  if (favoriteCoins.length <= 0) {
    return (
      <>
        <div className={styles.h3}>
          <h3>No favourite coins in your Watchlist
            <img src="https://openmoji.org/data/color/svg/1FAE4.svg" alt="" />
          </h3>
        </div>
        <div className={styles.noFavCoins_Icon}>
          <FcDislike style={{ fontSize: '50px', margin: 'auto', width: '40%', height: '40%' }} />
        </div>
      </>
    )
  }


  return (
    <>
      <div className={styles.h3}>
        <h3> Your favourite coins
          <img src="https://openmoji.org/data/color/svg/2764.svg" alt="" />
        </h3>
      </div>
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
            {favoriteCoins // Filtern der Münzen, die als Favoriten markiert sind
              .map((coin, index) => (
                <tr key={index}>
                  <td>
                    {coin.isFavorite ?
                      <FcLike title='Delete from favourites' className='coinFavorite' onClick={() => dispatch(toggleFavorite(coin.id))} />
                      : <IoIosHeartEmpty className='coinFavorite' onClick={() => dispatch(toggleFavorite(coin.id))} />
                    }
                    <Link to={`/${coin.id}`}> <b onClick={() => openASinglePage(coin.id)}> {coin.name} </b> </Link>
                  </td>
                  <td>{coin.priceUsd.substring(0, 10)}</td>
                  <td>
                    <span className={coin.changePercent24Hr.charAt(0) === '-' ? 'priceChangeColor_red' : 'priceChangeColor_green'}> {coin.changePercent24Hr.substring(0, 5) + ' ' + '%'} </span>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {data && <SinglePage />}
    </>
  )
}

export default Watchlist;