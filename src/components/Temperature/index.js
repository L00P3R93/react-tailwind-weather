import React from 'react';
import { convertIconToImg } from '../Util';

const Temperature = ({ weather: {detail, icon, temp, dt, timezone, sunset}, }) => {
    return (
        <div className="flex items-center flex-col">
            <div className="w-full flex justify-center mt-8 sm:mt-0">
                <figure>
                    <img
                        className="w-48 md:w-72 py-10 max-w-full"
                        src={convertIconToImg(icon)}
                        alt="weather-icon"
                    />
                </figure>
            </div>
            <p className="font-semibold">{detail}</p>
            <p className="text-6xl mt-5 relative">
                <span>{temp.toFixed()}</span>
                <span className="absolute text-5xl text-yellow-400 -top-2 ">°</span>
            </p>
        </div>
    )
}

export default Temperature;