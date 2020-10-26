
import React from 'react'

import GanttTask from './GanttTask'

const GanttBody = (props: any) => {

    return (
        <g id="gantt-body" className="gantt-body">
            {props.tasks.map((task: any, i: number) => (
                <GanttTask key={i} 
                    start={props.start}
                    task={task}
                    posX={i}
                    posY={i}
                    paddingTop={7}
                    onTaskClick={(task: any) => props.onTaskClick(task, i)}
                />
            ))}
        </g>
    )
}

export default GanttBody
