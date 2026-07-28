import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MOCK_MENU_DATA } from './HardCodeData';
import { CartContext } from '../context/contextApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../utils/cartSlice';
import toast from 'react-hot-toast';

function RestaurantMenu() {
    const {id} = useParams();
    let mainId = id.split('-').at(-1);
  
    const [resInfo, setResInfo] = useState({});
    const [menuData, setMenuData] = useState([]);
    const [discountData, setDiscountData] = useState([]);
    
    async function fetchMenu() {
        setResInfo(MOCK_MENU_DATA?.data?.cards[2]?.card?.card?.info);
        
        setDiscountData(MOCK_MENU_DATA?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle.offers);
        
        let actualMenu = (MOCK_MENU_DATA?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards)?.filter(data => (data?.card?.card?.categories || data?.card?.card?.itemCards))

        setMenuData(actualMenu);
        // console.log(actualMenu);
        

    }

    useEffect(() => {
      fetchMenu();
    }, [])

    const [value, setValue] = useState(0);
    
    function handlePrev(){
        value <= 0 ? "" : setValue((prev) => prev - 35)
    }

    function handleNext(){
        value >= 140 ? "" : setValue((prev) => prev + 35)
    }
    
  return (
      <div className='min-w-full '>
          <div className='lg:w-[50rem] max-lg:w-[45rem] max-sm:w-[23rem] max-md:w-[35rem] mx-auto pt-7'>
              <p className='text-[11px] font-bold flex gap-[.4rem] text-slate-800'> 
                  <Link to={'/'}><span className='cursor-pointer opacity-40 hover:opacity-100'>Home /</span></Link> 
                  <Link to={'/'}><span className='cursor-pointer opacity-40 hover:opacity-100'>{resInfo.city} /</span> </Link> 
                  <span>{resInfo.name}</span>
                  </p>
              <h1 className='font-bold text-2xl pt-3'>{resInfo.name}</h1>

              <img className='mt-3 rounded-3xl' alt="Starbucks Coffee cover" class="" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1600,h_640,c_fill/RX_THUMBNAIL/IMAGES/VENDOR/2026/5/4/06f54bad-e339-47ed-8dfc-853c88c9b795_403809.JPG"></img>

              <div className='w-full h-[13.2rem] px-4 pb-4 bg-gradient-to-t from-slate-200 rounded-[1.9rem] mt-5'>
                  <div className='w-full flex flex-col gap-[.55rem] p-4 bg-white rounded-[1.9rem] h-full'>
                        <div className='flex gap-2 items-center'>
                          <div className='bg-green-700 rounded-full w-[1.1rem] h-[1.1rem] flex justify-center items-center'><i className="fi fi-ss-star flex text-white text-xs"></i></div>
                          <p className='font-bold '>{resInfo.avgRatingString} ({resInfo.totalRatingsString})</p>
                          <p className='bg-slate-500 w-[.20rem] h-[.20rem] rounded-full mt-1'></p>
                          <p className='font-bold '>{resInfo.costForTwoMessage}</p>
                        </div>

                        <p className='text-[#ff6735] underline font-bold text-sm'>{resInfo?.cuisines?.join(',')}</p>

                        <div className='flex items-center text-sm font-semibold gap-2'>
                            <p className='text-green-600 '>{resInfo?.timingsInfo?.status}</p>
                            <p className='bg-slate-500 w-[.20rem] h-[.20rem] rounded-full mt-1'></p>
                            <p className='text-slate-400'>{resInfo?.timingsInfo?.message}</p>
                            <i className="text-[#ff5809] fi fi-rr-caret-down flex"></i>
                        </div>

                        <hr className='border w-[50%]'/>

                        <div className='flex items-center gap-3'>
                            <div className='flex flex-col items-center opacity-80 w-[.4rem]'>
                                <p className='bg-slate-400 w-[.4rem] h-[.4rem] rounded-full '></p>
                                <p className='bg-slate-400 w-[.1rem] h-[1.3rem] rounded-full '></p>
                                <p className='bg-slate-400 w-[.4rem] h-[.4rem] rounded-full '></p>
                            </div>
                            <div className='flex flex-col gap-[.4rem]'>
                                <div className='flex items-center text-sm font-semibold gap-[.6rem]'>
                                    <p>Outlet</p>
                                    <p className='text-slate-500'>{resInfo.areaName}</p>
                                    <i className="text-[#ff5809] fi fi-rr-caret-down flex text-sm"></i>
                                </div>
                                <p className='text-sm font-semibold '>{resInfo?.sla?.slaString}</p>
                            </div>
                        </div>
                  </div>
              </div>

              <div className='w-full flex flex-col gap-3 overflow-hidden'>
                  <div className='flex justify-between mt-7'>
                      <p className='text-xl font-bold'>Deals for you</p>
                      <div className='flex gap-2'>
                          <div className={`cursor-pointer w-8 h-8 rounded-full flex justify-center items-center ` + (value <= 0 ? "bg-slate-200" : "bg-slate-300")}  onClick={handlePrev}>
                              <i className={` fi fi-rr-arrow-small-left ` + (value <= 0 ? "opacity-30" : "")}></i>
                          </div>
                          <div className={`cursor-pointer w-8 h-8 rounded-full flex justify-center items-center ` + (value >= 140 ? "bg-slate-200" : "bg-slate-300")} onClick={handleNext}>
                              <i className={` fi fi-rr-arrow-small-right ` + (value >= 140 ? "opacity-30" : "")}></i>
                          </div>
                      </div>
                  </div>
                  <Discount discountData={discountData} value={value}/>
              </div>

              <h2 className='text-center mt-7 tracking-wide opacity-75'>/// MENU ///</h2>

              <div className='w-full max-sm:w-[70%] cursor-pointer bg-[#e5e6e6] mt-5 rounded-xl flex h-12 items-center justify-between gap-12 px-4'>
                <p className='text-lg mx-auto '>Search for dishes</p>
                <i className="fi fi-rr-search flex"></i>
              </div>  

              <div className='w-full mt-7'>
                {
                  menuData.map(({card}, idx) => (
                      <MenuSection key={idx} card={card} resInfo={resInfo} />
                  ))
                }
              </div>

          </div>
      </div>
  )
}

function MenuSection({ card, resInfo }) {
    const [open, setOpen] = useState(true);

    // If it's a section like "Recommended" (has itemCards directly)
    if (card?.card?.itemCards) {
        return (
            <div className='mt-6 border-b-[16px] border-gray-100 pb-4'>
                <div className='flex justify-between items-center cursor-pointer' onClick={() => setOpen(!open)}>
                    <h1 className='font-bold text-xl'>{card?.card?.title} ({card?.card?.itemCards.length})</h1>
                    <i className={`fi fi-rr-angle-small-${open ? 'up' : 'down'} flex text-2xl`}></i>
                </div>
                {open && <DetailMenu card={card} resInfo={resInfo}/>}
            </div>
        );
    }

    // If it's a section like "Monsoon Specials" (has nested categories)
    return (
        <div className='mt-6 border-b-[16px] border-gray-100 pb-4'>
            <h1 className='font-bold text-xl mb-4'>{card?.card?.title}</h1>
            <DetailMenu card={card} resInfo={resInfo}/>
        </div>
    );
}

function Discount({discountData, value}){
  return (
    <div style={{translate : `-${value}%`}} className='flex gap-4 duration-200'>
      {
        discountData.map(({info : {couponCode, header, offerLogo}} , idx) => (
          <div key={idx} className='flex border border-slate-300 w-[23rem] h-[4.7rem] shrink-0 rounded-2xl items-center pl-4 gap-3'>
            <img className='w-12 h-12' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${offerLogo}`} alt="" />
            <div>
              <p className='font-bold text-lg'>{header}</p>
              <p className='font-bold opacity-50 text-sm mt-[-4px]'>{couponCode}</p>
            </div>
          </div>
        ))
      }
    </div>  
  )
}

function DetailMenu({card, resInfo}) {
    if(card?.card?.categories) {
       return (
        <div>
          {
            card?.card?.categories.map((it, idx) => (
                <div key={idx}>
                    <MenuCard it={it} resInfo={resInfo}/>
                </div>
            ))
          }
        </div>
      )
    }
    else {
      return (
        <div className='mt-4'>
          {
            card?.card?.itemCards.map((it, idx) => (
                <div key={idx}>
                    <MenuCard it={it} resInfo={resInfo}/>
                </div>
            ))
          }
        </div>
      )
    }
}

function MenuCard({it, resInfo}) {
  const [open, setOpen] = useState(false);

    function toogleFun() {
      setOpen((prev) => !prev)      
    }

  if(it?.card?.info){
    const {card : {info}} = it;
      return (
        <MenuItem info={info} resInfo={resInfo}/>
      )
  }  

  // Nested Category rendering (like "Drinks")
  else{
    return (
    <div className='border-b border-gray-200 py-3'>
        <div className='flex items-center justify-between cursor-pointer' onClick={() => toogleFun()}>
            <h1 className='font-bold text-lg'>{it.title} ({it?.itemCards?.length})</h1>
            <i className={`fi fi-rr-angle-small-${open ? 'up' : 'down'} flex text-2xl`}></i>
        </div>

        {open && 
            <div className='mt-4'>
                {
                it?.itemCards.map(({card : {info}}, idx) => (
                    <MenuItem key={idx} info={info} resInfo={resInfo}/>
                ))
                }
            </div>
        }
    </div>
  )
  }
}

function MenuItem({info, resInfo}) {
    const [isMore, setIsMore] = useState(false);
    let desc = info?.description.substring(0,150);

    // const {cartData, setCartData} = useContext(CartContext);
    const cartData = useSelector(state => state.cartSlice.cartItems);
    const cartDispatch = useDispatch();
    const localStorageInfo = useSelector(state => state.cartSlice.resInfo);

    function handleAddToCart() {
        const isAdded = cartData.find(data => data?.id === info?.id)

        if(isAdded == undefined){

        if(localStorageInfo.length == 0 || localStorageInfo.name === resInfo.name){ 
        cartDispatch(addToCart({info, resInfo}))
        toast.success('food added to cart');      
        // setCartData(prev => [...prev, info])
        // localStorage.setItem('cartData', JSON.stringify([...cartData, info])); 
        // localStorage.setItem('resInfo', JSON.stringify(resInfo)); 
        }
         
        else{
            alert("added from differnt restaurant.Clear the previous restaurant");
            toast.error("added from differnt restaurant.Clear the previous restaurant", {
            position : 'bottom-center',
            duration : 700,
        });
         }
        }

        else {
        // alert("alreday added in the cart");
        toast.error("alreday added in the cart", {
            position : 'bottom-center',
            duration : 1000,
            icon: "🔁",
        });
        }
    }

    function moreLess() {
        setIsMore(prev => !prev);
    }
    
    return (
        <div className='pb-10 pt-4 flex justify-between border-b-2 min-h-[174px]'>
                        <div className='w-[70%] tracking-tighter flex flex-col gap-4'>
                            <div className='leading-5'>
                            {info?.itemAttribute?.vegClassifier == "VEG" ? <i className="text-green-600 fi fi-br-stop-square"></i> : <i className="text-red-600 fi fi-br-stop-square"></i>}
                            <p className='text-lg font-bold'>{info?.name}</p>
                            <p className='font-bold'><i className="text-xs fi fi-br-indian-rupee-sign"></i> {(info?.price)/100}</p>
                            </div>

                            {info?.ratings?.aggregatedRating?.rating ? <p><i class="fi fi-ss-star"></i> <span>{info?.ratings?.aggregatedRating?.rating} ({info?.ratings?.aggregatedRating?.ratingCountV2})</span></p> : ""}
                            
                            {
                                info?.description.length > 150 ? <div> 
                            <span className='leading-[1.3rem] font-semibold opacity-55'>{isMore ? info?.description : desc + '...'}</span>
                            <button className='font-semibold tracking-tighter opacity-80' onClick={moreLess}>{isMore ? "less" : "more"}</button>
                            </div> : 
                            <p className='leading-[1.3rem] font-semibold opacity-55'>{desc}</p>
                            }
                        </div>
                        <div className='relative h-full'>
                            <img className='w-[156px] h-[144px] rounded-xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${info?.imageId}`} alt="" />
                            <button onClick={handleAddToCart} className='absolute mt-[-1.5rem] left-5 bg-white shadow-lg w-[70%] h-[25%] rounded-xl text-lg font-bold tracking-tighter text-green-600'>ADD</button>
                        </div>
                    </div>
    )
}

export default RestaurantMenu;