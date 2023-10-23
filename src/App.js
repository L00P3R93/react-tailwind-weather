import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/Layout';
import ExplorePage from './pages/ExplorePage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SettingPage from './pages/SettingPage';
import NotFound from './pages/NotFound';

import getFormattedWeatherData, { getFourWeatherData } from './services/weatherService';

import './App.css';

const App = () => {

	const [query, setQuery] = useState({ q: 'isfahan' });
	const [units, setUnits] = useState('metric');
	const [isMetric, setIsMetric] = useState(false);
	const [weather, setWeather] = useState(null);
	const [cities, setCities] = useState(null);

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				const data = await getFormattedWeatherData({...query, units});
				console.log("Weather data:", data);
				setWeather(data);
			} catch (error) {
				console.error("Error fetching weather data:", error);
			}
		}

		fetchWeather();
	}, [query, units])

	useEffect(() => {
		const fetchFourWeatherData = async () => {
			await Promise.all(getFourWeatherData({ units })).then((data) => {
				setCities(data);
			})
		}

		fetchFourWeatherData();
	}, [units]);

	const location = useLocation();

	return (
		<main className="flex w-full items-center justify-center">
			<div className="app w-full lg:w-3/4 xl:w-3/5 h-[500px] sm:h-screen">
				<Layout>
					<AnimatePresence>
						<Routes location={location} key={location.pathname}>
							<Route
								path='/'
								element={<HomePage units={units} weather={weather} />}
								exact
							/>
							<Route 
								path='/search'
								element={<SearchPage setQuery={setQuery} />}
							/>
							<Route 
								path='/explore'
								element={<ExplorePage cities={cities} setQuery={setQuery} />}
							/>
							<Route
								path="/setting"
								element={
									<SettingPage
										weather={weather}
										units={units}
										setUnits={setUnits}
										isMetric={isMetric}
										setIsMetric={setIsMetric}
									/>
								}
							/>
							<Route path="*" element={<NotFound />} />
						</Routes>
					</AnimatePresence>
				</Layout>
			</div>
		</main>
	)
}

export default App;
