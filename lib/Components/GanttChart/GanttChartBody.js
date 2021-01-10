import React from 'react';
import GanttItem from '../GanttItem/GanttItem';
import GanttArrow from '../GanttArrow/GanttArrow';
import { getBoxPositionX, getTaskDays, getRelations } from '../../Helpers/GanttChartFunctions';
const GanttChartBody = (props) => {
    const ganttItems = props.ganttItems.map((taskItem, i) => {
        if (taskItem.type === 'task') {
            taskItem.task.posX = getBoxPositionX(props.start, taskItem.task.startsAt, props.styles.dayWidth) + props.styles.rowTaskPaddingLeft;
            taskItem.task.posY = props.styles.headerHeight + (i * props.styles.rowHeight) + props.styles.rowTaskPaddingTop;
            taskItem.task.height = props.styles.rowTaskHeight;
            taskItem.task.width = props.styles.dayWidth * getTaskDays(taskItem.task.startsAt, taskItem.task.endsAt) - (props.styles.rowTaskPaddingLeft * 2);
        }
        return taskItem;
    });
    const relations = getRelations(ganttItems);
    return (React.createElement("g", { id: "gantt-body", className: "gantt-body" },
        React.createElement("g", { id: "gantt-relations" }, relations.map((relation, i) => (React.createElement(GanttArrow, Object.assign({ key: i, color: '#000', width: 1.4 }, relation))))),
        React.createElement("g", { id: "gantt-tasks" }, ganttItems.map((ganttItem, i) => (React.createElement(GanttItem, { key: i, itemData: ganttItem }))))));
};
export default GanttChartBody;
