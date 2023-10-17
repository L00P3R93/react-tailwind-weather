import React from 'react'
import { convertIconToImg } from '../Util'

const Forecasts = ({ items, title }) => {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col w-10/12">
                <header>{title}</header>
                <div className="py-6 sm:p-6 flex sm:justify-center my-5 overflow-x-auto gap-5">
                    {items.map((item) => (
                        <Forecast
                            item={item}
                            key={item.title}
                            convertIconToImg={convertIconToImg}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

const Forecast = ({ item, convertIconToImg }) => {
    return (
        <div className="min-w-[5rem] h-24 justify-between px-1 flex flex-col items-center transition hover:scale-125">
            <figure className="w-9">
                <img src={convertIconToImg(item.icon)} alt={item.title} />
            </figure>
            <p className="text-[0.56rem] text-gray-400">{item.title}</p>
            <div className="flex justify-center">
                <span>{item.temp.toFixed()}</span>
                <span className="ml-0.5 text-yellow-400">°</span>
            </div>
        </div>
    )
}

export default Forecast