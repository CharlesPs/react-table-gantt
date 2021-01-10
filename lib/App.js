/*eslint array-callback-return: "off" */
import React, { useState } from 'react';
import Gantt from './Components/Gantt/Gantt';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
const App = () => {
    const GANTT_ITEMS = 'ganttItems';
    const defaultItem = {
        _id: '',
        type: '',
        task: {
            _id: '',
            group_id: '',
            title: '',
            startsAt: '',
            endsAt: '',
            status: '',
            bgColor: '',
        }
    };
    const [state, setState] = useState({
        showCreateTaskModal: false,
        showCreateGroupModal: false,
        taskValidated: false,
        groupValidated: false,
        start: '2021-01-01',
        end: '2021-02-01',
        editingTask: {},
        ganttItems: JSON.parse(localStorage.getItem(GANTT_ITEMS) || '[]'),
        itemSelected: defaultItem,
    });
    const getGroupsForTasksModal = () => {
        const groups = [];
        state.ganttItems.map((ganttItem) => {
            if (ganttItem.type === 'group') {
                const group = {
                    _id: ganttItem._id,
                    title: ganttItem.title,
                };
                groups.push(group);
                ganttItem.items.map((groupItem) => {
                    if (groupItem.type === 'group') {
                        groups.push({
                            _id: groupItem._id,
                            title: ` - ${groupItem.title}`
                        });
                    }
                });
            }
        });
        return groups;
    };
    const getGroupsForGroupsModal = () => {
        const groups = [];
        state.ganttItems.map((ganttItem) => {
            if (ganttItem.type === 'group') {
                const group = {
                    _id: ganttItem._id,
                    title: ganttItem.title,
                };
                groups.push(group);
                // ganttItem.items.map((groupItem: any) => {
                //     if (groupItem.type === 'group') {
                //         groups.push({
                //             _id: groupItem._id,
                //             title: groupItem.title
                //         })
                //     }
                // })
            }
        });
        return groups;
    };
    const getNewTask = (data) => {
        const taskRow = {
            _id: uuidv4(),
            type: 'task',
            task: {
                _id: uuidv4(),
                ...data
            }
        };
        return taskRow;
    };
    const getNewGroup = (data) => {
        const groupRow = {
            _id: uuidv4(),
            type: 'group',
            title: data.title,
            items: []
        };
        return groupRow;
    };
    const handleTaskFormSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const newState = {
            ...state,
            taskValidated: true
        };
        if (form.checkValidity()) {
            const data = {};
            for (let i = 0; i < form.length; i += 1) {
                if (form[i].name.length)
                    data[form[i].name] = form[i].value;
            }
            const task = getNewTask(data);
            if (data.group_id) {
                putTaskIntoGroup(data.group_id, task);
            }
            else {
                newState.ganttItems.push(task);
            }
            newState.taskValidated = false;
            newState.showCreateTaskModal = false;
        }
        localStorage.setItem(GANTT_ITEMS, JSON.stringify(newState.ganttItems));
        setState(newState);
    };
    const handleGroupFormSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const newState = {
            ...state,
            groupValidated: true
        };
        if (form.checkValidity()) {
            const data = {};
            for (let i = 0; i < form.length; i += 1) {
                if (form[i].name.length)
                    data[form[i].name] = form[i].value;
            }
            const group = getNewGroup(data);
            if (data.group_id) {
                putGroupIntoGroup(data.group_id, group);
            }
            else {
                newState.ganttItems.push(group);
            }
            newState.groupValidated = false;
            newState.showCreateGroupModal = false;
        }
        localStorage.setItem(GANTT_ITEMS, JSON.stringify(newState.ganttItems));
        setState(newState);
    };
    const putTaskIntoGroup = (group_id, task) => {
        const ganttItems = state.ganttItems;
        ganttItems.map((ganttItem) => {
            if (ganttItem.type === 'group') {
                if (ganttItem._id === group_id) {
                    ganttItem.items.push(task);
                }
                else {
                    ganttItem.items.map((groupItem) => {
                        if (groupItem.type === 'group') {
                            if (groupItem._id === group_id) {
                                groupItem.items.push(task);
                            }
                        }
                    });
                }
            }
        });
        setState({
            ...state,
            ganttItems
        });
    };
    const putGroupIntoGroup = (group_id, group) => {
        const ganttItems = state.ganttItems;
        ganttItems.map((ganttItem) => {
            if (ganttItem._id === group_id) {
                ganttItem.items.push(group);
            }
            else if (ganttItem.type === 'group') {
                ganttItem.items.map((groupItem) => {
                    if (groupItem._id === group_id) {
                        groupItem.items.push(group);
                    }
                });
            }
        });
        setState({
            ...state,
            ganttItems
        });
    };
    const selectGanttItem = (ganttItem) => {
        if (ganttItem.type === 'task') {
            setState({
                ...state,
                itemSelected: JSON.parse(JSON.stringify(ganttItem))
            });
        }
    };
    const onModifyItems = (ganttItems) => {
        // console.log({ ganttItems })
        localStorage.setItem(GANTT_ITEMS, JSON.stringify(ganttItems));
        setState({
            ...state,
            ganttItems
        });
    };
    const handleChangeItem = (field, value) => {
        const itemSelected = state.itemSelected;
        const task = itemSelected.task;
        switch (field) {
            case 'title':
                task.title = value;
                break;
            case 'startsAt':
                task.startsAt = value;
                break;
            case 'endsAt':
                task.endsAt = value;
                break;
            case 'group_id':
                task.group_id = value;
                break;
            case 'status':
                task.status = value;
                break;
            case 'bgColor':
                task.bgColor = value;
                break;
        }
        itemSelected.task = task;
        setState({
            ...state,
            itemSelected
        });
    };
    const getTaskItemById = (_id) => {
        let item = defaultItem;
        state.ganttItems.map((ganttItem) => {
            if (ganttItem._id === _id) {
                item = ganttItem;
            }
            else if (ganttItem.type === 'group') {
                ganttItem.items.map((groupItem) => {
                    if (groupItem._id === _id) {
                        item = groupItem;
                    }
                    else if (groupItem.type === 'group') {
                        groupItem.items.map((gItem) => {
                            if (gItem._id === _id) {
                                item = gItem;
                            }
                        });
                    }
                });
            }
        });
        return item;
    };
    const moveItem = (ganttItem, from) => {
        ganttItem.i = undefined;
        ganttItem.j = undefined;
        ganttItem.k = undefined;
        const to = ganttItem.task.group_id;
        const ganttItems = [];
        state.ganttItems.map((itemLevel0) => {
            if (itemLevel0.type === 'task' && itemLevel0._id !== ganttItem._id) {
                itemLevel0.i = undefined;
                itemLevel0.j = undefined;
                itemLevel0.k = undefined;
                ganttItems.push(itemLevel0);
            }
            else if (itemLevel0.type === 'group') {
                const groupItems0 = [];
                itemLevel0.items.map((itemLevel1) => {
                    if (itemLevel1.type === 'task' && itemLevel1._id !== ganttItem._id) {
                        itemLevel1.i = undefined;
                        itemLevel1.j = undefined;
                        itemLevel1.k = undefined;
                        groupItems0.push(itemLevel1);
                    }
                    else if (itemLevel1.type === 'group') {
                        const groupItems1 = [];
                        itemLevel1.items.map((itemLevel2) => {
                            if (itemLevel2.type === 'task' && itemLevel2._id !== ganttItem._id) {
                                itemLevel2.i = undefined;
                                itemLevel2.j = undefined;
                                itemLevel2.k = undefined;
                                groupItems1.push(itemLevel2);
                            }
                        });
                        if (to === itemLevel1._id) {
                            groupItems1.push(ganttItem);
                        }
                        itemLevel1.items = groupItems1;
                        groupItems0.push(itemLevel1);
                    }
                });
                if (to === itemLevel0._id) {
                    groupItems0.push(ganttItem);
                }
                itemLevel0.items = groupItems0;
                ganttItems.push(itemLevel0);
            }
        });
        if (to === '') {
            ganttItems.push(ganttItem);
        }
        onModifyItems(ganttItems);
        setState({
            ...state,
            ganttItems,
            itemSelected: defaultItem
        });
    };
    const updateItem = (gItem) => {
        const items = state.ganttItems.map((ganttItem) => {
            if (ganttItem._id === gItem._id) {
                return gItem;
            }
            else if (ganttItem.type === 'group') {
                const groupItems = ganttItem.items.map((groupItem) => {
                    if (groupItem._id === gItem._id) {
                        return gItem;
                    }
                    else if (groupItem.type === 'group') {
                        const items = groupItem.items.map((item) => {
                            if (item._id === gItem._id) {
                                return gItem;
                            }
                            return item;
                        });
                        groupItem.items = items;
                    }
                    return groupItem;
                });
                ganttItem.items = groupItems;
            }
            return ganttItem;
        });
        onModifyItems(items);
        setState({
            ...state,
            ganttItems: items,
            itemSelected: defaultItem
        });
    };
    const saveItem = () => {
        const group_id = state.itemSelected.task.group_id;
        const item = getTaskItemById(state.itemSelected._id);
        if (!item) {
            return;
        }
        if (group_id !== item.task.group_id) {
            moveItem(state.itemSelected, item.task.group_id);
        }
        else {
            updateItem(state.itemSelected);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "container-fluid pt-2" },
            React.createElement("div", { className: "btn-toolbar mb-2" },
                React.createElement("div", { className: "btn-group" },
                    React.createElement("button", { className: "btn btn-sm btn-secondary", onClick: () => setState({ ...state, showCreateTaskModal: true }) }, "Nueva Tarea")),
                React.createElement("div", { className: "btn-group" },
                    React.createElement("button", { className: "btn btn-sm btn-secondary", onClick: () => setState({ ...state, showCreateGroupModal: true }) }, "Nuevo Grupo"))),
            React.createElement("div", null,
                React.createElement(Gantt, { start: state.start, end: state.end, tasks: state.ganttItems, adjustRelations: false, onItemClick: (ganttItem) => selectGanttItem(ganttItem), onModifyTasks: (newItems) => onModifyItems(newItems), styles: {
                        dayWidth: 80,
                        rowHeight: 38,
                        rowTaskPaddingTop: 9,
                        rowTaskPaddingLeft: 7,
                        rowTaskPaddingRight: 7,
                        rowTaskHeight: 20,
                        headerBgColor: '#DBDBD7',
                        headerHeight: 60,
                        headerRowHeight: 20,
                        bodyBgColorLight: 'white',
                        bodyBgColorDark: '#F4F1F1',
                        monthsTextColor: '#47404f',
                        monthsFontWeight: 600,
                        monthsTopPosition: 16,
                        dowTopPosition: 35,
                        dowTextColor: '#47404f',
                        dowFontSize: 12,
                        dowFontWight: 600,
                        domTopPosition: 54,
                        domTextColor: '#47404f',
                        domFontSize: 12,
                        domFontWeight: 600,
                        todayBgColor: '#fcf8e3',
                        sundayBgColor: '#d4d4d0c4',
                        tableMaxWidth: '50%',
                        tableThTextColor: '#47404f',
                    }, table: {
                        styles: {
                            tableWidth: '50%',
                            // headerBgColor: '#DBDBD7',
                            // headerTextColor: '#47404f',
                            cellBorderWidth: 1,
                            cellBorderStyle: 'solid',
                            cellBorderColor: '#FFF',
                            rowHeight: 32,
                        },
                        columns: [
                            {
                                name: 'Pos',
                                render: (data) => {
                                    return `${data.i + 1}.${data.j + 1 || 0}.${data.k + 1 || 0}`;
                                },
                                width: 50,
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            {
                                name: 'Título',
                                quickEditable: true,
                                quickEditableField: 'title',
                                indentable: true,
                                width: 250,
                                style: {
                                    textAlign: 'left'
                                },
                                render: (data) => data.type === 'group' ? data.title : data.task.title,
                            },
                            {
                                name: 'Inicia',
                                render: (data) => data.type === 'group' ? data.startsAt : data.task.startsAt,
                                width: 90,
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            {
                                name: 'Termina',
                                render: (data) => data.type === 'group' ? data.endsAt : data.task.endsAt,
                                width: 90,
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            {
                                name: 'Estado',
                                render: (data) => data.type === 'group' ? '' : data.task.status,
                                width: 100,
                                style: {
                                    textAlign: 'center'
                                }
                            },
                        ],
                    }, locale: {
                        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Setiembre_Octubre_Noviembre_Diciembre'.split('_'),
                        daysOfWeek: 'Dom_Lun_Mar_Mie_Jue_Vie_Sab'.split('_'),
                        firstDayOfWeek: 1,
                    } }))),
        React.createElement(Modal, { size: "lg", show: state.showCreateTaskModal, onHide: () => setState({ ...state, showCreateTaskModal: false }), backdrop: "static", keyboard: false },
            React.createElement(Modal.Header, { closeButton: true },
                React.createElement(Modal.Title, null, "Crear Tarea")),
            React.createElement(Modal.Body, null,
                React.createElement(Form, { noValidate: true, validated: state.taskValidated, onSubmit: handleTaskFormSubmit },
                    React.createElement(Form.Group, { as: Row, controlId: "formFieldGroup" },
                        React.createElement(Form.Label, { column: true, sm: 2 }, "Grupo"),
                        React.createElement(Col, { sm: 10 },
                            React.createElement(Form.Control, { as: "select", name: "group_id" },
                                React.createElement("option", { value: "" }, "Seleccione"),
                                getGroupsForTasksModal().map((group, i) => (React.createElement("option", { key: i, value: group._id }, group.title)))),
                            React.createElement(Form.Control.Feedback, { type: "invalid" }, "Campo requerido"))),
                    React.createElement(Form.Group, { as: Row, controlId: "formFieldTitle" },
                        React.createElement(Form.Label, { column: true, sm: 2 }, "T\u00EDtulo"),
                        React.createElement(Col, { sm: 10 },
                            React.createElement(Form.Control, { type: "text", name: "title", placeholder: "T\u00EDtulo", required: true }),
                            React.createElement(Form.Control.Feedback, { type: "invalid" }, "Campo requerido"))),
                    React.createElement(Row, null,
                        React.createElement(Col, { sm: 6 },
                            React.createElement(Form.Group, { as: Row, controlId: "formFieldStartsAt" },
                                React.createElement(Form.Label, { column: true, sm: 4 }, "Inicia"),
                                React.createElement(Col, { sm: 8 },
                                    React.createElement(Form.Control, { type: "date", name: "startsAt", placeholder: "", required: true }),
                                    React.createElement(Form.Control.Feedback, { type: "invalid" }, "Campo requerido")))),
                        React.createElement(Col, { sm: 6 },
                            React.createElement(Form.Group, { as: Row, controlId: "formFieldEndsAt" },
                                React.createElement(Form.Label, { column: true, sm: 4 }, "Termina"),
                                React.createElement(Col, { sm: 8 },
                                    React.createElement(Form.Control, { type: "date", name: "endsAt", placeholder: "", required: true }),
                                    React.createElement(Form.Control.Feedback, { type: "invalid" }, "Campo requerido"))))),
                    React.createElement(Row, null,
                        React.createElement(Col, { sm: 6 },
                            React.createElement(Form.Group, { as: Row, controlId: "formFieldStatus" },
                                React.createElement(Form.Label, { column: true, sm: 4 }, "Status"),
                                React.createElement(Col, { sm: 8 },
                                    React.createElement(Form.Control, { as: "select", name: "status", required: true },
                                        React.createElement("option", { value: "" }, "Seleccione"),
                                        React.createElement("option", { value: "activa" }, "Activa"),
                                        React.createElement("option", { value: "pendiente" }, "Pendiente")),
                                    React.createElement(Form.Control.Feedback, { type: "invalid" }, "Campo requerido")))),
                        React.createElement(Col, { sm: 6 },
                            React.createElement(Form.Group, { as: Row, controlId: "formFieldColor" },
                                React.createElement(Form.Label, { column: true, sm: 4 }, "Color"),
                                React.createElement(Col, { sm: 8 },
                                    React.createElement(Form.Control, { as: "select", name: "bgColor", required: true },
                                        React.createElement("option", { value: "" }, "Seleccione"),
                                        React.createElement("option", { value: "red" }, "Rojo"),
                                        React.createElement("option", { value: "green" }, "Verde"),
                                        React.createElement("option", { value: "blue" }, "Azul"),
                                        React.createElement("option", { value: "orange" }, "Naranja")),
                                    React.createElement(Form.Control.Feedback, { type: "invalid" }, "Campo requerido"))))),
                    React.createElement(Form.Group, { as: Row, controlId: "formFieldSubmit" },
                        React.createElement(Col, { className: "text-right" },
                            React.createElement(Button, { variant: "primary", type: "submit" }, "Enviar")))))),
        React.createElement(Modal
        // size="lg"
        , { 
            // size="lg"
            show: state.showCreateGroupModal, onHide: () => setState({ ...state, showCreateGroupModal: false }), backdrop: "static", keyboard: false },
            React.createElement(Modal.Header, { closeButton: true },
                React.createElement(Modal.Title, null, "Crear Grupo")),
            React.createElement(Modal.Body, null,
                React.createElement(Form, { noValidate: true, validated: state.groupValidated, onSubmit: handleGroupFormSubmit },
                    React.createElement(Form.Group, { as: Row, controlId: "formFieldTitle" },
                        React.createElement(Form.Label, { column: true, sm: 2 }, "T\u00EDtulo"),
                        React.createElement(Col, { sm: 10 },
                            React.createElement(Form.Control, { type: "text", name: "title", placeholder: "T\u00EDtulo", required: true }),
                            React.createElement(Form.Control.Feedback, { type: "invalid" }, "Campo requerido"))),
                    React.createElement(Form.Group, { as: Row, controlId: "formFieldGroup" },
                        React.createElement(Form.Label, { column: true, sm: 2 }, "Grupo"),
                        React.createElement(Col, { sm: 10 },
                            React.createElement(Form.Control, { as: "select", name: "group_id" },
                                React.createElement("option", { value: "" }, "Seleccione"),
                                getGroupsForGroupsModal().map((group, i) => (React.createElement("option", { key: i, value: group._id }, group.title)))),
                            React.createElement(Form.Control.Feedback, { type: "invalid" }, "Campo requerido"))),
                    React.createElement(Form.Group, { as: Row, controlId: "formFieldSubmit" },
                        React.createElement(Col, { className: "text-right" },
                            React.createElement(Button, { variant: "primary", type: "submit" }, "Enviar")))))),
        React.createElement(Modal, { size: "lg", show: state.itemSelected.type === 'task', onHide: () => setState({ ...state, itemSelected: defaultItem }), backdrop: "static", keyboard: false },
            React.createElement(Modal.Header, { closeButton: true },
                React.createElement(Modal.Title, null, "Editar Tarea")),
            React.createElement(Modal.Body, null,
                React.createElement("div", { className: "form" },
                    React.createElement("div", { className: "form-group row" },
                        React.createElement("label", { htmlFor: "", className: "col-sm-2 col-form-label" }, "Grupo"),
                        React.createElement("div", { className: "col-sm-10" },
                            React.createElement("select", { className: "form-control", value: state.itemSelected.task.group_id, onChange: (e) => handleChangeItem('group_id', e.currentTarget.value) },
                                React.createElement("option", { value: "" }, "Seleccione"),
                                getGroupsForTasksModal().map((group, i) => (React.createElement("option", { key: i, value: group._id }, group.title)))))),
                    React.createElement("div", { className: "form-group row" },
                        React.createElement("label", { htmlFor: "", className: "col-sm-2 col-form-label" }, "T\u00EDtulo"),
                        React.createElement("div", { className: "col-sm-10" },
                            React.createElement("input", { type: "text", className: "form-control", placeholder: "T\u00EDtulo", value: state.itemSelected.task.title, onChange: (e) => handleChangeItem('title', e.currentTarget.value) }))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-sm-6" },
                            React.createElement("div", { className: "form-group row" },
                                React.createElement("label", { htmlFor: "", className: "col-sm-4 col-form-label" }, "Inicia"),
                                React.createElement("div", { className: "col-sm-8" },
                                    React.createElement("input", { required: true, type: "date", className: "form-control", value: state.itemSelected.task.startsAt, onChange: (e) => handleChangeItem('startsAt', e.currentTarget.value) })))),
                        React.createElement("div", { className: "col-sm-6" },
                            React.createElement("div", { className: "form-group row" },
                                React.createElement("label", { htmlFor: "", className: "col-sm-4 col-form-label" }, "Termina"),
                                React.createElement("div", { className: "col-sm-8" },
                                    React.createElement("input", { required: true, type: "date", className: "form-control", value: state.itemSelected.task.endsAt, onChange: (e) => handleChangeItem('endsAt', e.currentTarget.value) }))))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-sm-6" },
                            React.createElement("div", { className: "form-group row" },
                                React.createElement("label", { htmlFor: "", className: "col-sm-4 col-form-label" }, "Status"),
                                React.createElement("div", { className: "col-sm-8" },
                                    React.createElement("select", { required: true, className: "form-control", value: state.itemSelected.task.status, onChange: (e) => handleChangeItem('status', e.currentTarget.value) },
                                        React.createElement("option", { value: "" }, "Seleccione"),
                                        React.createElement("option", { value: "activa" }, "Activa"),
                                        React.createElement("option", { value: "pendiente" }, "Pendiente"))))),
                        React.createElement("div", { className: "col-sm-6" },
                            React.createElement("div", { className: "form-group row" },
                                React.createElement("label", { htmlFor: "", className: "col-sm-4 col-form-label" }, "Color"),
                                React.createElement("div", { className: "col-sm-8" },
                                    React.createElement("select", { required: true, className: "form-control", value: state.itemSelected.task.bgColor, onChange: (e) => handleChangeItem('bgColor', e.currentTarget.value) },
                                        React.createElement("option", { value: "" }, "Seleccione"),
                                        React.createElement("option", { value: "red" }, "Rojo"),
                                        React.createElement("option", { value: "green" }, "Verde"),
                                        React.createElement("option", { value: "blue" }, "Azul"),
                                        React.createElement("option", { value: "orange" }, "Naranja")))))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-12" },
                            React.createElement("div", { className: "form-group row" },
                                React.createElement("label", { htmlFor: "", className: "col-sm-2 col-form-label" }, "Relaciones"),
                                React.createElement("div", { className: "col-sm-8" }, "...")))))),
            React.createElement(Modal.Footer, null,
                React.createElement("div", { className: "text-right" },
                    React.createElement("button", { className: "btn btn-primary", onClick: () => saveItem() }, "Guardar"))))));
};
export default App;
