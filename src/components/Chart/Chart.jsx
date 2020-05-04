import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Charts = ( {data: {confirmed, recovered, deaths}, country} ) => {
    const [dailyData, setDailyData] = useState([]);
        // State field  this.setsate  

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);

    
    const lineChart = (
        dailyData.length
        ? (  
            <Line
                data ={{ 
                    labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    borderColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                }]
            }}
        />) : null
        );

        console.log(confirmed, recovered, deaths)

        const barChart = (
            confirmed
            ? (
                <Bar
                    data = {{
                        labels: ['infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                                'rgba(0, 0, 255, 0.5)',
                                'rgba(0, 255, 0, 0.5)',                            
                                'rgba(255, 0, 0, 0.5)',
                            ],
                            data:[confirmed.value, recovered.value, deaths.value]
                        }]
                    }}
                    options = {{
                        legend: {display: false},
                        title: {display: true, text: `Current state in ${country}`},

                    }}
                />
            ) : null
        )
    

    return (
        <div className={styles.container}>
            {/* if there's a country , show barchart else show linechart   */}
            {country ? barChart: lineChart}            
        </div>
    )
}

// functional component


export default Charts;