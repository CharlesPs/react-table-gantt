/*eslint
array-callback-return: "off",
import/no-anonymous-default-export: "off"
*/
import moment from 'moment';
export const getMonths = (start, end) => {
    const months = [];
    let day = moment(start);
    while (day.isSameOrBefore(end)) {
        const month = {
            m: day.month(),
            code: day.format('YYYY-MM'),
            position: parseInt(day.format('M'), 10) - 1
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
export const getAllDays = (start, end) => {
    const days = [];
    let day = moment(start);
    while (day.isSameOrBefore(end)) {
        days.push({
            dmy: day.format('YYYY-MM-DD'),
            dom: day.date(),
            dow: day.format('d'),
        });
        day.add(1, 'day');
    }
    return days;
};
export const getMonthsPositions = (months, dayWidth) => {
    const xPositions = [];
    let x = 0;
    months.map((_month, i) => {
        xPositions.push(x);
        x += dayWidth * _month.days;
    });
    return xPositions;
};
export const thereIsTodayHighlight = (start, end) => {
    const today = moment();
    return (today.isSameOrAfter(start) && today.isSameOrBefore(end));
};
export const getTodayPosition = (start, dayWidth) => {
    const today = moment();
    let days = 0;
    while (today.isAfter(start)) {
        days += 1;
        today.subtract(1, 'day');
    }
    return (days - 1) * dayWidth;
};
export const getBoxPositionX = (ganttStart, taskStart, dayWidth) => {
    let day = moment(taskStart);
    let posX = 0;
    if (day.isBefore(ganttStart)) {
        while (day.isBefore(ganttStart)) {
            posX -= 1;
            day.add(1, 'day');
        }
    }
    else if (day.isAfter(ganttStart)) {
        while (day.isAfter(ganttStart)) {
            posX += 1;
            day.subtract(1, 'day');
        }
    }
    return posX * dayWidth;
};
export const getTaskDays = (start, end) => {
    let days = 0;
    let day = moment(start);
    while (day.isSameOrBefore(end)) {
        days += 1;
        day.add(1, 'day');
    }
    return days;
};
export const moveTask = (task, to) => {
    const diferencia = moment(to).diff(moment(task.startsAt), 'days');
    if (diferencia > 0) {
        task.startsAt = moment(task.startsAt).add(diferencia, 'days').format('YYYY-MM-DD');
        task.endsAt = moment(task.endsAt).add(diferencia, 'days').format('YYYY-MM-DD');
    }
    else if (diferencia < 0) {
        task.startsAt = moment(task.startsAt).add(diferencia, 'days').format('YYYY-MM-DD');
        task.endsAt = moment(task.endsAt).add(diferencia, 'days').format('YYYY-MM-DD');
    }
};
export const fixRelationsDates = (tasksRows) => {
    const obj_tasks = {};
    tasksRows.map((taskItem, i) => {
        if (taskItem.type === 'task') {
            obj_tasks[taskItem.task._id] = taskItem.task;
        }
    });
    Object.values(obj_tasks).map((task, i) => {
        if (!task.relations) {
            return;
        }
        task.relations.map((relation, j) => {
            const _task = obj_tasks[relation.task_id];
            if (!_task) {
                return;
            }
            if (relation.type === 'start_to_start') {
                moveTask(_task, task.startsAt);
            }
            else if (relation.type === 'end_to_start') {
                moveTask(_task, moment(task.endsAt).add(1, 'day').format('YYYY-MM-DD'));
            }
        });
    });
    return tasksRows;
};
export const getRelations = (tasksItems) => {
    const relations = [];
    const obj_tasks = {};
    tasksItems.map((taskItem, i) => {
        if (taskItem.type === 'task') {
            obj_tasks[taskItem.task._id] = taskItem.task;
        }
    });
    Object.values(obj_tasks).map((task, i) => {
        if (!task.relations) {
            return;
        }
        task.relations.map((relation, j) => {
            const _task = obj_tasks[relation.task_id];
            if (!_task) {
                return;
            }
            if (relation.type === 'start_to_start') {
                const _rel = {
                    fromX: task.posX,
                    fromY: task.posY + task.height,
                    toX: _task.posX,
                    toY: _task.posY,
                    type: relation.type,
                };
                relations.push(_rel);
            }
            else {
                const _rel = {
                    fromX: task.posX + task.width,
                    fromY: task.posY + task.height,
                    toX: _task.posX,
                    toY: _task.posY,
                    type: relation.type,
                };
                relations.push(_rel);
            }
        });
    });
    return relations;
};
export default {
    getMonths,
    getAllDays,
    getMonthsPositions,
    thereIsTodayHighlight,
    getTodayPosition,
    getBoxPositionX,
    getTaskDays,
    fixRelationsDates,
    getRelations,
};
