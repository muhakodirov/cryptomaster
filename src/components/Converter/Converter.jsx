import { useEffect, useRef, useState } from 'react'
import styles from './Converter.module.css'
import { currencies } from './currency'
import { AiOutlineLoading3Quarters } from "react-icons/ai";



function Converter() {
  const [fetchedData, setFetchedData] = useState()
  const [firstOption, setFirstOption] = useState()
  const [secondOption, setSecondOption] = useState()
  const [input, setInput] = useState()




  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${firstOption}&tsyms=${secondOption}`)
      if (!response.ok) {
        return 'Error to fetch'
      }
      const result = await response.json()
      let mod;
      if (input) {
        mod = (result[secondOption] * input).toFixed(2)
        console.log(mod)
      }
      setFetchedData(mod)
    }
    fetchData()
  }, [input, firstOption, secondOption])




  // const fetchCurrency = async (from, to) => {
  //     const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`)
  //     if (!response.ok) {
  //       return 'Error to fetch'
  //     }
  //     const result = await response.json()
  //     let mod;
  //     if (input) {
  //       mod = (result[to] * input).toFixed(2)
  //     } 
  //     setFetchedData(mod)
  //   }



  return (
    <div className={styles.container}>

      <div className={styles.converterContainer}>
        <h1 className={styles.converterHeadingText}> CRYPTO CONVERTER </h1>

        <div className={styles.convertInput}>
          <input required placeholder='Amount' onChange={(e) => setInput(e.target.value)} type="number" />
        </div>

        <div className={styles.converterOptionsContainer}>
          <div className={styles.convertFirstOption}>

            <select onChange={(e) => setFirstOption(e.target.value)} id="firstOption">
              <option selected value=""> Convert from ... </option>

              <hr />
              {currencies.map((el, i) => <option value={el.symbol}>
                {el.currency}
              </option>
              )}
            </select>
          </div>
          <div className={styles.convertSecondOption}>
            <select onChange={(e) => setSecondOption(e.target.value)} id="secondOption">
              <option selected value=""> to ... </option>
              <hr />

              {currencies.map((el, i) => <>
                <option value={el.symbol}> {el.currency} </option>
              </>)}
            </select>
          </div>
        </div>
        <br />
        <hr />
        <div className={styles.converterResult}>
          {input && firstOption && secondOption ? (
            <span>
              {`${input} ${firstOption} = `}
              {isNaN(fetchedData) ? (
                <AiOutlineLoading3Quarters className={styles.loader} />
              ) : (
                fetchedData
              )}
              {` ${secondOption}`}
            </span>
          ) : 'Select all inputs for converting'}
        </div>
      </div>
    </div>
  )
}

export default Converter