
import React, { useEffect, useRef, useState } from 'react'

import { 
    getDaysForTask,
    getBoxPositionX, 
    getBoxPositionY, 
    getTextPositionX, 
    getTextPositionY, 
} from './GanttTaskHelper'

const GanttTask = (props: any) => {

    const textEl:any = useRef(null)
    const boxEl:any = useRef(null)

    const dayWidth = 46

    const [ textX, setTextX ] = useState(10)
    const [ textOut, setTextOut ] = useState(false)

    const [ boxPosX, setBoxPosX ] = useState(0)
    const [ boxPosY, setBoxPosY ] = useState(0)
    const [ textPosY, setTextPosY ] = useState(0)

    const getTaskPosition = () => {
        
        setBoxPosX(getBoxPositionX(props.start, props.task.start))

        setBoxPosY(getBoxPositionY(props.posY))
        setTextPosY(getTextPositionY(props.posY))

        const boxPosX = getBoxPositionX(props.start, props.task.start)

        const boxWidth = Math.round(boxEl.current.getBBox().width) + (boxPosX < 0 ? boxPosX : 0)
        const textWidth = Math.round(textEl.current.getBBox().width)

        const isBigger: boolean = ((textWidth + 20) >= boxWidth)

        setTextX(getTextPositionX(props.start, props.task.start, boxWidth, isBigger))
        setTextOut(isBigger)
    }

    useEffect(getTaskPosition, [ props.task ])

    return (
        <g className="gantt-task">
            <g>
                <rect className="gantt-task-rect" 
                    ref={boxEl}
                    rx={5}
                    ry={5}
                    x={boxPosX} 
                    y={boxPosY}
                    fill={props.task.bgColor}
                    stroke={props.task.bgColor}
                    strokeWidth={0}
                    height="20"
                    width={dayWidth * getDaysForTask(props.task.start, props.task.end) - 6}
                />
                <text className={`gantt-task-title ${!textOut ? '' : 'dark'}`}
                    ref={textEl}
                    x={textX} 
                    y={textPosY}
                >
                    {props.task.title}
                </text>
            </g>
        </g>
    )
}

export default GanttTask
