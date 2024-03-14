import React from 'react'
import { useLocation } from 'react-router-dom';
import SingleCoinCard from '../Card/SingleCoinCard';


function SinglePage() {
  const location = useLocation()
  const data = location.state
 
  return (
    <div>
      {data && (
        <SingleCoinCard
          {...data} // Spread all props from data to SingleCoinCard
        />
      )}
    </div>
  );
}

export default SinglePage