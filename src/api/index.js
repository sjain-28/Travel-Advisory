import axios from "axios";

// const URL ='https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';



export const getPlacesData = async (type, sw, ne) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
                // limit: '30',

                // lunit: 'km',
                // lang: 'en_US'
            },
            headers: {
                
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        });
        return data;
    }
    catch (error) {
        console.log(error);
    }
}




export const getWeatherData = async (lat, lng) => {

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const unit = "metric";
    const lati = lat;
    const lngi = lng;
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lati + "&lon=" + lngi + "&appid=" + apiKey + "&units=" + unit;
    try {
        const response = await fetch(url);
        console.log("response is", response);
        const data = await response.json();
        console.log("data is", data);
        console.log(data.coord);
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

