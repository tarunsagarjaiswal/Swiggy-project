import React from 'react'
import { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';


function TopRestaurant({data}) {
        // const [data, setData] = useState([])
        const [trans, setTrans] = useState(0);
    
        // async function fetchData(params) {
        //     const data = await fetch('/dapi/restaurants/list/v5?lat=22.71700&lng=75.83370&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING')
    
        //     const result = await data.json();
        //     console.log(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);            
        //     setData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            
        // }
    
        // useEffect(() => {
        //     fetchData();
        // },[])
    
        function handlePrev(){
            trans <=0 ? "" : setTrans((prev) => prev - 50)
        }
    
        function handleNext(){
            trans >= 450 ? "" :setTrans((prev) => prev + 50)
        }

  return (
    <>
        <div className='flex justify-between'>
            <p className='text-2xl font-bold'>Top restaurant chains in Indore</p>
            <div className='flex gap-2'>
                <div className={`cursor-pointer w-8 h-8 rounded-full flex justify-center items-center ` + (trans <= 0 ? "bg-slate-200" : "bg-slate-300")}  onClick={handlePrev}>
                    <i className={` fi fi-rr-arrow-small-left ` + (trans <= 0 ? "opacity-30" : "")}></i>
                </div>
                <div className={`cursor-pointer w-8 h-8 rounded-full flex justify-center items-center ` + (trans >= 450 ? "bg-slate-200" : "bg-slate-300")} onClick={handleNext}>
                    <i className={` fi fi-rr-arrow-small-right ` + (trans >= 450 ? "opacity-30" : "")}></i>
                </div>
            </div>
        </div>
        <div style={{ translate: `-${trans}%` }} className={`flex gap-6 mt-5 duration-500 `}>
                {
                    data.map(({ info, cta:link }, idx) => (
                        <div key={idx} className='w-[273px] shrink-0 hover:scale-95 duration-100 cursor-pointer'>
                            <RestaurantCard {...info} link={link}/>
                        </div>
                    ))
                }

            </div>
        <hr className='border mt-12' />
    </>
  )
}

export default TopRestaurant