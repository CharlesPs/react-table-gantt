/*eslint "@typescript-eslint/no-unused-vars": "off" */
import React, { useEffect, useRef, useState } from 'react';
import { getYesterdayPosition } from './GanttTaskHelper';
import GanttTable from './GanttTable';
import GanttGrid from './GanttGrid';
import GanttHeader from './GanttHeader';
import GanttBody from './GanttBody';
import './styles.css';
import moment from 'moment';
moment.locale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Setiembre_Octubre_Noviembre_Diciembre'.split('_')
});
const Gantt = (props) => {
    const container = useRef(null);
    const num_days_top = 32;
    const cell_days_top = 48;
    const [scrolled, setScrolled] = useState(false);
    const getMonths = () => {
        const months = [];
        let day = moment(props.start);
        while (day.isSameOrBefore(props.end)) {
            const month = {
                m: day.month(),
                code: day.format('YYYY-MM'),
                name: day.format('MMMM')
            };
            const filter = months.filter((_month) => _month.code === month.code);
            if (!months.filter((_month) => _month.code === month.code).length) {
                month.days = 1;
                months.push(month);
            }
            else {
                filter[0].days += 1;
            }
            day.add(1, 'day');
        }
        return months;
    };
    const getDays = () => {
        const days = [];
        let day = moment(props.start);
        while (day.isSameOrBefore(props.end)) {
            days.push({
                d: day.date()
            });
            day.add(1, 'day');
        }
        return days;
    };
    const scrollToday = () => {
        if (scrolled)
            return;
        setTimeout(() => {
            const yesterdayPosition = getYesterdayPosition(props.start);
            container.current.scrollLeft = yesterdayPosition;
            setScrolled(true);
        }, 100);
    };
    useEffect(scrollToday, [props.tasks]);
    return (React.createElement("div", { style: {
            display: 'flex',
        } },
        React.createElement(GanttTable, { table: props.table, tasks: props.tasks, onReorder: (tasks) => props.onReorder(tasks) }),
        React.createElement("div", { className: "gantt", ref: container },
            React.createElement("svg", { height: 38 * props.tasks.length + 56, width: getDays().length * props.day_width },
                React.createElement(GanttGrid, { start: props.start, end: props.end, days: getDays(), day_top: num_days_top, day_width: props.day_width, months: getMonths(), tasks: props.tasks }),
                React.createElement(GanttHeader, { days: getDays(), day_top: cell_days_top, day_width: props.day_width, months: getMonths() }),
                React.createElement(GanttBody, { start: props.start, days: getDays(), tasks: props.tasks })))));
};
export default Gantt;
