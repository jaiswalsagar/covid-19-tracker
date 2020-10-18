import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;
  if(country){
    changeableUrl = '${url}/countries/${country}'
  }
  // try fethc data from api goes in the loop to try  and if not able to fetch display messaage (error)
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(`${url}`);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {}
};

//  created a second function to fetch daily data because we need daily data for the chart
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.comfirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
}
export const fetchCountries = async ()=> {
  try{
    const { data: { countries }} = await axios.get(`${url}/countries`);
  return countries.map((country) => country.name);
  } catch (error){
    console.log(error);
  }
}

