import React from 'react'

function TopButton({setQuery}) {
    const citiies = [
        {
            id: 1,
            title: 'london'
        },
        {
            id: 2,
            title: 'jalandhar'
        },
        {
            id: 3,
            title: 'alwar'
        },
        {
            id: 4,
            title: 'jaipur'
        },
        {
            id: 5,
            title: 'sikar'
        },
    ]
    return( 
        <div className='flex items-center justify-around my-6'>
            {citiies.map((city)=>{
               return <button key={city.id} className=' text-white text-lg font-medium capitalize' onClick={()=>setQuery({q:city.title})}>{city.title}</button>
            })}
        </div>
    )
}

export default TopButton
