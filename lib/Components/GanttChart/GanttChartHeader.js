import React from 'react';
const GanttChartHeader = (props) => {
    const months_sizes = [42, 56, 46, 34, 40, 40, 34, 52, 74, 60, 80, 74];
    const getMonthsXPositions = () => {
        const xPositions = [];
        let posX = 0;
        props.months.map((_month, i) => {
            const left = ((_month.days * props.dayWidth) / 2) - (months_sizes[_month.m] / 2);
            xPositions.push(posX + (left >= 5 ? left : 5));
            posX += props.dayWidth * _month.days;
        });
        return xPositions;
    };
    const getPaddingLeft = (day_num, dayWidth) => {
        const center = dayWidth / 2;
        if (day_num <= 9) {
            return center - 3;
        }
        return center - 7;
    };
    const monthsXPositions = getMonthsXPositions();
    return (React.createElement("g", { id: "chart-header" },
        props.months.map((month, i) => (React.createElement("text", { key: i, x: monthsXPositions[i], y: props.styles.monthsTopPosition, fill: props.styles.monthsTextColor, style: {
                fontWeight: props.styles.monthsFontWeight,
            } }, props.locale.months[month.position]))),
        props.days.map((_day, i) => (React.createElement("text", { key: i, x: getPaddingLeft(_day.dom, props.dayWidth) + (i * props.dayWidth), y: props.styles.dowTopPosition, fill: props.styles.dowTextColor, style: {
                fontSize: props.styles.domFontSize,
                fontWeight: props.styles.domFontWeight,
            } }, props.locale.daysOfWeek[_day.dow]))),
        props.days.map((_day, i) => (React.createElement("text", { key: i, x: getPaddingLeft(_day.dom, props.dayWidth) + (i * props.dayWidth), y: props.styles.domTopPosition, fill: props.styles.domTextColor, style: {
                fontSize: props.styles.domFontSize
            } }, _day.dom)))));
};
export default GanttChartHeader;
