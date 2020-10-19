
import React from 'react'

import ReorderSVG from './reorder.svg'

const GanttTable = (props: any) => {

    let row: any

    let tableRows: any = []

    let rowIndex: number
    let targetIndex: number

    const dragStart = (e: any) => {

        row = e.target
    }

    const dragOver = (e: any) => {
        e.preventDefault()
        e.stopPropagation()

        tableRows = Array.from(e.target.parentNode.parentNode.children)
        targetIndex = tableRows.indexOf(e.target.parentNode)
    }

    const dragEnd = (e: any) => {

        rowIndex = tableRows.indexOf(row)

        if (rowIndex !== targetIndex) {
    
            if (targetIndex > rowIndex) {
    
                moveDown(rowIndex, targetIndex)
            } else {
    
                moveUp(rowIndex, targetIndex)
            }
        }
    }

    const moveUp = (rowIndex: number, targetIndex: number) => {

        const _tasks: any = []

        props.tasks.map((_task: any, i: number) => {

            if (i === targetIndex) {

                _tasks.push(props.tasks[rowIndex])
            } else if (i > targetIndex && i <= rowIndex) {
                
                _tasks.push(props.tasks[i - 1])
            } else {

                _tasks.push(props.tasks[i])
            }
        })

        props.onReorder(_tasks)
    }

    const moveDown = (rowIndex: number, targetIndex: number) => {

        const _tasks: any = []

        props.tasks.map((_task: any, i: number) => {

            if (i === rowIndex) {

                _tasks.push(props.tasks[i + 1])
            } else if (i > rowIndex && i < targetIndex) {
                
                _tasks.push(props.tasks[i + 1])
            } else if (i === targetIndex) {

                _tasks.push(props.tasks[rowIndex])
            } else {

                _tasks.push(props.tasks[i])
            }
        })

        props.onReorder(_tasks)
    }

    return (    
        <table className="gantt-table" width={props.table.width} cellSpacing="0" cellPadding="0">
            <thead>
                <tr>
                    {!props.table.reorder ? null : (
                        <th></th>
                    )}
                    {props.table.columns.map((column: any, i: number) => (
                        <th key={i} 
                            className={`${!column.hideOnMobile ? '' : 'hide-on-mobile'}`}
                            style={{ ...column.style, width: column.width}}
                        >
                            {column.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.tasks.map((task: any, i: number) => (
                    <tr key={i}
                        draggable='true'
                        onDragStart={(e) => dragStart(e)}
                        onDragOver={(e) => dragOver(e)}
                        onDragEnd={(e) => dragEnd(e)}
                    >
                        {!props.table.reorder ? null : (
                            <td 
                                width="36" 
                                align="center" 
                                style={{
                                    backgroundImage: `url(${ReorderSVG})`,
                                    backgroundSize: 'cover',
                                    width: 36,
                                }}
                            >
                                &nbsp;&nbsp;&nbsp;
                            </td>
                        )}
                        {props.table.columns.map((column: any, j: number) => (
                            <td key={j} 
                                width={column.width} 
                                className={`${!column.hideOnMobile ? '' : 'hide-on-mobile'}`}
                                style={{ 
                                    ...column.style, 
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                {column.render(task)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default GanttTable
