import {useGetCryptoNewsQuery, useGetNewsByIdQuery} from '../../service/newsApi'
import styles from './News.module.css'
import NewsCard from './NewsCard'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import {useState } from 'react';
import { useSelector } from 'react-redux';


function News() {
  const [more, setMore] = useState(false)
  const [selectedValue, setSelectedValue] = useState()
  const {currentData, isLoading, isError} = useGetCryptoNewsQuery({newsCategory: 'crypto', count: more ? 40 : 10 })
  const coinsList = useSelector((state) => state?.coin?.coin)
 
  if (isError) return <Stack sx={{ width: '100%' }} spacing={2}>
                       <Alert variant="filled" severity="error">Failed to fetch. Reload the page please!</Alert>
                      </Stack>
   




  const filteredNews = selectedValue ? currentData.data?.filter( item => item.attributes?.title.includes(selectedValue)) : currentData?.data

  return (
   
  <div className={styles.container}>
  
      <div className={styles.inputContainer}> 
      <div className={styles.selectInput}>
            <select onChange={(e) => setSelectedValue(e.target.value)}  name="" id="">
              <option value=""> {!selectedValue ? 'Filter news by coin name' : 'RESET FILTERS'}  </option>
              <hr />
              <option value="MicroStrategy"> MicroStrategy </option>
              <option value="Binance"> Binance </option>
              <option value="Coinbase"> Coinbase </option>
              {coinsList.slice(0,50).map((coin, id)=>{
                return <option key={id} value={coin.name}>
                      {coin.name}
                </option>
              })}
            </select>
            
            
            <input id='input' title='Filter news by time' type="date" /> 
        </div>
      </div>
      <div className={styles.newsContainer}>
        <div className={styles.headingText}>
            <h2> CRYPTO NEWS</h2>
        </div>
        
        <div className={styles.flexContainer}>
        { (isLoading || currentData?.length > 0)  && <Stack 
                        paddingTop={20}     
                        // paddingLeft={50}     
                        alignItems="center"
                        justifyContent="center"
                        sx={{ color: 'grey.500' }} spacing={2} direction="row">
                          <CircularProgress color="success" />
                        </Stack>}
            {!(filteredNews?.length <= 0 ) ? filteredNews?.map((item, id) => {
                return <NewsCard key={id} props={{
                        image: item.links?.uriImage,
                        title: item.attributes?.title,
                        content: item.attributes?.content,
                        newsURL: item.links?.canonical,
                        id: item.attributes?.id,
                        publish: item.attributes?.publishOn
                        }} />
                })
              : <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant="filled" severity="error"> No news about {selectedValue} </Alert>
             </Stack>}
        </div>
      
        <button disabled={!(filteredNews?.length >= 10)} onClick={()=>setMore(!more)} className={styles.buttonShowMore}> Show {more ? 'less' : 'more'}</button>
      </div>
  
  
  </div>
  )
}

export default News