import React, { useEffect, useState } from 'react'
import OnYourMind from './OnYourMind'
import TopRestaurant from './TopRestaurant'
import OnlineFoodDeliver from './OnlineFoodDeliver';
import { useSelector } from 'react-redux';
import Shimmer from './Shimmer';
import useRestaurantData from '../hooks/useRestaurantData';

function Body() {
            const  [topRestaurant, onYourMind]  = useRestaurantData();

            const filterVal = useSelector(state => state.filterSlice.filterValue)
            const filteredData = topRestaurant.filter(({info}) => {

                if(filterVal != null) {
                     switch (filterVal) {
                        case "Rating 4.0+": return info?.avgRating > 4.5

                        case "Offers": return info?.aggregatedDiscountInfoV3

                        case "Rs. 300-Rs. 600": return (info?.costForTwo.slice(1,4) >= 300 && info?.costForTwo.slice(1,4) <= 600)

                        case "Less than Rs. 300": return info?.costForTwo.slice(1,4) <= 300
                        
                        default : return [];
                            
                     }
                }
             
            })
            

  return (
    <div className='min-w-full h-full'>
        {
            topRestaurant.length > 0 ? <>
            <div className='w-[75%] flex-col mx-auto overflow-hidden my-4'>
            <OnYourMind data={onYourMind}/>
        </div>

        <div className='w-[75%] mx-auto flex flex-col overflow-hidden my-4'>
            <TopRestaurant data={topRestaurant}/>
        </div>

        <div className='lg:w-[75%] w-[70%] xl:w-[84%] mx-auto flex flex-col overflow-hidden my-4'>
            <OnlineFoodDeliver data = {filterVal ? filteredData : topRestaurant}/>
        </div>
        </> : 
        <Shimmer/> 
        }
        

        
    </div>
  )
}

export default Body