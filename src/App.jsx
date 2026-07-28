import React, { useState, useEffect} from 'react'
import './App.css'
// import Home from './components/Home'
// import Body from './components/Body'
import { Route, Routes } from 'react-router-dom'
// import RestaurantMenu from './components/RestaurantMenu'
import { CartContext, Visibility } from './context/contextApi'
// import Cart from './components/Cart'
import { useSelector } from 'react-redux'
// import SignInPage from './components/SignInBtn'
// import Search from './components/Search'

const Search = React.lazy(() => import("./components/Search"));
const Home = React.lazy(() => import("./components/Home"));
const Body = React.lazy(() => import("./components/Body"));
const RestaurantMenu = React.lazy(() => import("./components/RestaurantMenu"));
const Cart = React.lazy(() => import("./components/Cart"));
const SignInPage = React.lazy(() => import("./components/SignInBtn"));

function App() {
  
  // const [visible, setVisible] = useState(false);
  const visible = useSelector((state) => state.toogleSlice.serachBarToogle)
  const SignInVisible = useSelector((state) => state.toogleSlice.signInToogle)

  // const [cartData, setCartData] = useState([]);
  const cartData = useSelector(state => state.cartSlice.cartItems);

  // function getDataFromLocalStorage() {
  //       let data = JSON.parse(localStorage.getItem('cartData')) || [];
  //       setCartData(data);
  //   }

  //   useEffect(() => {
  //       getDataFromLocalStorage();
  //   }, [])

   return (
        <div className={visible || SignInVisible ? "overflow-hidden h-screen" : ""}>
         
          <Routes>
            <Route path='/' element={<Home/>}>
                  <Route path='/' element={<Body/>} />
                  <Route path='/RestaurantMenu/:id' element={<RestaurantMenu/>}/>
                  <Route path='/Cart' element={<Cart/>}/>
                  <Route path='/SignIn' element={<SignInPage/>}/>
                  <Route path='/Search' element={<Search/>}/>
                  <Route path='*' element={<h1 className='text-9xl flex justify-center items-center h-[89vh]'>COMING SOON....</h1>}/>
            </Route>
          </Routes>
          
        </div>
  )
}

export default App
