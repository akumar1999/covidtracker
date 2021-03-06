import axios from 'axios';


const url ="https://covid19.mathdro.id/api" ;


export const fetchData = async function (country) {
    let changeableUrl = url;

    if(country) {
        changeableUrl = `${url}/countries/${country}`
    }

    try {

        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);

        return {confirmed, recovered, deaths, lastUpdate};

    } catch (error) {
    
    }
}


export const fetchDailyData = async function () {
    try {
        
        const {data} = await axios.get(`${url}/daily`); //template string, 2nd part of the URL, daily data

        const modifiedData = data.map((dailyData) =>({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }));

        return modifiedData
    } catch (error) {

    }
}

export const fetchCountries = async function () {
    try {
        const {data: {countries}}= await axios.get(`${url}/countries`); //template string
    
        return countries.map((country) => country.name)
    } catch (error) {
        console.log(error);

    }
}