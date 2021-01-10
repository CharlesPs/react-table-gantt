
import React, { useRef } from 'react'

type Props = {
    itemData: any,
}

const GanttItem = (props: Props) => {

    const boxEl:any = useRef(null)

    if (props.itemData.type === 'group') return null

    return (
        <g>
            <g>
                <rect
                    ref={boxEl}
                    rx={5}
                    ry={5}
                    x={props.itemData.task.posX}
                    y={props.itemData.task.posY}
                    fill={props.itemData.task.bgColor}
                    stroke={props.itemData.task.bgColor}
                    strokeWidth={0}
                    height={props.itemData.task.height}
                    width={props.itemData.task.width}
                />
            </g>
        </g>
    )
}

export default GanttItem
