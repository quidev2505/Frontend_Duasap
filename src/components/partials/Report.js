import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
// import getData from './data/Data'
import { BarChart } from "./BarChart";
import axios from 'axios';
import { URL_PATH } from '../../ultils/url_path_api';

Chart.register(CategoryScale);

function ReportJS() {
    //Data
    const arr_result = []
    axios.get(`${URL_PATH}order/get`).then((data) => {
        let data_receive = data.data
        let timeArray = [];
        data_receive.forEach((item, index) => {
            let time = item.createdAt || ''
            let time_change = time.substring(0, 10)

            let solve_time = time_change.split('-')
            let result_time = `${solve_time[2]}-${solve_time[1]}-${solve_time[0]}`

            timeArray.push(result_time);

        })

        const count = {};
        timeArray.forEach(element => {
            count[element] = (count[element] || 0) + 1;
        });


        for (let key in count) {
            let count_index = 1;
            let obj_result = {
                id: count_index,
                year: key,
                userGain: count[key]
            }
            arr_result.push(obj_result)
        }

        localStorage.setItem('chart', JSON.stringify(arr_result));

    }).catch((err) => console.log(err))


    let data_map = JSON.parse(localStorage.getItem('chart'))

    let delayed;
    // eslint-disable-next-line
    const [chartData, setChartData] = useState({
        labels: data_map && data_map.map((data) => data.year),
        datasets: [
            {
                options: {
                    animation: {
                        onComplete: () => {
                            delayed = true;
                        },
                        delay: (context) => {
                            let delay = 0;
                            if (context.type === 'data' && context.mode === 'default' && !delayed) {
                                delay = context.dataIndex * 1000 + context.datasetIndex * 100;
                            }
                            return delay;
                        },
                    },
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true
                        }
                    }
                },
                label: "Số đơn ",
                data: data_map && data_map.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ],
        
    })
    return (
        <div className="App">
            <BarChart chartData={chartData} />
        </div>
    )
}

export default ReportJS;