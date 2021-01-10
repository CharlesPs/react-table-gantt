import React, { useState } from 'react';
const GanttTableGroup = (props) => {
    const [state, setState] = useState({
        isOn: false
    });
    const getStyles = () => {
        const styles = {
            backgroundColor: ((props.index + 1) % 2 === 0) ? props.styles.monthsBgColor : 'white',
            borderBottomWidth: 2,
            borderBottomStyle: 'solid',
            borderBottomColor: ((props.index + 1) % 2 === 0) ? props.styles.monthsBgColor : 'white',
            borderTopWidth: 2,
            borderTopStyle: 'solid',
            borderTopColor: ((props.index + 1) % 2 === 0) ? props.styles.monthsBgColor : 'white',
            cursor: 'pointer',
        };
        if (props.hoverDown && !state.isOn) {
            styles.borderTopColor = 'red';
        }
        if (props.hoverUp && !state.isOn) {
            styles.borderBottomColor = 'red';
        }
        return styles;
    };
    const onDrop = (e, i) => {
        e.stopPropagation();
        e.preventDefault();
        props.onDropIn(i);
    };
    const onDragEnd = (e, i) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('group dragend');
        if (!state.isOn) {
            console.log('dragEnd');
            props.onDragEnd(e, i);
        }
    };
    const onEnterGroup = () => {
        // console.log('enter')
        setState({ ...state, isOn: true });
    };
    const onLeaveGroup = () => {
        // console.log('leave')
        setState({ ...state, isOn: false });
    };
    const getOverStyle = () => {
        const styles = {};
        if (props.dragging >= 0 && props.dragging !== props.index) {
            styles.opacity = 1;
        }
        if (state.isOn) {
            styles.backgroundColor = '#FF000075';
            styles.borderColor = 'red';
            styles.borderWidth = 1;
        }
        return styles;
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "tbody-group-tr", draggable: true, onDragStart: (e) => props.onDragStart(e, props.taskItem.title, props.index), onDragOver: (e) => props.onDragOver(e, props.index), onDragEnd: (e) => onDragEnd(e, props.index), style: {
                display: 'flex',
                height: props.styles.rowHeight,
                ...getStyles()
            } },
            React.createElement("div", { style: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: props.styles.rowHeight,
                    width: props.columns[0].width,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    ...props.columns[0].style
                } }, props.taskItem._id),
            React.createElement("div", { style: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                } },
                React.createElement("div", null,
                    props.taskItem.title,
                    React.createElement("div", { draggable: true, onDragEnter: () => onEnterGroup(), onDragLeave: () => onLeaveGroup(), onDrop: (e) => onDrop(e, props.index), style: {
                            borderWidth: 1,
                            borderStyle: 'dashed',
                            borderColor: '#999',
                            borderRadius: 4,
                            display: 'inline-block',
                            height: 14,
                            marginLeft: 4,
                            opacity: 0,
                            verticalAlign: 'middle',
                            width: 100,
                            ...getOverStyle()
                        } }))))));
};
export default GanttTableGroup;
