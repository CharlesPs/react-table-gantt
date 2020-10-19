/*eslint "array-callback-return": "off" */

import React from 'react'

type Props = {
}

const GanttHeader = (props: any) => {

    const months_sizes = [ 42, 56, 46, 34, 40, 40, 34, 52, 74, 60, 80, 74 ]

    const getMonthsXPositions = () => {

        const xPositions: any = []

        let posX = 0

        props.months.map((_month: any, i: number) => {

            const left = ((_month.days * props.day_width) / 2) - (months_sizes[_month.m] / 2)

            xPositions.push(posX + (left >= 5 ? left : 5))

            posX += props.day_width * _month.days
        })

        return xPositions
    }

    const monthsXPositions: any = getMonthsXPositions()

    const getPaddingLeft = (day_num: number) => {

        if (day_num <= 9) {

            return 19
        }

        return 16
    }

    return (
        <g id="header" className="gantt-header">
            {props.months.map((_month: any, i: number) => (
                <text key={i}
                    x={monthsXPositions[i]}
                    y={22}
                >
                    {_month.name}
                </text>
            ))}
            {props.days.map((_day: any, i: number) => (
                <text key={i}
                    className="day"
                    x={getPaddingLeft(_day.d) + (i * props.day_width)} 
                    y={props.day_top}
                >
                    {_day.d}
                </text>
            ))}
        </g>
    )
}

export default GanttHeader
