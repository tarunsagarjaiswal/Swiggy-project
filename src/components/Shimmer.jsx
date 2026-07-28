import React from 'react'

function Shimmer() {
  return (
    <div className='min-w-full '>
        <div className='w-full flex flex-col gap-11 items-center justify-center h-[21.5rem] bg-[#111111]'>
        <div className='relative'>
        <span className="loader absolute"></span>
        <img className='h-14 pl-[1.15rem] pt-[.6rem]' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa" alt="carousel"></img>
        </div>
        <h1 className= 'font-semibold text-white opacity-80 text-3xl'>Looking for great food near you ...</h1>

        </div>

        <div className='animate-pulse flex justify-center w-[80%] mx-auto  items-center gap-10 my-6 flex-wrap'>
            {Array(9).map((it, idx) => (<div key={idx} className='bg-slate-100 w-[20rem] h-[15rem]'></div>))}
        </div>
    </div>
  )
}

export default Shimmer