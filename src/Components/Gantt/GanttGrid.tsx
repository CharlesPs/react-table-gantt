/*eslint array-callback-return: "off"*/

import React from 'react'

import { thereIsTodayHighlight, getTodayPosition } from './GanttTaskHelper'

const GanttGrid = (props: any) => {

    const getXPositions = () => {

        const xPositions: any = []

        let x = 0

        props.months.map((_month: any, i: number) => {

            xPositions.push(x)

            x += props.day_width * _month.days
        })

        return xPositions
    }

    const xPositions: any = getXPositions()

    return (
        <g id="grid" className="gantt-grid">
            <g>
                {props.months.map((_month: any, i: number) => (
                    <rect key={i}
                        className="grid-month"
                        x={xPositions[i]} 
                        y={0} 
                        width={props.day_width * _month.days}
                    />
                ))}
            </g>
            <g>
                {props.days.map((_day: any, i: number) => (
                    <rect key={i}
                        className="grid-day"
                        x={i * props.day_width} 
                        y={props.day_top} 
                        width={props.day_width}
                    />
                ))}
            </g>
            <g>
                {props.tasks.map((_task: any, i: number) => (
                    <rect key={i} className="grid-row" x={0} y={(i * 38) + 56} width={props.day_width * props.days.length}></rect>
                ))}
            </g>
            {thereIsTodayHighlight(props.start, props.end)}
            <g>
                <rect className="grid-day-hightlight" 
                    x={getTodayPosition(props.start)} 
                    y={0} 
                    height={(props.tasks.length * 38) + 56} 
                    width={props.day_width} 
                />
            </g>
        </g>
    )
}

export default GanttGrid
