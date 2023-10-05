import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Dob from './Dob';
import broken_cloud from './images/broken cloud.png';
import haze from './images/haze.png';
import fog from './images/fog.png';
import mist from './images/mist.png';
import img1 from './images/weather.png';
import clear_sky from './images/clear sky.png';
import over_cast from './images/over cast.png';
import load from './images/WeatherIcons.gif';



function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showCity, setShowCity] = useState(false);
  const [city, updatedcity] = useState("Patna");
  const [inputCity, setInputCity] = useState("");
  const [locationPermission, setLocationPermission] = useState(false);


  const no_date = currentDate.getDate();
  const day = currentDate.getDay();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const hour = currentDate.getHours();
  const min = currentDate.getMinutes();
  const sec = currentDate.getSeconds();
  const day_list = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thuresday", "Friday", "Saturday"];
  const month_list = ["January", "febuary", "March", "April", "May", "June", "July", "August", "September", "October", "Novermber", "December"];
  const Real_day = day_list[day]
  const Present_month = month_list[month];
  console.log(sec, Present_month);





  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&appid=38e19a036da04d6e8eb039ecea8ecae8`;
            const response = await fetch(url);
            const jsonData = await response.json();
            setData(jsonData);
            setLoading(false);
            updatedcity(jsonData.name);
            setShowCity(true);
            setLocationPermission(true); 
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        },
        () => {
          setLocationPermission(false); 
        }
      );
    } else {
      setLocationPermission(false); 

    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }}, []);



  const getWeatherData = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=38e19a036da04d6e8eb039ecea8ecae8`;
      const response = await fetch(url);
      const jsonData = await response.json();


      if (jsonData.cod !== 200) {
        alert('City not found. Please enter a valid city name.');
        return;
      }

      setData(jsonData);
      setLoading(false);
      updatedcity(jsonData.name);
      setShowCity(true);
      setLocationPermission(true);

    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

 



  





  const cityupdt = (e) => {

    updatedcity(e.target.value);

    setInputCity(e.target.value);
  };

  const handleButtonClick = (e) => {
    if (inputCity.trim() !== '') {

      getWeatherData();
      setShowCity(true);
      setInputCity("");
    }

  };



  return (
    <>
      {loading ? (
        <div className='loading_screen'><img src={load} alt='loading screen'></img></div>
      ) : (
        <div className='clock' >
          <div className='Clock_box_left' >

          {showCity ? (
    <>
      <h3>{city}</h3>
      <span id='time_style'>
        <p> {no_date} {Present_month} {year} </p>
        <p> {Real_day} {hour}:{min}:{sec}</p>
      </span>
    </>
  ) : null}

            <p id='temp'> {data.main.temp}°C</p>
          </div>
          <div className='Clock_box_right' >
            <img src={img1}></img>
            <input id='input' type='text' value={inputCity} onChange={cityupdt} placeholder='Search the city' autocomplete="off"></input>
            <button id='btn' onClick={handleButtonClick}>Submit</button>


            <div className=' img_option' >
              <p className='boder'> {data.weather[0].description}</p>

              {data.weather[0].description === 'haze' && <img src={haze} alt="Haze" />}
              {data.weather[0].description === 'broken clouds' && <img src={broken_cloud} alt="broken cloud" />}
              {data.weather[0].description === 'mist' && <img src={mist} alt="mist" />}
              {data.weather[0].description === 'clear sky' && <img src={clear_sky} alt="clear sky" />}
              {data.weather[0].description === 'overcast clouds' && <img src={over_cast} alt="over cast" />}

            </div>
            <p className='boder'>Humidity :    {data.main.humidity}%</p>
            <p className='boder'>Pressure :    {data.main.pressure} mmHg</p>
            <p className='boder'>Visibility :  {data.visibility} mi</p>
            <p className='boder'>Wind spped :  {data.wind.speed} km/h</p>



          </div>

        </div>

      )}
    </>
  );
}

export default App;