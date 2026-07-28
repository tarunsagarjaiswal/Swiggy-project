import React, { useEffect, useState } from 'react'

function useRestaurantData() {

     const [topRestaurant, setTopRestaurant] = useState([]);
      const [onYourMind , setOnYourMind] = useState([]);

      async function fetchData() {
                  const data = await fetch(`${import.meta.env.VITE_BASE_URL}/dapi/restaurants/list/v5?lat=22.71700&lng=75.83370&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
          
                  const result = await data.json();
                  // console.log(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

                //   const setTopRestaurantData = result?.data?.cards
                  setOnYourMind(result?.data?.cards?.find(data => data?.card?.card?.id == "whats_on_your_mind")?.card?.card?.imageGridCards?.info);            
                  setTopRestaurant(result?.data?.cards?.find(data => data?.card?.card?.id == "top_brands_for_you")?.card?.card?.gridElements?.infoWithStyle?.restaurants);
                  // console.log(result?.data?.cards?.find(data => data?.card?.card?.id == "top_brands_for_you"))
                //   result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
                }
          
              useEffect(() => {
                  fetchData();
              },[])
              
        return [topRestaurant, onYourMind];
}

export default useRestaurantData