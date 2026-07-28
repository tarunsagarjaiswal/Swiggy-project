import React from 'react'
import { Link } from 'react-router-dom'

function RestaurantCard(info) {
  // console.log(info.link.link.split('/'));
  
  return (
    <Link to={`/restaurantMenu/${info.link.link.split('/')[4] + "-" +info.link.link.split('/')[5]}`}>
    <div className='relative'>
            <img 
            className="w-full h-[182px] object-cover rounded-2xl" 
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${info.cloudinaryImageId}`} 
            alt="{info.name} "
        />
        <div className='rounded-2xl absolute top-0 bg-gradient-to-t from-black from-1% to-transparent to-35% w-full h-full'></div>
        <div className='absolute bottom-0 p-2 font-bold text-xl text-white'>{info?.aggregatedDiscountInfoV3?.header != undefined ? `${info?.aggregatedDiscountInfoV3?.header} ${info?.aggregatedDiscountInfoV3?.subHeader != undefined ? info?.aggregatedDiscountInfoV3?.subHeader : ""}` : `${info?.costForTwo}`}</div>
        </div>
        <div className="mt-2">
            <p className="font-bold text-lg truncate">{info.name}</p>
            <div className='flex items-center gap-1'>
                <div className='bg-green-600 rounded-full w-[1.1rem] h-[1.1rem] flex justify-center items-center'><i className="fi fi-ss-star flex text-white text-xs"></i></div>
                <p className='font-semibold'>{info.avgRatingString}</p>
                <p className='bg-black w-[.20rem] h-[.20rem] rounded-full mt-1'></p>
                <p className="font-semibold">{info.sla.slaString}</p>
            </div>
            <p className="font-semibold opacity-60 truncate">{info.cuisines.join(", ")}</p>
            <p className="font-semibold opacity-60">{info.areaName}</p>
        </div>
    </Link>
  )
}

export default RestaurantCard