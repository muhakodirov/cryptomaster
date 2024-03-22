import Chart from '../Chart/Chart';
import styles from './SingleCoinCard.module.css'

function SingleCoinCard(props) {
  const data = props
  return (
    <div className={styles.container}>
      <div className={styles.coin_card}>
            <div className={styles.avatarContainer}>
              <img
                alt="Coin"
                src={'https://openmoji.org/data/color/svg/1FA99.svg'}
                className={styles.avatar}
              />
            </div>
          <h2 className={styles.coin_card__title}>{data.name.toUpperCase()}</h2>
          <hr />
          <div className={styles.coin_info}>
            <p><span className={styles.coin_info__label}>Symbol:</span> {data.symbol}</p>
            <p><span className={styles.coin_info__label}>Price (USD):</span> <span className={styles.coinPrice}> {data?.priceUsd?.substring(0, 13)} </span></p>
            <p><span className={styles.coin_info__label}>Market Cap (USD):</span> {data.marketCapUsd?.substring(0, 20)}</p>
            <p><span className={styles.coin_info__label}>Volume (USD 24Hr):</span> {data.volumeUsd24Hr?.substring(0, 20)}</p>
            <p><span className={styles.coin_info__label}>Change (24Hr %):</span> <span className={data?.changePercent24Hr < 0 ? styles.coinChangeMinus : styles.coinChangePlus}> {data.changePercent24Hr?.substring(0, 5)} </span></p>
            <p><span className={styles.coin_info__label}>Max Supply:</span> {data.maxSupply?.substring(0, 17)}</p>
            <p><span className={styles.coin_info__label}>Supply:</span> {data.supply?.substring(0, 17)}</p>
            <hr />
            <p><span className={styles.coin_info__label}>More Info:</span> <a href={data.explorer} className={styles.coin_info__link} target="_blank" rel="noopener noreferrer">Explore</a></p>
          </div>
        </div>
        <div className={styles.coin_news}>
            <Chart value = {data?.symbol}/>
           <p> Today's <b> {data?.name} </b> Chart  </p>
        </div>
        </div>
      );
    }
    
    export default SingleCoinCard

