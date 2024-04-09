import React, { useEffect, useState } from 'react';
import './CoinsTable.css'; // Import your CSS file for custom table styles
import { useSelector, useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { IoIosHeartEmpty } from "react-icons/io";
import { toggleFavorite } from '../slice/coinSlice';
import { FcLike } from "react-icons/fc";
import { url } from '../slice/coinSlice';
import SinglePage from '../components/SingleCoinPage/SinglePage.jsx';
import { Link, useNavigate } from 'react-router-dom';




export function CoinsTable() {
  const coinsList = useSelector((state) => state?.coin?.coin)
  const isLoading = useSelector((state) => state?.coin?.isLoading)
  const dispatch = useDispatch()
  const navigate = useNavigate(); // Initialize useHistory hook
  const [data, setData] = useState(null)
  const [more, setMore] = useState(false)


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
    <>
      <div className="table-container">
        <table className="coinsTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price in $</th>
              <th>Change (24Std.%) </th>
            </tr>
          </thead>
          <tbody>
            {coinsList.slice(0, more ? 100 : 10).map((coin, index) => (
              <tr key={index}>
                <td>
                  {coin.isFavorite ?
                    <FcLike className='coinFavorite' onClick={() => dispatch(toggleFavorite(coin.id))} />
                    : <IoIosHeartEmpty className='coinFavorite' onClick={() => dispatch(toggleFavorite(coin.id))} />
                  }

                  <Link to={`/${coin.id}`}> <b onClick={() => openASinglePage(coin.id)}> {coin.name} </b> </Link>
                </td>
                <td>{coin.priceUsd.substring(0, 10)}</td>
                <td>
                  <span className={coin.changePercent24Hr.charAt(0) === '-' ? 'priceChangeColor_red' : 'priceChangeColor_green'}> {coin.changePercent24Hr.substring(0, 5) + ' ' + '%'} </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>
      <div className='buttonBlock'>
        <button onClick={() => setMore(!more)}> <span className='tableButtonText'> Show {more ? 'less' : 'more'} </span> </button>
      </div>

      {data && <SinglePage />}
    </>
  );
}
