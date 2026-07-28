import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import RestaurantCard from './RestaurantCard';

function Search() {
    const filterOptions = [
        {name : "Restaurant"},
        //  {name : "Dishes"}
        ];

    const [searchQuery, setSearchQuery] = useState("");
    // const [dishes, setDishes] = useState([]);
    const [restaurant, setRestaurant] = useState([]);

    // const [activeFil, setActiveFil] = useState("Dishes");

    // function handleFilterBtn(filterName) {
    //     setActiveFil(activeFil == filterName ? activeFil : filterName)
    // }

    function handleQuery(e) {
        let val = e.target.value.trim();    //trim is for removing white spaces before and after the word
        if(e.keyCode == 13) {
            setSearchQuery(val);
        }
    }

    
    async function fetch_Restaurant_Dishes() {
        let response = await fetch(`${import.meta.env.VITE_RESTAURANT_URL}/dapi/restaurants/search/v3?lat=22.71700&lng=75.83370&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=1a6ff50f-7611-0e2f-caa5-161617fc4264&selectedPLTab=RESTAURANT`);

        let data = await response.json();
        // setDishes(data?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards?.filter(it => it?.card?.card?.info) || []);
        setRestaurant(data?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards?.filter(it => it?.card?.card?.info) || []);
        // console.log(restaurant)
    }

    useEffect(() => {
        if(searchQuery == "")
            return;

        fetch_Restaurant_Dishes();

    }, [searchQuery])


  return (
    <div className='min-w-full items-center flex flex-col gap-4 my-4'>
        <input className='p-3 w-[50%] max-[700px]:w-[70%] max-[500px]:w-[90%] border-[#5349496d] border focus:outline-none' onKeyDown={(e) => handleQuery(e)} type="text" placeholder='Search for restaurants and food' />
        <div className='flex flex-wrap gap-[.6rem]'>
            {
                filterOptions.map((data, idx) => (
                    <button key={idx} className={'filterBtn bg-[#9a8a8a46] '}>
                    <p>{data.name}</p>
                    </button>
               ))
            }
        </div>

        <div className='grid grid-cols-2 max-xl:grid-cols-1 w-[50%] max-[700px]:w-[70%] max-[500px]:w-[90%] justify-center bg-[#f5f6f8] p-3 gap-7'>
            {
            restaurant.map(({card : {card : {info}}}, idx) => (
        <div key={idx} className='flex gap-4 items-center bg-white p-3 w-[100%]'>
        <div className='relative shrink-0'>
            <img 
            className="h-[5.5rem] w-[6rem] object-cover rounded-2xl" 
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${info.cloudinaryImageId}`} 
            alt="{info.name} "
        />
        {info?.adTrackingId && <div className='absolute top-1 bg-[#3a3d4a] text-[#cdcece] tracking-tight font-bold text-xs py-[.15rem] px-[.4rem] rounded-lg'>Ad</div>}
        <div className='absolute bottom-[-10px] text-center font-bold  text-xs opacity-90 text-orange-600 bg-white'>{info?.aggregatedDiscountInfoV3?.header != undefined ? `${info?.aggregatedDiscountInfoV3?.header}  ${info?.aggregatedDiscountInfoV3?.subHeader != undefined ? info?.aggregatedDiscountInfoV3?.subHeader : ""}` : `${info?.costForTwo}`}</div>
        </div>
        <div className="mt-2 flex flex-col gap-2">
            <p className="font-bold max-[600px]:text-[.8rem] line-clamp-1">{info.name}</p>
            <div className='flex text-[.9rem] max-[600px]:text-[.7rem] items-center gap-1'>
                <div className='bg-green-600 rounded-full w-[1.1rem] h-[1.1rem] flex justify-center items-center'><i className="fi fi-ss-star flex text-white text-xs"></i></div>
                <p className='font-semibold'>{info.avgRatingString}</p>
                <p className='bg-black max-w-[.20rem] max-h-[.20rem] rounded-full mt-1'></p>
                <p className="font-semibold">{info.sla.slaString}</p>
            </div>
            <p className="text-[.9rem] max-[600px]:text-[.7rem] font-semibold opacity-60 line-clamp-1">{info.cuisines.join(", ")}</p>
            <div className='flex items-center gap-1'>
                <p className="text-[.9rem] font-semibold opacity-60">{info.areaName}</p>
                <p className='bg-black w-[.20rem] h-[.20rem] rounded-full'></p>
                <p className="text-[.9rem] font-semibold opacity-50">{info.sla.lastMileTravelString}</p>

            </div>
        </div>
        </div>
          ))
             }
        </div>
    </div>
  )
}

export default Search;

// aggregatedDiscountInfoV3 : {header, subHeader}
// sla : {lastMileTravelString, slaString},