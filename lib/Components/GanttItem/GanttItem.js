import React, { useRef } from 'react';
const GanttItem = (props) => {
    const boxEl = useRef(null);
    if (props.itemData.type === 'group')
        return null;
    return (React.createElement("g", null,
        React.createElement("g", null,
            React.createElement("rect", { ref: boxEl, rx: 5, ry: 5, x: props.itemData.task.posX, y: props.itemData.task.posY, fill: props.itemData.task.bgColor, stroke: props.itemData.task.bgColor, strokeWidth: 0, height: props.itemData.task.height, width: props.itemData.task.width }))));
};
export default GanttItem;
