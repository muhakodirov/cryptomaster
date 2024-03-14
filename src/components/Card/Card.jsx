import styles from './Card.module.css'



function trendingCard({name, image, volume, marketCap, price}) {

    return (
        <div className={styles.cryptoCard}>
          <div className={styles.cryptoCardContent}>
            <div className={styles.avatarContainer}>
              <img
                alt="Coin"
                src={image}
                className={styles.avatar}
              />
            </div>
            <h2 className={styles.cryptoName}> <b> {name} </b> </h2>
            <div className={styles.cryptoInfo}>
              <p className={styles.cryptoPrice}> {price}</p>
              <hr className={styles.divider} />
              <div className={styles.footerInfo}>
              <p className={styles.cryptoMarketCap}>Market Cap: <br /> <b> {marketCap} </b></p>
              <p className={styles.cryptoVolume}>Volume: <b className={styles.cryptoVolumePrice}> {volume} </b></p>

              </div>
            </div>
          </div>
        </div>
      );
}

export default trendingCard