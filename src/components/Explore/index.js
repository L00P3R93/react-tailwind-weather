import React from 'react';
import { convertIconToImg } from '../Util';
import Tilt from 'react-parallax-tilt';

const Explore = ({ city, setQuery}) => {
    return (
        <Tilt>
            <div className="explore-city relative text-sm glassEffect flex flex-col rounded-3xl p-5" onClick={() => setQuery({ q: city.name })}>
                <figure className="flex justify-center -mt-9">
                    <img src={convertIconToImg(city.icon)} className="w-9" alt="sun" />
                </figure>
                <div className="top flex items-center justify-between">
                    <div className="w-24 flex items-center justify-center">
                        <p>{city.name}</p>
                    </div>
                    <div className="w-24 flex items-center justify-center">
                        <p className="text-base relative font-bold">
                            <span>{city.temp.toFixed()}</span>
                            <span className="absolute text-yellow-400 -top-1">°</span>
                        </p>
                    </div>
                </div>

                <div className="middle flex justify-between my-3">
                    <div className="h-full w-24 flex flex-col justify-between items-center">
                        <p className="text-gray-400 mb-2">High</p>
                        <p>{city.temp_max.toFixed()}</p>
                    </div>
                    <div className="h-full w-24 flex flex-col justify-between items-center">
                        <p className="text-gray-400 mb-2">Low</p>
                        <p>{city.temp_min.toFixed()}</p>
                    </div>
                </div>

                <div className="bottom flex justify-between my-3">
                    <div className="h-full w-24 flex flex-col justify-between items-center">
                        <p className="text-gray-400 mb-2">Wind</p>
                        <p>{`${city.speed.toFixed()} km/h`}</p>
                    </div>
                    <div className="h-full w-24 flex flex-col justify-between items-center">
                        <p className="text-gray-400 mb-2">Humidity</p>
                        <p>{`${city.humidity} %`}</p>
                    </div>
                </div>
            </div>
        </Tilt>
    )
}

export default Explore;