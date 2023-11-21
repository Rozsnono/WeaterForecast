import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

export default function WG({ data }) {

    const option = {
        plugins: {  // 'legend' now within object 'plugins {}'
            legend: {
                labels: {
                    color: "white",
                    font: {
                        size: 12
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    color: "white",
                    font: {
                        size: 10,
                    },
                }
            },
            x: { 
                ticks: {
                    color: "white",
                    font: {
                        size: 10
                    },
                    stepSize: 1,
                }
            }
        }
    }

    return (
        <div className="graph" >
            <Line data={data} key={data.labels[0]} options={option}></Line>
        </div >
    )
}