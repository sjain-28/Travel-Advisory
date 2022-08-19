import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {  Paper, Typography, useMediaQuery } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Rating from '@mui/lab/Rating';
import './map.css';
const Map = ({setCoordinates,setBounds,coordinates,places,setChildClicked, weatherData}) => {
  const isDesktop = useMediaQuery('(min-width:600px)');
  console.log("weatherdat is:");
  //console.log(weatherData.list.length());
  console.log(weatherData)
console.log(weatherData.list);
  return (
    <div className='mapContainer'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50,50,50,50]}
        onChange={(e) => {
          // console.log('====================================');
           console.log(e);
          // console.log('====================================');
          setCoordinates({lat:e.center.lat,lng:e.center.lng});
          setBounds({ne: e.marginBounds.ne,  sw: e.marginBounds.sw});
        }}
        onChildClick={(child) => setChildClicked(child)}
  
      >
        {places && places.map((place, i) => (
          <div
            className='markerContainer'
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper elevation={3} className='paper'>
                  <Typography className='typography' variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className='pointer'
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))}
        {/* <div className='weather'>
          <h1>{weatherData.main.temp}</h1>
        </div> */}
      
        {weatherData && weatherData.list && weatherData.list.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <div className='weather'>
              <h1>{data.main.temp}</h1>
            </div>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
          </div>
        ))}
        {/* const icon = weatherData.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png" */}
      </GoogleMapReact>

    </div>
  )
}

export default Map
