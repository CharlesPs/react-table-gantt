/*eslint "@typescript-eslint/no-unused-vars": "off" */

import React, { useEffect, useRef, useState } from 'react'

import { getYesterdayPosition } from './GanttTaskHelper'

import GanttTable from './GanttTable'
import GanttGrid from './GanttGrid'
import GanttHeader from './GanttHeader'
import GanttBody from './GanttBody'

import './styles.css'

import moment from 'moment'
moment.locale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Setiembre_Octubre_Noviembre_Diciembre'.split('_')
})

type Props = {
    start: string,
    end: string,
    day_width: number,
    tasks: any,
    onReorder: any,
    table?: any,
}

const Gantt = (props: Props) => {

    const container:any = useRef(null)

    const num_days_top = 32
    const cell_days_top = 48

    const [ scrolled, setScrolled ] = useState(false)

    const getMonths = () => {

        const months: any = []

        let day = moment(props.start)

        while (day.isSameOrBefore(props.end)) {
            
            const month: any = {
                m: day.month(),
                code: day.format('YYYY-MM'),
                name: day.format('MMMM')
            }

            const filter = months.filter((_month: any) => _month.code === month.code)

            if (!months.filter((_month: any) => _month.code === month.code).length) {

                month.days = 1
                months.push(month)
            } else {

                filter[0].days += 1
            }

            day.add(1, 'day')
        }

        return months
    }

    const getDays = () => {

        const days = []

        let day = moment(props.start)

        while (day.isSameOrBefore(props.end)) {
            
            days.push({
                d: day.date()
            })

            day.add(1, 'day')
        }

        return days
    }

    const scrollToday = () => {

        if (scrolled) return

        setTimeout(() => {
    
            const yesterdayPosition = getYesterdayPosition(props.start)
    
            container.current.scrollLeft = yesterdayPosition

            setScrolled(true)
        }, 100)
    }

    useEffect(scrollToday, [ props.tasks ])

    return (
        <div style={{
            display: 'flex',
        }}>
            <GanttTable table={props.table} tasks={props.tasks} onReorder={(tasks: any) => props.onReorder(tasks)} />
            <div className="gantt" ref={container}>
                <svg height={38 * props.tasks.length + 56} width={getDays().length * props.day_width}>
                    <GanttGrid 
                        start={props.start}
                        end={props.end}
                        days={getDays()} 
                        day_top={num_days_top}
                        day_width={props.day_width}
                        months={getMonths()}
                        tasks={props.tasks}
                    />
                    <GanttHeader 
                        days={getDays()} 
                        day_top={cell_days_top}
                        day_width={props.day_width} 
                        months={getMonths()}
                    />
                    <GanttBody
                        start={props.start}
                        days={getDays()} 
                        tasks={props.tasks}
                    />
                </svg>
            </div>
        </div>
    )
}

export default Gantt
