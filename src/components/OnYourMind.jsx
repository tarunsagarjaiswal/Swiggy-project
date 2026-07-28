import React from 'react'
import { useState, useEffect } from 'react';

function OnYourMind({data}) {
    // const [data, setData] = useState([])
    const [trans, setTrans] = useState(0);

    // async function fetchData(params) {
    //     const data = await fetch('/dapi/restaurants/list/v5?lat=22.71700&lng=75.83370&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING')

    //     const result = await data.json();
    //     console.log(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
    //     setData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
        
    // }

    // useEffect(() => {
    //     fetchData();
    // },[])

    function handlePrev(){
        trans <=0 ? "" : setTrans((prev) => prev - 50)
    }

    function handleNext(){
        trans >= 200 ? "" :setTrans((prev) => prev + 50)
    }


  return (
    <>
        <div className='flex justify-between'>
            <p className='text-2xl font-bold'>What's on your mind?</p>
            <div className='flex gap-2'>
                <div className={`cursor-pointer w-8 h-8 rounded-full flex justify-center items-center ` + (trans <= 0 ? "bg-slate-200" : "bg-slate-300")}  onClick={handlePrev}>
                    <i className={` fi fi-rr-arrow-small-left ` + (trans <= 0 ? "opacity-30" : "")}></i>
                </div>
                <div className={`cursor-pointer w-8 h-8 rounded-full flex justify-center items-center ` + (trans >= 200 ? "bg-slate-200" : "bg-slate-300")} onClick={handleNext}>
                    <i className={` fi fi-rr-arrow-small-right ` + (trans >= 200 ? "opacity-30" : "")}></i>
                </div>
            </div>
        </div>
        <div style={{translate: `-${trans}%`}} className={`flex gap-6 mt-5 duration-500`}>
            {
            data.map((it, idx) => (
                <img key={idx} className="h-[180px] w-[144px] cursor-pointer" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${it.imageId}`} alt="" />
            ))
            }
        </div>
        <hr className='border mt-10' />
    </>

  )
}

export default OnYourMind