"use client";
import React from "react";
import { Chart } from 'primereact/chart';

export default function WG({ data }: any) {

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
            <Chart type="line" data={data} options={option} />
        </div >
    )
}