/*eslint "array-callback-return": "off" */
import React from 'react';
import ReorderSVG from './reorder.svg';
const GanttTable = (props) => {
    let row;
    let tableRows = [];
    let rowIndex;
    let targetIndex;
    const dragStart = (e) => {
        row = e.target;
    };
    const dragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        tableRows = Array.from(e.target.parentNode.parentNode.children);
        targetIndex = tableRows.indexOf(e.target.parentNode);
    };
    const dragEnd = (e) => {
        rowIndex = tableRows.indexOf(row);
        if (rowIndex !== targetIndex) {
            if (targetIndex > rowIndex) {
                moveDown(rowIndex, targetIndex);
            }
            else {
                moveUp(rowIndex, targetIndex);
            }
        }
    };
    const moveUp = (rowIndex, targetIndex) => {
        const _tasks = [];
        props.tasks.map((_task, i) => {
            if (i === targetIndex) {
                _tasks.push(props.tasks[rowIndex]);
            }
            else if (i > targetIndex && i <= rowIndex) {
                _tasks.push(props.tasks[i - 1]);
            }
            else {
                _tasks.push(props.tasks[i]);
            }
        });
        props.onReorder(_tasks);
    };
    const moveDown = (rowIndex, targetIndex) => {
        const _tasks = [];
        props.tasks.map((_task, i) => {
            if (i === rowIndex) {
                _tasks.push(props.tasks[i + 1]);
            }
            else if (i > rowIndex && i < targetIndex) {
                _tasks.push(props.tasks[i + 1]);
            }
            else if (i === targetIndex) {
                _tasks.push(props.tasks[rowIndex]);
            }
            else {
                _tasks.push(props.tasks[i]);
            }
        });
        props.onReorder(_tasks);
    };
    return (React.createElement("table", { className: "gantt-table", width: props.table.width, cellSpacing: "0", cellPadding: "0" },
        React.createElement("thead", null,
            React.createElement("tr", null,
                !props.table.reorder ? null : (React.createElement("th", null)),
                props.table.columns.map((column, i) => (React.createElement("th", { key: i, className: `${!column.hideOnMobile ? '' : 'hide-on-mobile'}`, style: { ...column.style, width: column.width } }, column.title))))),
        React.createElement("tbody", null, props.tasks.map((task, i) => (React.createElement("tr", { key: i, draggable: 'true', onDragStart: (e) => dragStart(e), onDragOver: (e) => dragOver(e), onDragEnd: (e) => dragEnd(e) },
            !props.table.reorder ? null : (React.createElement("td", { width: "36", align: "center", style: {
                    backgroundImage: `url(${ReorderSVG})`,
                    backgroundSize: 'cover',
                    width: 36,
                } }, "\u00A0\u00A0\u00A0")),
            props.table.columns.map((column, j) => (React.createElement("td", { key: j, width: column.width, className: `${!column.hideOnMobile ? '' : 'hide-on-mobile'}`, style: {
                    ...column.style,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                } }, column.render(task))))))))));
};
export default GanttTable;
