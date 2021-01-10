/*eslint
array-callback-return: "off"
*/

import React from 'react'

import GanttTableRow from './GanttTableRow'

import styles from './GanttTable.styles'

type Props = {
    tasks: any,
    table: any,
    onItemClick?: any,
    onModifyTasks?: any,
    headerHeight: any,
    rowHeight: any,
    styles: any,
}

const GanttTable = (props: Props) => {

    const onModifyItem = (ganttItem: any) => {

        const ganttItems = props.tasks.map((_ganttItem: any, i: number) => {

            if (ganttItem.i === i) {

                if (ganttItem.j === undefined) {

                    return ganttItem
                } else {

                    const groupItems = _ganttItem.items.map((groupItem: any, j: number) => {

                        if (ganttItem.j === j) {

                            if (ganttItem.k === undefined) {

                                return ganttItem
                            } else {

                                const gItems = groupItem.items.map((gItem: any, k: number) => {

                                    if (ganttItem.k === k) {

                                        return ganttItem
                                    }

                                    return gItem
                                })

                                groupItem.items = gItems
                            }
                        }

                        return groupItem
                    })

                    _ganttItem.items = groupItems
                }
            }

            return _ganttItem
        })

        props.onModifyTasks(ganttItems)
    }

    const getTableItems = () => {

        const tableItems: any = []

        props.tasks.map((taskItem: any, i: number) => {

            taskItem.i = i
            taskItem.j = undefined
            taskItem.k = undefined

            tableItems.push(taskItem)

            if (taskItem.type === 'group') {

                taskItem.items.map((groupItem: any, j: number) => {

                    groupItem.i = i
                    groupItem.j = j

                    tableItems.push(groupItem)

                    if (groupItem.type === 'group') {

                        groupItem.items.map((gItem: any, k: number) => {

                            gItem.i = i
                            gItem.j = j
                            gItem.k = k

                            tableItems.push(gItem)
                        })
                    }
                })
            }
        })

        return tableItems
    }

    return (
        <div
            style={{
                borderRight: '1px solid #9c9c99',
                boxShadow: '1px 0px 3px 1px rgba(156, 156, 153, 0.5)',
                maxWidth: props.styles.tableMaxWidth,
                overflow: 'hidden',
                zIndex: 9,
            }}
        >
            <div
                style={{
                    ...styles.table,
                    height: (props.headerHeight + (getTableItems().length * props.rowHeight)),
                    marginBottom: 0
                    // width: props.table.tableWidth,
                }}
            >
                <div className="thead"
                    style={{
                        color: props.styles.tableThTextColor,
                    }}
                >
                    <div className="thead-tr"
                        style={{
                            backgroundColor: props.styles.headerBgColor,
                            display: 'flex',
                        }}
                    >
                        {props.table.columns.map((column: any, i: number) => (
                            <div className="th" key={i}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    fontWeight: 600,
                                    backgroundColor: props.styles.headerBgColor,
                                    width: column.width,
                                    height: props.headerHeight,
                                    ...column.style,
                                }}
                            >
                                {column.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="tbody">
                    {getTableItems().map((ganttItem: any, i: number) => (
                        <GanttTableRow key={i} index={i}
                            onItemClick={props.onItemClick}
                            onModifyItem={(ganttItem: any) => onModifyItem(ganttItem)}
                            ganttItem={ganttItem}
                            columns={props.table.columns}
                            styles={props.styles}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GanttTable
