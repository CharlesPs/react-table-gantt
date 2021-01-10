/*eslint
array-callback-return: "off"
*/

import React, { useEffect, useRef, useState } from 'react'

type Props = {
    index: number,
    onItemClick: any,
    onModifyItem: any,
    ganttItem: any,
    columns: any,
    styles?: any,
}

const GanttTableRow = (props: Props) => {

    let inputRef: any = useRef(null)

    let clicks = 0

    const [ state, setState ] = useState({
        editable: false,
        ganttItem: props.ganttItem
    })

    useEffect(() => {

        setState({
            ...state,
            ganttItem: JSON.parse(JSON.stringify(props.ganttItem))
        })
    }, [ props.ganttItem.type === 'task' ? props.ganttItem.task.title : props.ganttItem.title])

    const checkEnter = (e: any, field: string) => {

        if (e.keyCode === 13 || e.keyCode === 27) {

            if (e.keyCode === 13) {

                updateColumn()
            } else if (e.keyCode === 27) {

                resetColum(field)
            }
        }
    }

    const handleClick = () => {

        if (state.editable) {

            return
        }

        clicks += 1

        setTimeout(() => {

            if (clicks === 1) {

                simpleClick()
            } else if (clicks === 2) {

                doubleClick()
            }

            clicks = 0
        }, 200)
    }

    const simpleClick = () => {

        props.onItemClick(props.ganttItem)
    }

    const doubleClick = () => {

        setState({
            ...state,
            editable: true
        })

        setTimeout(() => {

            if (inputRef !== null && inputRef.current) {

                inputRef.current.focus()
            }

        }, 100)
    }

    const quickEdit = (field: string, newValue: string) => {

        const ganttItem = state.ganttItem

        if (ganttItem.type === 'task') {

            ganttItem.task[field] = newValue
        } else {

            ganttItem[field] = newValue
        }

        setState({
            ...state,
            ganttItem
        })
    }

    const resetColum = (field: string) => {

        const ganttItem = state.ganttItem

        if (ganttItem.type === 'task') {

            ganttItem.task[field] = props.ganttItem.task[field]
        } else {

            ganttItem[field] = props.ganttItem[field]
        }

        setState({
            ...state,
            ganttItem,
            editable: false
        })
    }

    const updateColumn = () => {

        props.onModifyItem(state.ganttItem)

        setState({
            ...state,
            editable: false
        })
    }

    const getStyles = () => {

        const styles: any = {
            backgroundColor: ((props.index + 1) % 2 === 0) ? props.styles.bodyBgColorDark : props.styles.bodyBgColorLight,
            cursor: 'pointer',
            height: props.styles.rowHeight,
        }

        return styles
    }

    const getLeftMargin = (indentable: boolean) => {

        let leftMargin = 0

        if (!indentable) return leftMargin

        if (props.ganttItem.j !== undefined) {

            leftMargin = 14
        }

        if (props.ganttItem.k !== undefined) {

            leftMargin = 28
        }

        return leftMargin
    }

    return (
        <div className="tbody-tr"
            onClick={() => handleClick()}
            style={{
                ...getStyles()
            }}
        >
            <div
                style={{
                    display: 'flex',
                    height: props.styles.rowHeight,
                }}
            >
                {props.columns.map((column: any, j: number) => (
                    <div key={j}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            ...column.style
                        }}
                    >
                        <div
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: column.width - getLeftMargin(column.indentable),
                                marginLeft: getLeftMargin(column.indentable),
                            }}
                        >
                            {column.quickEditable && state.editable ? (
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={column.render(state.ganttItem)}
                                    onChange={(e: any) => quickEdit(column.quickEditableField, e.currentTarget.value)}
                                    onKeyUp={(e: any) => checkEnter(e, column.quickEditableField)}
                                    onBlur={() => updateColumn()}
                                    style={{
                                        borderColor: 'transparent',
                                        outline: 'none',
                                        borderStyle: 'solid',
                                        borderWidth: 1,
                                        borderBottomColor: '#999',
                                        width: '100%',
                                    }}
                                />
                            ) : (
                                <div style={{
                                    paddingLeft: column.indentable ? 3 : 0
                                }}>
                                    {column.render(props.ganttItem)}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GanttTableRow
