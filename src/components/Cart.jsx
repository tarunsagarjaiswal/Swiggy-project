import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/contextApi';
import { Link, useNavigate }  from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllItems, deleteItem } from '../utils/cartSlice';
import toast from 'react-hot-toast';
import { toogleSignIn } from '../utils/toggleSlice';

function Cart() {
   
    // const {cartData, setCartData} = useContext(CartContext);
    const cartData = useSelector(state => state.cartSlice.cartItems)
    const resInfo = useSelector(state => state.cartSlice.resInfo)


    const deleteCartDispatch = useDispatch();
    const userData = useSelector(state => state.authSlice.userData);
    const clearCartDispatch = useDispatch();
    const navig = useNavigate();
    const [isMore, setIsMore] = useState(false);

    const SignInVisible = useSelector((state) => state.toogleSlice.signInToogle)
    const dispatch = useDispatch();    

    let totalPrice = 0;
    for (let i = 0; i < cartData.length; i++) {
        totalPrice += cartData[i]?.price/100;
    }

    if(cartData.length == 0) {
    return <div className='flex flex-col gap-3 justify-center items-center  h-[89vh]'>
            <h1 className='text-4xl '>Order karlo yrrr.....😊 </h1>
            <Link to={'/'}><button className='bg-green-400 text-xl shadow-xl rounded-2xl p-2'>ORDER FROM HERE..</button></Link>
            </div>
    }

    function handleRemoveToCart(id) {
        deleteCartDispatch(deleteItem(id));
        // cartData.splice(idx, 1);
        // let newCartData = [...cartData];
        // setCartData(newCartData);

        // localStorage.setItem('cartData', JSON.stringify([...newCartData])); 
        
        // if(newCartData.length == 0){
        // localStorage.setItem('resInfo', JSON.stringify([]));
        // }
    }


    function clearCart() {
        clearCartDispatch(clearAllItems());
        // setCartData([]);
        // localStorage.setItem('cartData', JSON.stringify([]));
    }


    function placeOrder() {
        if(userData == null) {
            dispatch(toogleSignIn());
            return toast.error("Sign in to place order")
        }

        toast.success("order placed")
    }

    function moreLess() {
        setIsMore(prev => !prev);
    }
    

  return (
    <div className='w-full'>
        <div className='w-[50%] mx-auto '>
            <Link to={'/RestaurantMenu/203980210'}><p className='text-center mt-5 tracking-tighT font-semibold opacity-70 shadow-lg bg-[#83c7ad] p-2 shadow-black text-3xl'>{resInfo?.name} - {resInfo?.areaName}</p></Link>
            <div className='flex flex-col gap-7 mt-14 mb-5'>
                {
                cartData.map((info, idx) => (
                        <div key={idx} className='pb-10 pt-4 flex justify-between border-b-2 min-h-[174px]'>
                        <div className='w-[70%] tracking-tighter flex flex-col gap-4'>
                            <div className='leading-5'>
                            {info?.itemAttribute?.vegClassifier == "VEG" ? <i className="text-green-600 fi fi-br-stop-square"></i> : <i className="text-red-600 fi fi-br-stop-square"></i>}
                            <p className='text-lg font-bold'>{info?.name}</p>
                            <p className='font-bold'><i className="text-xs fi fi-br-indian-rupee-sign"></i> {(info?.price)/100}</p>
                            </div>

                            {info?.ratings?.aggregatedRating?.rating ? <p><i class="fi fi-ss-star"></i> <span>{info?.ratings?.aggregatedRating?.rating} ({info?.ratings?.aggregatedRating?.ratingCountV2})</span></p> : ""}
                            
                            <div> 
                            <span className='leading-[1.3rem] font-semibold opacity-55'>{ info?.description.substring(0,100) + '...'}</span>
                            </div>
                            
                        </div>
                        <div className='relative h-full'>
                            <img className='w-[156px] h-[144px] rounded-xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${info?.imageId}`} alt="" />
                            <button onClick={() => handleRemoveToCart(info?.id)} className='absolute mt-[-1.5rem] left-5 bg-white shadow-lg w-[70%] h-[25%] rounded-xl text-lg font-bold tracking-tighter text-red-600'>REMOVE</button>
                        </div>
                    </div>
                ))
            }
            <h1 className='mt-7 text-2xl font-bold'>TO PAY : ₹{totalPrice}</h1>
            <div className='w-full flex justify-between gap-5'>
            <button className= 'bg-blue-400 p-2 w-[15rem] font-bold rounded-3xl border-black shadow-lg border' onClick={placeOrder}>PLACE ORDER...</button>
            <button className= 'bg-red-400 p-2 w-[15rem] font-bold rounded-3xl border-black shadow-lg border' onClick={clearCart}>CLEAR ALL..</button> 
            </div>
            </div>

        </div>
    </div>
  )
}

export default Cart