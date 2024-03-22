import styles from './Converter.module.css'

function Converter() {
  return (
    <div className={styles.container}>

      <div className={styles.converterContainer}>
          <h3 className={styles.converterHeadingText}> Crypto Converter </h3>
          <div className={styles.convertInput}>

          </div>
          
          <div className={styles.converterOptionsContainer}>
              <div className={styles.convertFirstOption}>
                  <select id="firstOption">
                    <option value=""> Convert from ... </option>
                  </select>
              </div>
              <div className={styles.convertSecondOption}>
                  <select id="secondOption">
                    <option value=""> to ... </option>
                    {/* {curency.map(el)=>} */}
                  </select>
              </div>
              <div className={styles.converterButtonBlock}>
                <button className={styles.converterButton}>
                  Convert
                </button>
              </div>
          </div>     
    
      </div>

          <div className={converterResult}>

          </div>

    </div>
  )
}

export default Converter