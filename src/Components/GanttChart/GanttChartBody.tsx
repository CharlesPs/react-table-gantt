
import React from 'react'

import GanttItem from '../GanttItem/GanttItem'
import GanttArrow from '../GanttArrow/GanttArrow'

import { getBoxPositionX, getTaskDays, fixRelationsDates, getRelations } from '../../Helpers/GanttChartFunctions'

type Props = {
    start: string,
    end: string,
    ganttItems: any,
    styles: any,
}

const GanttChartBody = (props: Props) => {

    const ganttItems = props.ganttItems.map((taskItem: any, i: number) => {

        if (taskItem.type === 'task') {

            taskItem.task.posX = getBoxPositionX(props.start, taskItem.task.startsAt, props.styles.dayWidth) + props.styles.rowTaskPaddingLeft
            taskItem.task.posY = props.styles.headerHeight + (i * props.styles.rowHeight) + props.styles.rowTaskPaddingTop

            taskItem.task.height = props.styles.rowTaskHeight
            taskItem.task.width = props.styles.dayWidth * getTaskDays(taskItem.task.startsAt, taskItem.task.endsAt) - (props.styles.rowTaskPaddingLeft * 2)
        }

        return taskItem
    })

    const relations = getRelations(ganttItems)

    return (
        <g id="gantt-body" className="gantt-body">
            <g id="gantt-relations">
                {relations.map((relation: any, i: number) => (
                    <GanttArrow key={i}
                        color='#000'
                        width={1.4}
                        {...relation}
                    />
                ))}
            </g>
            <g id="gantt-tasks">
                {ganttItems.map((ganttItem: any, i: number) => (
                    <GanttItem key={i}
                        itemData={ganttItem}
                    />
                ))}
            </g>
        </g>
    )
}

export default GanttChartBody
