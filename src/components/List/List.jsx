import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import './list.css';
import PlaceDetails from './../Placedetails/PlaceDetails';
const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {



  const [elRefs, setElRefs] = useState([]);

  console.log({ childClicked });
  //console.log(places.length());
  useEffect(() => {
    const refs = Array(places && places.length).fill().map((_, i) =>  elRefs[i] || createRef());
    setElRefs(refs);
  }, [places]);

  return (
    <div className='container'>
      <Typography variant="h4" style={{ fontSize: '1.5rem' }}>Food & Dining around you</Typography>
      {isLoading ? (
        <div className='loading'>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className='formControl marginRight' style={{ marginBottom: '36px' }}>
            <InputLabel className='type' style={{ left: '-15px' }}>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)} style={{ marginTop: '20px' }} >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className='formControl marginLeft' style={{ marginBottom: '36px' }}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)} style={{ marginTop: '20px' }}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className='list'>
            {places && places.map((place, i) => (
              <Grid  ref={elRefs[i]} item key={i} xs={12}>
                <PlaceDetails place={place} selected={Number(childClicked) === i} refProp={elRefs[i]} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

    </div>
  );
}

export default List;
