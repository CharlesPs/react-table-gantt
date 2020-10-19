/*eslint array-callback-return: "off"*/
import React from 'react';
import { thereIsTodayHighlight, getTodayPosition } from './GanttTaskHelper';
const GanttGrid = (props) => {
    const getXPositions = () => {
        const xPositions = [];
        let x = 0;
        props.months.map((_month, i) => {
            xPositions.push(x);
            x += props.day_width * _month.days;
        });
        return xPositions;
    };
    const xPositions = getXPositions();
    return (React.createElement("g", { id: "grid", className: "gantt-grid" },
        React.createElement("g", null, props.months.map((_month, i) => (React.createElement("rect", { key: i, className: "grid-month", x: xPositions[i], y: 0, width: props.day_width * _month.days })))),
        React.createElement("g", null, props.days.map((_day, i) => (React.createElement("rect", { key: i, className: "grid-day", x: i * props.day_width, y: props.day_top, width: props.day_width })))),
        React.createElement("g", null, props.tasks.map((_task, i) => (React.createElement("rect", { key: i, className: "grid-row", x: 0, y: (i * 38) + 56 })))),
        thereIsTodayHighlight(props.start, props.end),
        React.createElement("g", null,
            React.createElement("rect", { className: "grid-day-hightlight", x: getTodayPosition(props.start), y: 0, height: (props.tasks.length * 38) + 56, width: props.day_width }))));
};
export default GanttGrid;
