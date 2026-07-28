import React, { useContext, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { CartContext, Visibility } from '../context/contextApi';
import { swiggyLocationMockData as locationMockData } from './HardCodeData';
import { useDispatch, useSelector } from 'react-redux';
import toogleSlice from "../utils/store"
import { toogleSearchBar, toogleSignIn } from '../utils/toggleSlice';
import SignInBtn from './SignInBtn';

function Home() {
    const head = [
        // {img: <i className="fi fi-sr-briefcase flex font-bold"></i>,
        //  name: "Swiggy Corporate",
        //  path: "/Corporate"   
        // },
        {img: <i className="fi fi-rr-search flex font-bold"></i>,
         name: "Search",   
         path : "/Search"
        },
        // {img: <i className="fi fi-rr-badge-percent flex font-bold"></i>,
        //  name: "Offers",   
        //  path: "/Offers"
        // },
        {img: <i className="fi fi-rr-life-ring flex font-bold"></i>,
         name: "Help",  
         path: "/Help" 
        },
        {img: <i className="fi fi-rr-user flex font-bold"></i>,
         name: "Sign In",   
         path: "/SignIn"
        },
        {img: <i className="fi fi-rr-shopping-cart-add flex font-bold"></i>,
         name: "Cart",
         path: "/Cart"   
        },
    ]

    // const {visible, setVisible} = useContext(Visibility);
    // const {cartData, setCartData} = useContext(CartContext);
    const cartData = useSelector(state => state.cartSlice.cartItems);
    // console.log(cartData);
    
    //using redux toolkit for handle toogle of search bar
    const visible = useSelector((state) => state.toogleSlice.serachBarToogle)
    // console.log(visible);

    const SignInVisible = useSelector((state) => state.toogleSlice.signInToogle)

    const [searchResult, setSearchResult] = useState([]);
    const dispatch = useDispatch()


    
    function handleVisibility() {
        // setVisible(prev => !prev);
        dispatch(toogleSearchBar());

    }
    
    function handleSignIn() {
        dispatch(toogleSignIn());

    }

    async function searchResultFun(e) {
        // const response = await fetch('https://www.swiggy.com/dapi/misc/place-autocomplete?input=mumbai');
        // const data = await response.json();
        // console.log(data);
        if(e == "") return setSearchResult([]);
        setSearchResult(locationMockData.data);
    }

    const userData = useSelector(state => state.authSlice.userData);

  return (

    <>
    <div className='w-full'>
        <div className={'w-full h-full bg-black/50 fixed z-20 ' + (SignInVisible ? "visible" : "invisible")}>
        </div>
            
        <div className={'flex flex-col  gap-3 p-7 bg-white h-full  sm:w-[33%] w-full z-30 fixed duration-500 ' + (SignInVisible ? "right-0" : "-right-full")}>
           <p className='w-[10%] text-2xl cursor-pointer' onClick={handleSignIn}><i className="fi fi-rr-cross-small"></i></p>
           <div className='w-[80%] flex items-center justify-between'>
            <p className='text-4xl font-semibold tracking-tight'>Login</p>
            <img className='h-[7.8rem]' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
           </div>
           <hr className='border-black w-[10%]'/>
           <SignInBtn/>
           <p className='text-sm font-semibold tracking-tighter text-[#000000a9] leading-4'>By clicking on Login, I accept the Terms & Conditions & Privacy <br /> Policy</p>
           </div>

        </div>

    <div className='w-full'>
        <div className={'w-full h-full bg-black/50 absolute z-20 ' + (visible ? "visible" : "invisible")}></div>
            
        <div className={'flex flex-col items-end gap-5 pr-4 pt-2 text-lg bg-white h-full sm:w-[33%] w-full z-30 absolute duration-500 ' + (visible ? "left-0" : "-left-[100%]")}>
           <p className='w-[10%] text-2xl' onClick={handleVisibility}><i className="fi fi-rr-cross-small"></i></p>
           <input type="text" placeholder='Search for Area, Street Name...' className='tracking-tighter w-[60%] border p-2 focus:outline-none focus:shadow-xl' onChange={(e) => searchResultFun(e.target.value)} />
           <div className='flex items-center gap-3 border w-[60%]'>
            <i className="text-2xl fi fi-br-land-layer-location"></i>
            <div>
                <p>Get current location</p>
                <p className='text-sm opacity-65'>using GPS</p>
            </div>
           </div>
            <div>
                <ul className='flex flex-col gap-3 opacity-70 items-end'>
                    {
                        searchResult.map((it, idx) => (
                            <li key={idx} className='w-[60%]' onClick={handleVisibility}>{it.description}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
        </div>

    <div className='relative min-w-full'>
    <div className='min-w-full z-10 top-0 bg-white sticky h-20 shadow-md flex md:justify-evenly px-2 justify-between items-center' >
        <div className='flex justify-center items-center gap-7'>
            <Link to={'/'}><img className='hover:scale-110 duration-200 cursor-pointer h-20' src="https://static.vecteezy.com/system/resources/previews/050/816/833/non_2x/swiggy-transparent-icon-free-png.png" alt="" /></Link>
            <div className='cursor-pointer group flex justify-center items-center gap-3' onClick={handleVisibility}>
                <p className='font-bold border-b-2 border-black group-hover:border-[#ff5809] group-hover:text-[#ff5809]'>other</p>
                <i className="fi fi-bs-angle-down flex text-[#ff5809]"></i>
            </div>
        </div>
        
        <div className='flex justify-center items-center lg:gap-12 md:gap-6 gap-5 text-[1.05rem]'>
            {
                head.map((it,idx) => (
                    it.name == "Sign In" ? 

                    <div onClick={handleSignIn} key={idx} className='flex items-center font-semibold gap-2 cursor-pointer hover:text-[#ff5809]'>
                    {userData ? <img className=' h-8' src={userData.pic} alt="" /> : it.img}
                    {userData ? <p>{userData.name}</p> : <p className='max-sm:hidden'>{it.name}</p>}
                    </div> 
                    :

                    <div key={idx} className=' flex items-center font-semibold gap-2 cursor-pointer hover:text-[#ff5809]'>
                    <Link to={it.path}><div>{it.img}</div></Link>
                    <Link to={it.path}><p className='max-sm:hidden'>{it.name}  <sup className='text-[.6rem] font-extrabold  text-[#ffa702]'>{it.name == "Offers" ? "NEW" : ""}</sup></p></Link>
                    {it.name == "Cart" && cartData.length > 0 ? `+${cartData.length}` : ""}
                    </div>
                ))
            }            
        </div>
    </div>

    <Outlet/>
        </div>
    </>
  )
}

export default Home