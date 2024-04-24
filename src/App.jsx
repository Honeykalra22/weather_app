import { useEffect, useState } from 'react'
import './App.css'
// import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButton from './Components/TopButton'
import Input from './Components/Input'
import TimeandLocation from './Components/TimeandLocation'
import TemperatureandDetail from './Components/TemperatureandDetail'
// import Forcast from './Components/Forcast'
import getFormatedWeatherData from './Services/WeatherService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query, setQuery] = useState({ q: 'new york' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.'
      toast.info('Fetching weather for ' + message)

      await getFormatedWeatherData({ ...query, units }).then(data => {

        toast.success(`Succesfully fetched weather for ${data.name}, ${data.country}.`)
        setWeather(data);
      });
      // console.log(data);
    }
    fetchWeather();
  }, [query, units]);

    const formatBackground = ()=> {
      if(!weather)  return 'from-cyan-700 to-blue-700'
      const thresold = units === 'matric'?20:60
      if(weather.temp <= thresold) return 'from-cyan-700 to-blue-700'
      
      return 'from-yellow-700 to-orange-700'
    }

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit ${formatBackground()} shadow-xl shadow-gray-400`} >
      <TopButton setQuery = {setQuery}/>
      <Input setQuery = {setQuery} units = {units} setUnits = {setUnits}/>

      {weather && (
        <div>
          <TimeandLocation weather = {weather} />
          <TemperatureandDetail weather = {weather} />
          {/* <Forcast title="hourly forecast" items={weather.hourly} /> */}
          {/* <Forcast title="daily forecast" items={weather.daily}/> */}
        </div>
      )}


      <ToastContainer autoClose = {5000} theme='colored' newestOnTop={true}/>

    </div>
  )
}

export default App

// 1 32