import React, { useEffect, useState, lazy, Suspense } from 'react';
import Cards from './components/Cards';
import Temperature from './components/Temperature';
import Nav from './components/Nav';
import Settings from './components/Settings';
import Footer from './components/Footer';
import Waiting from './components/Waiting';

function App() {
  const [setting, setSetting] = useState(false);
  const [city, setCity] = useState('noida');
  const [weatherData, setWeatherData]= useState(null);
  const getResponse = async () =>{
    try{
    const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=d0f05ca207b9434b955417633ee551e7`);
    setWeatherData(await response.json());
  }
  catch(error){ 
    console.log(error);
  }
}
  useEffect(()=>{
    getResponse();
  }, []
  )
  const handleInputChange = (e)=>{
    setCity(e.target.value);
  }
  const handleSubmit = (e)=> {
    e.preventDefault();
    getResponse();
  }
  return (
    <>
      <Nav
      setSetting={setSetting}
      handleSubmit={handleSubmit}
      />
      <Suspense fallback={<Waiting/>}>
       <Temperature weatherData = {weatherData}/>
      </Suspense>
      <Settings 
      city={city} 
      handleSubmit={handleSubmit} 
      handleInputChange={handleInputChange}
      setting={setting} 
      setSetting={setSetting}
      getResponse={getResponse}
      />
      <Cards weatherData= {weatherData}/>  
      <Footer />
    </>
  )
}

export default App
