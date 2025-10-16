
import './App.css'
import Header from './components/Header/Header'
import Banner from './components/Banner/Banner'
import Destacados from './components/Destacados/Destacados'
import Footer from './components/Footer/Footer'
import MasVendidos from './components/MasVendidos/MasVendidos'
import NewArrivals from './components/NewArrivals/NewArrivals'
import NewCollections from './components/NewCollections/NewCollections'


function App() {
  return (
    <>
     <Header/>
     <Banner/>
     <Destacados/>
     <MasVendidos/>
     <NewCollections/>
     <NewArrivals/>
     <Footer/>
    </>
  )
}

export default App
