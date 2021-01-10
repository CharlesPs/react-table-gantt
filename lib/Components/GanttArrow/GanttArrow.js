import React from 'react';
const GanttArrow = (props) => {
    const getPath = () => {
        let x = props.fromX;
        let y = props.fromY;
        const toX = props.toX - 1;
        const toY = props.toY + 10;
        if (props.type === 'start_to_start') {
            x += 10;
        }
        else if (props.type === 'end_to_start') {
            x -= 10;
        }
        let path = `M ${x},${y}`;
        if (props.fromX === props.toX) {
            y += 5;
            path += ` L ${x},${y}`; // baja 5
            path += ` a 5 5 0 0 1 -5 5`; // dobla a la izquierda en -5,+5
            x -= 5;
            y += 5;
            x = toX - 15;
            path += ` L ${x},${y}`; // izquierda -15 del destino
            path += ` a 5 5 0 0 0 -5 5`; // dobla hacia abajo en -5,+5
            x -= 5;
            y += 5;
            y = toY - 5;
            path += ` L ${x},${y}`;
            path += ` a 5 5 0 0 0 5 5`; // dobla hacia el destino
        }
        else {
            y = toY - 5;
            path += ` L ${x},${y}`;
            path += ` a 5 5 0 0 0 5 5`; // dobla hacia el destino
        }
        path += ` L ${toX},${toY}`; // llega al destino
        // flecha
        path += ` M ${toX - 6},${toY - 6} L ${toX},${toY}`;
        path += ` M ${toX - 6},${toY + 6} L ${toX},${toY}`;
        return path;
    };
    return (React.createElement("path", { d: getPath(), style: {
            stroke: props.color,
            strokeWidth: props.width,
            fill: 'none'
        } }));
};
export default GanttArrow;
