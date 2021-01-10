
import React from 'react'

import { getMonthsPositions, thereIsTodayHighlight, getTodayPosition } from '../../Helpers/GanttChartFunctions'

type Props = {
    ganttItems: any,
    months: any,
    days: any,
    dayWidth: number,
    styles: any,
}

const GanttChartGrid = (props: Props) => {

    const monthsPositions = getMonthsPositions(props.months, props.dayWidth)

    return (
        <g id="chart-grid">
            <g id="grid-months">
                {props.months.map((_month: any, i: number) => (
                    <rect key={i}
                        className="grid-month"
                        x={monthsPositions[i]}
                        y={-1}
                        fill={props.styles.headerBgColor}
                        stroke="#333"
                        strokeWidth="1"
                        height={props.styles.headerRowHeight + 2}
                        width={props.dayWidth * _month.days}
                    />
                ))}
            </g>
            <g id="grid-days-of-week">
                {props.days.map((_day: any, i: number) => (
                    <rect key={i}
                        x={i * props.dayWidth}
                        y={props.styles.headerRowHeight}
                        fill={props.styles.headerBgColor}
                        height={props.styles.headerRowHeight}
                        width={props.dayWidth}
                    />
                ))}
            </g>
            <g id="grid-days-of-month">
                {props.days.map((_day: any, i: number) => (
                    <rect key={i}
                        x={i * props.dayWidth}
                        y={props.styles.headerRowHeight * 2}
                        fill={props.styles.headerBgColor}
                        height={props.styles.headerRowHeight}
                        width={props.dayWidth}
                    />
                ))}
            </g>
            <g id="grid-tasks-rows">
                {props.ganttItems.map((item: any, i: number) => (
                    <rect key={i}
                        x={0}
                        y={(i * props.styles.rowHeight) + props.styles.headerHeight}
                        fill={((i + 1) % 2 === 0) ? props.styles.bodyBgColorDark : props.styles.bodyBgColorLight}
                        height={props.styles.rowHeight}
                        width={props.dayWidth * props.days.length}
                    ></rect>
                ))}
            </g>
            <g id="grid-sundays">
                {props.days.map((_day: any, i: number) => {

                    if (_day.dow === '0') {

                        return (
                            <rect key={i} className="grid-day-sunday"
                                x={i * props.dayWidth}
                                y={0}
                                fill={props.styles.sundayBgColor}
                                height={(props.ganttItems.length * 38) + 56}
                                width={props.dayWidth}
                            />
                        )
                    }
                })}
            </g>
            {!thereIsTodayHighlight(props.days[0].dmy, props.days[props.days.length - 1].dmy) ? null : (
                <g id="grid-highlight-today">
                    <rect className="grid-day-hightlight"
                        x={getTodayPosition(props.days[0].dmy, props.dayWidth)}
                        y={0}
                        fill={props.styles.todayBgColor}
                        height={(props.ganttItems.length * props.styles.rowHeight) + props.styles.headerHeight}
                        width={props.dayWidth}
                    />
                </g>
            )}
        </g>
    )
}

export default GanttChartGrid
