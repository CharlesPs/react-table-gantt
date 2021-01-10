import React from 'react';
import { fixRelationsDates } from '../../Helpers/GanttChartFunctions';
import GanttTable from '../GanttTable/GanttTable';
import GanttChart from '../GanttChart/GanttChart';
const Gantt = (props) => {
    const ganttItems = props.adjustRelations ? fixRelationsDates(props.tasks) : props.tasks;
    return (React.createElement("div", { style: {
            display: 'flex',
            overflow: 'hidden',
        } },
        React.createElement(GanttTable, { tasks: ganttItems, table: props.table, onItemClick: (task) => props.onItemClick(task), onModifyTasks: (tasks) => props.onModifyTasks(tasks), headerHeight: props.styles.headerHeight, rowHeight: props.styles.rowHeight, styles: props.styles }),
        React.createElement(GanttChart, { start: props.start, end: props.end, ganttItems: ganttItems, styles: props.styles, locale: props.locale })));
};
export default Gantt;
