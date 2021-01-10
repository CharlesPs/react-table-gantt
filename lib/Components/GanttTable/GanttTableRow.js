/*eslint
array-callback-return: "off"
*/
import React, { useEffect, useRef, useState } from 'react';
const GanttTableRow = (props) => {
    let inputRef = useRef(null);
    let clicks = 0;
    const [state, setState] = useState({
        editable: false,
        ganttItem: props.ganttItem
    });
    useEffect(() => {
        setState({
            ...state,
            ganttItem: JSON.parse(JSON.stringify(props.ganttItem))
        });
    }, [props.ganttItem.type === 'task' ? props.ganttItem.task.title : props.ganttItem.title]);
    const checkEnter = (e, field) => {
        if (e.keyCode === 13 || e.keyCode === 27) {
            if (e.keyCode === 13) {
                updateColumn();
            }
            else if (e.keyCode === 27) {
                resetColum(field);
            }
        }
    };
    const handleClick = () => {
        if (state.editable) {
            return;
        }
        clicks += 1;
        setTimeout(() => {
            if (clicks === 1) {
                simpleClick();
            }
            else if (clicks === 2) {
                doubleClick();
            }
            clicks = 0;
        }, 200);
    };
    const simpleClick = () => {
        props.onItemClick(props.ganttItem);
    };
    const doubleClick = () => {
        setState({
            ...state,
            editable: true
        });
        setTimeout(() => {
            if (inputRef !== null && inputRef.current) {
                inputRef.current.focus();
            }
        }, 100);
    };
    const quickEdit = (field, newValue) => {
        const ganttItem = state.ganttItem;
        if (ganttItem.type === 'task') {
            ganttItem.task[field] = newValue;
        }
        else {
            ganttItem[field] = newValue;
        }
        setState({
            ...state,
            ganttItem
        });
    };
    const resetColum = (field) => {
        const ganttItem = state.ganttItem;
        if (ganttItem.type === 'task') {
            ganttItem.task[field] = props.ganttItem.task[field];
        }
        else {
            ganttItem[field] = props.ganttItem[field];
        }
        setState({
            ...state,
            ganttItem,
            editable: false
        });
    };
    const updateColumn = () => {
        props.onModifyItem(state.ganttItem);
        setState({
            ...state,
            editable: false
        });
    };
    const getStyles = () => {
        const styles = {
            backgroundColor: ((props.index + 1) % 2 === 0) ? props.styles.bodyBgColorDark : props.styles.bodyBgColorLight,
            cursor: 'pointer',
            height: props.styles.rowHeight,
        };
        return styles;
    };
    const getLeftMargin = (indentable) => {
        let leftMargin = 0;
        if (!indentable)
            return leftMargin;
        if (props.ganttItem.j !== undefined) {
            leftMargin = 14;
        }
        if (props.ganttItem.k !== undefined) {
            leftMargin = 28;
        }
        return leftMargin;
    };
    return (React.createElement("div", { className: "tbody-tr", onClick: () => handleClick(), style: {
            ...getStyles()
        } },
        React.createElement("div", { style: {
                display: 'flex',
                height: props.styles.rowHeight,
            } }, props.columns.map((column, j) => (React.createElement("div", { key: j, style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                ...column.style
            } },
            React.createElement("div", { style: {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: column.width - getLeftMargin(column.indentable),
                    marginLeft: getLeftMargin(column.indentable),
                } }, column.quickEditable && state.editable ? (React.createElement("input", { ref: inputRef, type: "text", value: column.render(state.ganttItem), onChange: (e) => quickEdit(column.quickEditableField, e.currentTarget.value), onKeyUp: (e) => checkEnter(e, column.quickEditableField), onBlur: () => updateColumn(), style: {
                    borderColor: 'transparent',
                    outline: 'none',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderBottomColor: '#999',
                    width: '100%',
                } })) : (React.createElement("div", { style: {
                    paddingLeft: column.indentable ? 3 : 0
                } }, column.render(props.ganttItem))))))))));
};
export default GanttTableRow;
