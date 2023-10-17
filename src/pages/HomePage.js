import Temperature from '../components/Temperature';
import TimeAndLocation from '../components/TimeAndLocation';
import Forecasts from '../components/Forecast';
import Loading from '../components/Loading';

import { motion } from 'framer-motion';

const HomePage = ({ weather, units }) => {
    return (
        <motion.div
            className='w-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {weather ? (
                <>
                    <header className='fixed px-6 py-4 w-full'>
                        <TimeAndLocation weather={weather} />
                    </header>
                    <section>
                        <Temperature weather={weather} />
                    </section>
                    <section>
                        <Forecasts 
                            title="Hourly"
                            items={weather.hourly}
                            weather={weather}
                            units={units}
                        />
                        <Forecasts
                            title="Daily"
                            items={weather.daily}
                            weather={weather}
                            units={units}
                        />
                    </section>
                </>
            ) : (
                <Loading />
            )}
            <div className='h-14'></div>
        </motion.div>
    )
}

export default HomePage;