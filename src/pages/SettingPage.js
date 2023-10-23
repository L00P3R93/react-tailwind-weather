import { motion } from "framer-motion";

import Header from "../components/Header";
import { formatToLocalTime } from "../services/weatherService";



const SettingPage = ({ weather, setUnits, isMetric, setIsMetric }) => {
    const handleChangeUnits = () => {
        setIsMetric(!isMetric)
        setUnits(isMetric ? 'metric' : 'imperial')
    }

    return (
        <motion.div
            className='p-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Header title='Setting' />
            <div className="setting-container flex flex-col items-center my-6">
                <div className="time text-8xl mb-9">
                    <p>
                        {weather
                            ? formatToLocalTime(weather.dt, weather.timezone, 'hh: mm')
                            : ''}
                    </p>
                </div>
                <div
                    onClick={handleChangeUnits}
                    className="w-full py-4 px-7 mb-10 flex justify-between rounded-full glassEffect"
                >
                    <p>Temperature based on</p>
                    <p className="text-yellow-400">{isMetric ? 'F' : 'C'}</p>
                </div>
                <div className="w-full py-4 px-7 mb-10 flex justify-between rounded-full glassEffect">
                    <p>Theme</p>
                    <p className="text-yellow-400">Dark</p>
                </div>
            </div>
        </motion.div>
    )
}

export default SettingPage;