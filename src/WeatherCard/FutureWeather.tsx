"use client";

import React from "react";

export default function FW(props: any) {

    return (
        <div className={"future-card " + props.class} onClick={() => props.clicked()}>
            <div className="f-text"> {props.icon} {props.data.temp.max}°/<span className="f-text-tmp">{props.data.temp.min}°</span>
                <span className="f-text-date">
                    {new Date(props.date).toLocaleDateString("default", { month: "short", day: "2-digit" })} - {props.index === 1 ? "Holnap" : props.index === 0 ? "Ma" : new Date(props.date).toLocaleDateString("default", { weekday: "long" })}
                </span>
            </div>
            {/* <IconButton aria-label="search" className="f-icon-btn" ><SearchIcon/></IconButton> */}
        </div>
    )
}