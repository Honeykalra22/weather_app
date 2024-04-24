import React, { useState } from 'react'
import { toast } from 'react-toastify'

function Input({ setQuery, units, setUnits }) {
    const [city, setCity] = useState('')
    const handleSearchClick = () => {
        if (city !== '') setQuery({ q: city })
    }

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            toast.info('Fetching users location.')
            navigator.geolocation.getCurrentPosition((position) => {
                toast.success('Location fetched')
                let lat = position.coords.latitude
                let lon = position.coords.longitude

                setQuery({
                    lat,
                    lon
                })
            })
        }
    }

    const handleUnitChange = (e) => {
        const selectedUnit = e.currentTarget.name
        if(units !== selectedUnit)  setUnits(selectedUnit)
    }

    return (
        <div className=' flex flow-row justify-center my-6'>
            <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
                <input
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    type="text"
                    placeholder='Search for city....'
                    className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize'
                />
                <svg onClick={handleSearchClick} xmlns="http://www.w3.org/2000/svg" className=' text-white w-7 h-7 font-bold transition ease-out hover:scale-125 cursor-pointer' fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <svg onClick={handleLocationClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 font-bold text-white transition ease-out hover:scale-125 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
            </div>

            <div className=' flex flex-row w-1/4 items-center justify-center'>
                <button
                    name='metric'
                    className=' text-white text-xl font-light hover:scale-125 transit ease-out'
                    onClick={handleUnitChange}
                >°C</button>
                <p className=' text-xl text-white mx-1'>|</p>
                <button
                    name='imperial'
                    className=' text-white text-xl font-light hover:scale-125 transit ease-out'
                    onClick={handleUnitChange}
                >°F</button>

            </div>

        </div>
    )
}

export default Input