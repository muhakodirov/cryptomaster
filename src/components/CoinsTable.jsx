import React from 'react';
import './CoinsTable.css'; // Import your CSS file for custom table styles
import { useSelector } from 'react-redux';



export function CoinsTable() {
    const coinsList = useSelector((state) => state.coin.coin)
    const isLoading = useSelector((state) => state.coin.isLoading)
    console.log(coinsList)


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
                    {coinsList.map((coin, index) => (
                        <tr key={index}>
                            <td>
                                {/* {coin?.item?.large} */}
                                <img className='tableCoinImages' src={coin?.item?.large} alt="" />
                                {coin.item.name}</td>
                            <td>{coin.item.data.price}</td>
                            <td>{coin.item.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
