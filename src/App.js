import { CssBaseline, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData, getWeatherData } from './api/index';

function App() {
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  //const [autocomplete, setAutoComplete] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([])

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    })
  }, []);

  console.log(weatherData);
  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

       getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => setWeatherData(data));

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          console.log(data);
          // setPlaces(data && data.filter((place) => place.name && place.num_reviews > 0));
          setPlaces(data);
          setFilteredPlaces([]);
          setIsLoading(false);
        });
    }
  }, [type, bounds]);


  // const onLoad = (autoC) => setAutoComplete(autoC);

  // const onPlaceChanged = () => {
  //   const place = autocomplete.getPlace();
  //   const lat = place.geometry.location.lat();
  //   const lng = place.geometry.location.lng();
  //   console.log("lat is: ", lat);
  //   console.log("long is:", lng);
  //   setCoordinates({ lat, lng });
  // }



  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}
      //  onPlaceChanged={onPlaceChanged} 
      //  onLoad={onLoad} 
       />
      <Grid container spacing={3} style={{ width: '100%' }} >
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />

        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />

        </Grid>
      </Grid>


    </>
  );
}

export default App;
