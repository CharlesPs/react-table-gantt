/*eslint
array-callback-return: "off"
*/
import React from 'react';
import GanttTableRow from './GanttTableRow';
import styles from './GanttTable.styles';
const GanttTable = (props) => {
    const onModifyItem = (ganttItem) => {
        const ganttItems = props.tasks.map((_ganttItem, i) => {
            if (ganttItem.i === i) {
                if (ganttItem.j === undefined) {
                    return ganttItem;
                }
                else {
                    const groupItems = _ganttItem.items.map((groupItem, j) => {
                        if (ganttItem.j === j) {
                            if (ganttItem.k === undefined) {
                                return ganttItem;
                            }
                            else {
                                const gItems = groupItem.items.map((gItem, k) => {
                                    if (ganttItem.k === k) {
                                        return ganttItem;
                                    }
                                    return gItem;
                                });
                                groupItem.items = gItems;
                            }
                        }
                        return groupItem;
                    });
                    _ganttItem.items = groupItems;
                }
            }
            return _ganttItem;
        });
        props.onModifyTasks(ganttItems);
    };
    const getTableItems = () => {
        const tableItems = [];
        props.tasks.map((taskItem, i) => {
            taskItem.i = i;
            taskItem.j = undefined;
            taskItem.k = undefined;
            tableItems.push(taskItem);
            if (taskItem.type === 'group') {
                taskItem.items.map((groupItem, j) => {
                    groupItem.i = i;
                    groupItem.j = j;
                    tableItems.push(groupItem);
                    if (groupItem.type === 'group') {
                        groupItem.items.map((gItem, k) => {
                            gItem.i = i;
                            gItem.j = j;
                            gItem.k = k;
                            tableItems.push(gItem);
                        });
                    }
                });
            }
        });
        return tableItems;
    };
    return (React.createElement("div", { style: {
            borderRight: '1px solid #9c9c99',
            boxShadow: '1px 0px 3px 1px rgba(156, 156, 153, 0.5)',
            maxWidth: props.styles.tableMaxWidth,
            overflow: 'hidden',
            zIndex: 9,
        } },
        React.createElement("div", { style: {
                ...styles.table,
                height: (props.headerHeight + (getTableItems().length * props.rowHeight)),
                marginBottom: 0
                // width: props.table.tableWidth,
            } },
            React.createElement("div", { className: "thead", style: {
                    color: props.styles.tableThTextColor,
                } },
                React.createElement("div", { className: "thead-tr", style: {
                        backgroundColor: props.styles.headerBgColor,
                        display: 'flex',
                    } }, props.table.columns.map((column, i) => (React.createElement("div", { className: "th", key: i, style: {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        fontWeight: 600,
                        backgroundColor: props.styles.headerBgColor,
                        width: column.width,
                        height: props.headerHeight,
                        ...column.style,
                    } }, column.name))))),
            React.createElement("div", { className: "tbody" }, getTableItems().map((ganttItem, i) => (React.createElement(GanttTableRow, { key: i, index: i, onItemClick: props.onItemClick, onModifyItem: (ganttItem) => onModifyItem(ganttItem), ganttItem: ganttItem, columns: props.table.columns, styles: props.styles })))))));
};
export default GanttTable;
