import React from 'react';
import './CoinsTable.css'; // Import your CSS file for custom table styles
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


export function CoinsTable() {
    const coinsList = useSelector((state) => state.coin.coin)
   
    const isLoading = useSelector((state) => state.coin.isLoading)
  
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
        <div className="table-container">
            <table className="coinsTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24Std.%</th>
                    </tr>
                </thead>
                <tbody>
                    {coinsList.data?.slice(0,50).map((coin, index) => (
                        <tr key={index}>
                            <td>
                              
                                <img className='tableCoinImages' src={coin.symbol} alt="" />
                                <b> {coin.name} </b></td>
                            <td>{coin.priceUsd.substring(0,10)}</td>
                            <td className={coin.changePercent24Hr.charAt(0) === '-' ? 'priceChangeColor_red' : 'priceChangeColor_green'}>{coin.changePercent24Hr.substring(0,5) + ' '+'%'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
