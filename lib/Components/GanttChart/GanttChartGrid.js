import React from 'react';
import { getMonthsPositions, thereIsTodayHighlight, getTodayPosition } from '../../Helpers/GanttChartFunctions';
const GanttChartGrid = (props) => {
    const monthsPositions = getMonthsPositions(props.months, props.dayWidth);
    return (React.createElement("g", { id: "chart-grid" },
        React.createElement("g", { id: "grid-months" }, props.months.map((_month, i) => (React.createElement("rect", { key: i, className: "grid-month", x: monthsPositions[i], y: -1, fill: props.styles.headerBgColor, stroke: "#333", strokeWidth: "1", height: props.styles.headerRowHeight + 2, width: props.dayWidth * _month.days })))),
        React.createElement("g", { id: "grid-days-of-week" }, props.days.map((_day, i) => (React.createElement("rect", { key: i, x: i * props.dayWidth, y: props.styles.headerRowHeight, fill: props.styles.headerBgColor, height: props.styles.headerRowHeight, width: props.dayWidth })))),
        React.createElement("g", { id: "grid-days-of-month" }, props.days.map((_day, i) => (React.createElement("rect", { key: i, x: i * props.dayWidth, y: props.styles.headerRowHeight * 2, fill: props.styles.headerBgColor, height: props.styles.headerRowHeight, width: props.dayWidth })))),
        React.createElement("g", { id: "grid-tasks-rows" }, props.ganttItems.map((item, i) => (React.createElement("rect", { key: i, x: 0, y: (i * props.styles.rowHeight) + props.styles.headerHeight, fill: ((i + 1) % 2 === 0) ? props.styles.bodyBgColorDark : props.styles.bodyBgColorLight, height: props.styles.rowHeight, width: props.dayWidth * props.days.length })))),
        React.createElement("g", { id: "grid-sundays" }, props.days.map((_day, i) => {
            if (_day.dow === '0') {
                return (React.createElement("rect", { key: i, className: "grid-day-sunday", x: i * props.dayWidth, y: 0, fill: props.styles.sundayBgColor, height: (props.ganttItems.length * 38) + 56, width: props.dayWidth }));
            }
        })),
        !thereIsTodayHighlight(props.days[0].dmy, props.days[props.days.length - 1].dmy) ? null : (React.createElement("g", { id: "grid-highlight-today" },
            React.createElement("rect", { className: "grid-day-hightlight", x: getTodayPosition(props.days[0].dmy, props.dayWidth), y: 0, fill: props.styles.todayBgColor, height: (props.ganttItems.length * props.styles.rowHeight) + props.styles.headerHeight, width: props.dayWidth })))));
};
export default GanttChartGrid;
