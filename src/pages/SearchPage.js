import React from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { BiX } from 'react-icons/bi';
import { SlLocationPin } from 'react-icons/sl';
import { motion } from 'framer-motion';

import Header from '../components/Header';

const SearchPage = ({ setQuery }) => {
    const [city, setCity] = React.useState('');

    const handelSearchClick = (e) => {
        if (e.key === 'Enter' && city !== '') {
            setQuery({ q: city });
        }
    }

    const handelResetValue = () => {
        setCity('');
    }

    const handelLocationClick = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setQuery({ lat: latitude, lon: longitude });
            })
        }
    }

    return (
        <motion.div
            className='search-container p-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Header title="search for a city" />
            <div className="search-input-container w-full flex items-center my-6 h-12 bg-[#1f1f21] rounded-full">
                <RiSearchLine
                    onClick={handelSearchClick}
                    className="ml-4 text-xl text-gray-300"
                />
                <input
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    onKeyUp={(e) => handelSearchClick(e)}
                    type="text"
                    className="w-full h-full bg-transparent rounded-full outline-none text-sm px-3 placeholder:text-sm placeholder:text-gray-500"
                    placeholder="Search"
                />
                {city ? (
                    <BiX
                        onClick={handelResetValue}
                        className="mr-4 p-1 text-xl text-gray-300 cursor-pointer hover:text-white hover:scale-110 transition"
                    />
                ) : (
                    ''
                )}
            </div>
            <div className="w-full flex justify-center">
                <div
                    onClick={handelLocationClick}
                    className="flex w-52 flex-col justify-center items-center cursor-pointer text-slate-400 my-10 hover:scale-125 transition hover:text-slate-300"
                >
                    <SlLocationPin className="text-6xl lg:text-8xl" />
                    <p className="text-sm lg:text-lg mt-4">Find my location</p>
                </div>
            </div>
        </motion.div>
    )
}

export default SearchPage;
