import React, { useState } from 'react'
import RestaurantCard from './RestaurantCard'
import { useDispatch } from 'react-redux';
import { setFliterVal } from '../utils/filterSlice';

function OnlineFoodDeliver({data}) {

    const filterOptions  = [
        {
            name : "Rating 4.0+"
        },
        {
            name : "Offers"
        },
        {
            name : "Rs. 300-Rs. 600"
        },
        {
            name : "Less than Rs. 300"
        },
    ]

    const [activeFil, setActiveFil] = useState(null);

    const filterDispatch = useDispatch();

    function handleFilterBtn(filterName) {
        setActiveFil(activeFil == filterName ? null : filterName)
    }

    filterDispatch(setFliterVal(activeFil));

  return (
    <div className='flex flex-col gap-6'>
        <p className='text-2xl font-bold'>Restaurants with online food delivery in Indore</p>
        <div className='flex flex-wrap gap-[.6rem]'>
            {
                filterOptions.map((data, idx) => (
                    <button onClick={() => handleFilterBtn(data.name)} key={idx} className={'filterBtn ' + (activeFil == data.name ? "activeBtn" : "")}>
                    <p>{data.name}</p>
                    {activeFil == data.name ? <i className="pt-[.15rem] flex fi fi-rr-cross-small"></i> : ""}
                    </button>
               ))
            }
        </div>
        <div className={`grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-7  `}>
                {
                    data.map(({ info, cta:link }, idx) => (
                        <div key={idx} className='xl:w-[268px] lg:w-[260px] md:w-[255px] shrink-0 hover:scale-95 duration-100 cursor-pointer'>
                            <RestaurantCard {...info} link={link} />
                        </div>
                    ))
                }

            </div>
    </div>
  )
}

export default OnlineFoodDeliver