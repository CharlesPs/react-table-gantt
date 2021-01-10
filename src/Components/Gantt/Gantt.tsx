
import React from 'react'

import { fixRelationsDates } from '../../Helpers/GanttChartFunctions'

import GanttTable from '../GanttTable/GanttTable'
import GanttChart from '../GanttChart/GanttChart'

type Props = {
    start: string,
    end: string,
    tasks: any,
    adjustRelations?: boolean,
    onItemClick?: any,
    onModifyTasks?: any,
    table: any,
    styles: any,
    locale: any,
}

const Gantt = (props: Props) => {

    const ganttItems = props.adjustRelations ? fixRelationsDates(props.tasks) : props.tasks

    return (
        <div
            style={{
                display: 'flex',
                overflow: 'hidden',
            }}
        >
            <GanttTable
                tasks={ganttItems}
                table={props.table}
                onItemClick={(task: any) => props.onItemClick(task)}
                onModifyTasks={(tasks: any) => props.onModifyTasks(tasks)}
                headerHeight={props.styles.headerHeight}
                rowHeight={props.styles.rowHeight}
                styles={props.styles}
            />
            <GanttChart
                start={props.start}
                end={props.end}
                ganttItems={ganttItems}
                styles={props.styles}
                locale={props.locale}
            />
        </div>
    )
}

export default Gantt
