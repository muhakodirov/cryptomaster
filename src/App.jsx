import './App.css'
import Content from './components/Content/Content'
// import Navbar from './components/Navbar/Navbar'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Watchlist from './components/Watchlist/Watchlist'
import PageNotFound from './components/PageNotFound/PageNotFound'
import Layout from './components/Navbar/Navbar'
import SinglePage from './components/SingleCoinPage/SinglePage'
import Converter from './components/Converter/Converter'


function App() {

  return <>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Content/>} />
        <Route path='watchlist' element={<Watchlist/>} />
        <Route path='/:id' element={<SinglePage/>} />
        <Route path='converter' element={<Converter/>} />
        {/* <Route path='news' element={<News/>} /> */}
        {/* <Route path='*' element={<PageNotFound/>} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
  </>
}

export default App
