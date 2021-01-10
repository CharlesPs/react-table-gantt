import React from 'react';
import { getMonths, getAllDays } from '../../Helpers/GanttChartFunctions';
import GanttChartGrid from './GanttChartGrid';
import GanttChartHeader from './GanttChartHeader';
import GanttChartBody from './GanttChartBody';
const GanttChart = (props) => {
    const months = getMonths(props.start, props.end);
    const days = getAllDays(props.start, props.end);
    const getItemsAsList = () => {
        const items = [];
        props.ganttItems.map((ganttItem) => {
            items.push(ganttItem);
            if (ganttItem.type === 'group') {
                ganttItem.items.map((groupItem) => {
                    items.push(groupItem);
                    if (groupItem.type === 'group') {
                        groupItem.items.map((gItem) => {
                            items.push(gItem);
                        });
                    }
                });
            }
        });
        return items;
    };
    const ganttItems = getItemsAsList();
    return (React.createElement("div", { style: {
            flex: 1,
            overflowX: 'auto',
        } },
        React.createElement("svg", { height: props.styles.headerHeight + (ganttItems.length * props.styles.rowHeight), width: days.length * props.styles.dayWidth },
            React.createElement(GanttChartGrid, { ganttItems: ganttItems, months: months, days: days, dayWidth: props.styles.dayWidth, styles: props.styles }),
            React.createElement(GanttChartHeader, { months: months, days: days, dayWidth: props.styles.dayWidth, styles: props.styles, locale: props.locale }),
            React.createElement(GanttChartBody, { start: props.start, end: props.end, ganttItems: ganttItems, styles: props.styles }))));
};
export default GanttChart;
