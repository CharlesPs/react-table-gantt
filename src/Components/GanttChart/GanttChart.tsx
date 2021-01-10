
import React from 'react'

import { getMonths, getAllDays } from '../../Helpers/GanttChartFunctions'

import GanttChartGrid from './GanttChartGrid'
import GanttChartHeader from './GanttChartHeader'
import GanttChartBody from './GanttChartBody'

type Props = {
    start: string,
    end: string,
    ganttItems: any,
    styles: any,
    locale: any,
}

const GanttChart = (props: Props) => {

    const months = getMonths(props.start, props.end)
    const days = getAllDays(props.start, props.end)

    const getItemsAsList = () => {

        const items: any = []

        props.ganttItems.map((ganttItem: any) => {

            items.push(ganttItem)

            if (ganttItem.type === 'group') {

                ganttItem.items.map((groupItem: any) => {

                    items.push(groupItem)

                    if (groupItem.type === 'group') {

                        groupItem.items.map((gItem: any) => {

                            items.push(gItem)
                        })
                    }
                })
            }
        })

        return items
    }

    const ganttItems = getItemsAsList()

    return (
        <div
            style={{
                flex: 1,
                overflowX: 'auto',
            }}
        >
            <svg
                height={props.styles.headerHeight + (ganttItems.length * props.styles.rowHeight)}
                width={days.length * props.styles.dayWidth}
            >
                <GanttChartGrid
                    ganttItems={ganttItems}
                    months={months}
                    days={days}
                    dayWidth={props.styles.dayWidth}
                    styles={props.styles}
                />
                <GanttChartHeader
                    months={months}
                    days={days}
                    dayWidth={props.styles.dayWidth}
                    styles={props.styles}
                    locale={props.locale}
                />
                <GanttChartBody
                    start={props.start}
                    end={props.end}
                    ganttItems={ganttItems}
                    styles={props.styles}
                />
            </svg>
        </div>
    )
}

export default GanttChart
