import React from 'react';
import GanttTask from './GanttTask';
const GanttBody = (props) => {
    return (React.createElement("g", { id: "gantt-body", className: "gantt-body" }, props.tasks.map((task, i) => (React.createElement(GanttTask, { key: i, start: props.start, task: task, posX: i, posY: i, paddingTop: 7 })))));
};
export default GanttBody;
