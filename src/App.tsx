/*eslint array-callback-return: "off" */

import React, { useState } from 'react'

import Gantt from './Components/Gantt/Gantt'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'

import { v4 as uuidv4 } from 'uuid'

type Task = {
    _id: string,
    group_id: string,
    title: string,
    startsAt: string,
    endsAt: string,
    status: string,
    bgColor: string,
}

type GanttItem = {
    _id: string,
    type: string,
    task: Task,
    title?: string,
    items?: any,
    i?: number,
    j?: number,
    k?: number,
}

const App = () => {

    const GANTT_ITEMS: string = 'ganttItems'

    const defaultItem: GanttItem = {
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
    }

    const [ state, setState ] = useState({
        showCreateTaskModal: false,
        showCreateGroupModal: false,
        taskValidated: false,
        groupValidated: false,
        start: '2021-01-01',
        end: '2021-02-01',
        editingTask: {},
        ganttItems: JSON.parse(localStorage.getItem(GANTT_ITEMS) || '[]'),
        itemSelected: defaultItem,
    })

    const getGroupsForTasksModal = () => {

        const groups: any = []

        state.ganttItems.map((ganttItem: any) => {

            if (ganttItem.type === 'group') {

                const group = {
                    _id: ganttItem._id,
                    title: ganttItem.title,
                }

                groups.push(group)

                ganttItem.items.map((groupItem: any) => {

                    if (groupItem.type === 'group') {

                        groups.push({
                            _id: groupItem._id,
                            title: ` - ${groupItem.title}`
                        })
                    }
                })
            }
        })

        return groups
    }

    const getGroupsForGroupsModal = () => {

        const groups: any = []

        state.ganttItems.map((ganttItem: any) => {

            if (ganttItem.type === 'group') {

                const group = {
                    _id: ganttItem._id,
                    title: ganttItem.title,
                }

                groups.push(group)

                // ganttItem.items.map((groupItem: any) => {

                //     if (groupItem.type === 'group') {

                //         groups.push({
                //             _id: groupItem._id,
                //             title: groupItem.title
                //         })
                //     }
                // })
            }
        })

        return groups
    }

    const getNewTask = (data: any) => {

        const taskRow = {
            _id: uuidv4(),
            type: 'task',
            task: {
                _id: uuidv4(),
                ...data
            }
        }

        return taskRow
    }

    const getNewGroup = (data: any) => {

        const groupRow = {
            _id: uuidv4(),
            type: 'group',
            title: data.title,
            items: []
        }

        return groupRow
    }

    const handleTaskFormSubmit = (e: any) => {
        e.preventDefault()

        const form = e.currentTarget

        const newState: any = {
            ...state,
            taskValidated: true
        }

        if (form.checkValidity()) {

            const data:any = {}

            for (let i = 0; i < form.length; i += 1) {

                if (form[i].name.length) data[form[i].name] = form[i].value
            }

            const task:any = getNewTask(data)

            if (data.group_id) {

                putTaskIntoGroup(data.group_id, task)
            } else {

                newState.ganttItems.push(task)
            }

            newState.taskValidated = false
            newState.showCreateTaskModal = false
        }

        localStorage.setItem(GANTT_ITEMS, JSON.stringify(newState.ganttItems))

        setState(newState)
    }

    const handleGroupFormSubmit = (e: any) => {
        e.preventDefault()

        const form = e.currentTarget

        const newState: any = {
            ...state,
            groupValidated: true
        }

        if (form.checkValidity()) {

            const data:any = {}

            for (let i = 0; i < form.length; i += 1) {

                if (form[i].name.length) data[form[i].name] = form[i].value
            }

            const group:any = getNewGroup(data)

            if (data.group_id) {

                putGroupIntoGroup(data.group_id, group)
            } else {

                newState.ganttItems.push(group)
            }

            newState.groupValidated = false
            newState.showCreateGroupModal = false
        }

        localStorage.setItem(GANTT_ITEMS, JSON.stringify(newState.ganttItems))

        setState(newState)
    }

    const putTaskIntoGroup = (group_id: string, task: any) => {

        const ganttItems = state.ganttItems

        ganttItems.map((ganttItem: any) => {

            if (ganttItem.type === 'group') {

                if (ganttItem._id === group_id) {

                    ganttItem.items.push(task)
                } else {

                    ganttItem.items.map((groupItem: any) => {

                        if (groupItem.type === 'group') {

                            if (groupItem._id === group_id) {

                                groupItem.items.push(task)
                            }
                        }
                    })
                }
            }
        })

        setState({
            ...state,
            ganttItems
        })
    }

    const putGroupIntoGroup = (group_id: string, group: any) => {

        const ganttItems = state.ganttItems

        ganttItems.map((ganttItem: any) => {

            if (ganttItem._id === group_id) {

                ganttItem.items.push(group)
            } else if (ganttItem.type === 'group') {

                ganttItem.items.map((groupItem: any) => {

                    if (groupItem._id === group_id) {

                        groupItem.items.push(group)
                    }
                })
            }
        })

        setState({
            ...state,
            ganttItems
        })
    }

    const selectGanttItem = (ganttItem: any) => {

        if (ganttItem.type === 'task') {

            setState({
                ...state,
                itemSelected: JSON.parse(JSON.stringify(ganttItem))
            })
        }
    }

    const onModifyItems = (ganttItems: any) => {

        // console.log({ ganttItems })

        localStorage.setItem(GANTT_ITEMS, JSON.stringify(ganttItems))

        setState({
            ...state,
            ganttItems
        })
    }

    const handleChangeItem = (field: string, value: string) => {

        const itemSelected = state.itemSelected

        const task = itemSelected.task

        switch (field) {
            case 'title':
                task.title = value
                break
            case 'startsAt':
                task.startsAt = value
                break
            case 'endsAt':
                task.endsAt = value
                break
            case 'group_id':
                task.group_id = value
                break
            case 'status':
                task.status = value
                break
            case 'bgColor':
                task.bgColor = value
                break
        }

        itemSelected.task = task

        setState({
            ...state,
            itemSelected
        })
    }

    const getTaskItemById = (_id: string) => {

        let item: GanttItem = defaultItem

        state.ganttItems.map((ganttItem: GanttItem) => {

            if (ganttItem._id === _id) {

                item = ganttItem
            } else if (ganttItem.type === 'group') {

                ganttItem.items.map((groupItem: GanttItem) => {

                    if (groupItem._id === _id) {

                        item = groupItem
                    } else if (groupItem.type === 'group') {

                        groupItem.items.map((gItem: GanttItem) => {

                            if (gItem._id === _id) {

                                item = gItem
                            }
                        })
                    }
                })
            }
        })

        return item
    }

    const moveItem = (ganttItem: GanttItem, from: string) => {

        ganttItem.i = undefined
        ganttItem.j = undefined
        ganttItem.k = undefined

        const to = ganttItem.task.group_id

        const ganttItems = []

        state.ganttItems.map((itemLevel0: GanttItem) => {

            if (itemLevel0.type === 'task' && itemLevel0._id !== ganttItem._id) {

                itemLevel0.i = undefined
                itemLevel0.j = undefined
                itemLevel0.k = undefined

                ganttItems.push(itemLevel0)
            } else if (itemLevel0.type === 'group') {

                const groupItems0: any = []

                itemLevel0.items.map((itemLevel1: GanttItem) => {

                    if (itemLevel1.type === 'task' && itemLevel1._id !== ganttItem._id) {

                        itemLevel1.i = undefined
                        itemLevel1.j = undefined
                        itemLevel1.k = undefined

                        groupItems0.push(itemLevel1)
                    } else if (itemLevel1.type === 'group') {

                        const groupItems1: any = []

                        itemLevel1.items.map((itemLevel2: GanttItem) => {

                            if (itemLevel2.type === 'task' && itemLevel2._id !== ganttItem._id) {

                                itemLevel2.i = undefined
                                itemLevel2.j = undefined
                                itemLevel2.k = undefined

                                groupItems1.push(itemLevel2)
                            }
                        })

                        if (to === itemLevel1._id) {

                            groupItems1.push(ganttItem)
                        }

                        itemLevel1.items = groupItems1

                        groupItems0.push(itemLevel1)
                    }
                })

                if (to === itemLevel0._id) {

                    groupItems0.push(ganttItem)
                }

                itemLevel0.items = groupItems0

                ganttItems.push(itemLevel0)
            }
        })

        if (to === '') {

            ganttItems.push(ganttItem)
        }

        onModifyItems(ganttItems)

        setState({
            ...state,
            ganttItems,
            itemSelected: defaultItem
        })
    }

    const updateItem = (gItem: GanttItem) => {

        const items = state.ganttItems.map((ganttItem: GanttItem) => {

            if (ganttItem._id === gItem._id) {

                return gItem
            } else if (ganttItem.type === 'group') {

                const groupItems = ganttItem.items.map((groupItem: GanttItem) => {

                    if (groupItem._id === gItem._id) {

                        return gItem
                    } else if (groupItem.type === 'group') {

                        const items = groupItem.items.map((item: GanttItem) => {

                            if (item._id === gItem._id) {

                                return gItem
                            }

                            return item
                        })

                        groupItem.items = items
                    }

                    return groupItem
                })

                ganttItem.items = groupItems
            }

            return ganttItem
        })

        onModifyItems(items)

        setState({
            ...state,
            ganttItems: items,
            itemSelected: defaultItem
        })
    }

    const saveItem = () => {

        const group_id = state.itemSelected.task.group_id

        const item: GanttItem = getTaskItemById(state.itemSelected._id)

        if (!item) {

            return
        }

        if (group_id !== item.task.group_id) {

            moveItem(state.itemSelected, item.task.group_id)
        } else {

            updateItem(state.itemSelected)
        }
    }

    return (
        <>
            <div className="container-fluid pt-2">
                <div className="btn-toolbar mb-2">
                    <div className="btn-group">
                        <button className="btn btn-sm btn-secondary" onClick={() => setState({ ...state, showCreateTaskModal: true })}>Nueva Tarea</button>
                    </div>
                    <div className="btn-group">
                        <button className="btn btn-sm btn-secondary" onClick={() => setState({ ...state, showCreateGroupModal: true })}>Nuevo Grupo</button>
                    </div>
                </div>
                <div>
                    <Gantt
                        start={state.start}
                        end={state.end}
                        tasks={state.ganttItems}
                        adjustRelations={false}
                        onItemClick={(ganttItem: any) => selectGanttItem(ganttItem)}
                        onModifyTasks={(newItems: any) => onModifyItems(newItems)}
                        styles={{
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
                        }}
                        table={{
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
                                    render: (data: any) => {

                                        return `${data.i + 1}.${data.j + 1 || 0}.${data.k + 1 || 0}`
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
                                    render: (data: any) => data.type === 'group' ? data.title : data.task.title,
                                },
                                {
                                    name: 'Inicia',
                                    render: (data: any) => data.type === 'group' ? data.startsAt :data.task.startsAt,
                                    width: 90,
                                    style: {
                                        textAlign: 'center'
                                    }
                                },
                                {
                                    name: 'Termina',
                                    render: (data: any) => data.type === 'group' ? data.endsAt :data.task.endsAt,
                                    width: 90,
                                    style: {
                                        textAlign: 'center'
                                    }
                                },
                                {
                                    name: 'Estado',
                                    render: (data: any) => data.type === 'group' ? '' :data.task.status,
                                    width: 100,
                                    style: {
                                        textAlign: 'center'
                                    }
                                },
                            ],
                        }}
                        locale={{
                            months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Setiembre_Octubre_Noviembre_Diciembre'.split('_'),
                            daysOfWeek: 'Dom_Lun_Mar_Mie_Jue_Vie_Sab'.split('_'),
                            firstDayOfWeek: 1,
                        }}
                    />
                </div>
            </div>

            <Modal
                size="lg"
                show={state.showCreateTaskModal}
                onHide={() => setState({ ...state, showCreateTaskModal: false })}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Crear Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={state.taskValidated} onSubmit={handleTaskFormSubmit}>
                        <Form.Group as={Row} controlId="formFieldGroup">
                            <Form.Label column sm={2}>Grupo</Form.Label>
                            <Col sm={10}>
                                <Form.Control as="select" name="group_id">
                                    <option value="">Seleccione</option>
                                    {getGroupsForTasksModal().map((group: any, i: number) => (
                                        <option key={i} value={group._id}>{group.title}</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">Campo requerido</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formFieldTitle">
                            <Form.Label column sm={2}>Título</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" name="title" placeholder="Título" required />
                                <Form.Control.Feedback type="invalid">Campo requerido</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col sm={6}>
                                <Form.Group as={Row} controlId="formFieldStartsAt">
                                    <Form.Label column sm={4}>Inicia</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control type="date" name="startsAt" placeholder="" required />
                                        <Form.Control.Feedback type="invalid">Campo requerido</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group as={Row} controlId="formFieldEndsAt">
                                    <Form.Label column sm={4}>Termina</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control type="date" name="endsAt" placeholder="" required />
                                        <Form.Control.Feedback type="invalid">Campo requerido</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Group as={Row} controlId="formFieldStatus">
                                    <Form.Label column sm={4}>Status</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control as="select" name="status" required>
                                            <option value="">Seleccione</option>
                                            <option value="activa">Activa</option>
                                            <option value="pendiente">Pendiente</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">Campo requerido</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group as={Row} controlId="formFieldColor">
                                    <Form.Label column sm={4}>Color</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control as="select" name="bgColor" required>
                                            <option value="">Seleccione</option>
                                            <option value="red">Rojo</option>
                                            <option value="green">Verde</option>
                                            <option value="blue">Azul</option>
                                            <option value="orange">Naranja</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">Campo requerido</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group as={Row} controlId="formFieldSubmit">
                            <Col className="text-right">
                                <Button variant="primary" type="submit">
                                    Enviar
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal
                // size="lg"
                show={state.showCreateGroupModal}
                onHide={() => setState({ ...state, showCreateGroupModal: false })}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Crear Grupo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={state.groupValidated} onSubmit={handleGroupFormSubmit}>
                        <Form.Group as={Row} controlId="formFieldTitle">
                            <Form.Label column sm={2}>Título</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" name="title" placeholder="Título" required />
                                <Form.Control.Feedback type="invalid">Campo requerido</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formFieldGroup">
                            <Form.Label column sm={2}>Grupo</Form.Label>
                            <Col sm={10}>
                                <Form.Control as="select" name="group_id">
                                    <option value="">Seleccione</option>
                                    {getGroupsForGroupsModal().map((group: any, i: number) => (
                                        <option key={i} value={group._id}>{group.title}</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">Campo requerido</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formFieldSubmit">
                            <Col className="text-right">
                                <Button variant="primary" type="submit">
                                    Enviar
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal
                size="lg"
                show={state.itemSelected.type === 'task'}
                onHide={() => setState({ ...state, itemSelected: defaultItem })}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Editar Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form">
                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-2 col-form-label">Grupo</label>
                            <div className="col-sm-10">
                                <select className="form-control"
                                    value={state.itemSelected.task.group_id}
                                    onChange={(e: any) => handleChangeItem('group_id', e.currentTarget.value)}
                                >
                                    <option value="">Seleccione</option>
                                    {getGroupsForTasksModal().map((group: any, i: number) => (
                                        <option key={i} value={group._id}>{group.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-2 col-form-label">Título</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Título"
                                    value={state.itemSelected.task.title}
                                    onChange={(e: any) => handleChangeItem('title', e.currentTarget.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group row">
                                    <label htmlFor="" className="col-sm-4 col-form-label">Inicia</label>
                                    <div className="col-sm-8">
                                        <input required
                                            type="date"
                                            className="form-control"
                                            value={state.itemSelected.task.startsAt}
                                            onChange={(e: any) => handleChangeItem('startsAt', e.currentTarget.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group row">
                                    <label htmlFor="" className="col-sm-4 col-form-label">Termina</label>
                                    <div className="col-sm-8">
                                        <input required
                                            type="date"
                                            className="form-control"
                                            value={state.itemSelected.task.endsAt}
                                            onChange={(e: any) => handleChangeItem('endsAt', e.currentTarget.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group row">
                                    <label htmlFor="" className="col-sm-4 col-form-label">Status</label>
                                    <div className="col-sm-8">
                                        <select required
                                            className="form-control"
                                            value={state.itemSelected.task.status}
                                            onChange={(e: any) => handleChangeItem('status', e.currentTarget.value)}
                                        >
                                            <option value="">Seleccione</option>
                                            <option value="activa">Activa</option>
                                            <option value="pendiente">Pendiente</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group row">
                                    <label htmlFor="" className="col-sm-4 col-form-label">Color</label>
                                    <div className="col-sm-8">
                                        <select required
                                            className="form-control"
                                            value={state.itemSelected.task.bgColor}
                                            onChange={(e: any) => handleChangeItem('bgColor', e.currentTarget.value)}
                                        >
                                            <option value="">Seleccione</option>
                                            <option value="red">Rojo</option>
                                            <option value="green">Verde</option>
                                            <option value="blue">Azul</option>
                                            <option value="orange">Naranja</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group row">
                                    <label htmlFor="" className="col-sm-2 col-form-label">Relaciones</label>
                                    <div className="col-sm-8">
                                        ...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="text-right">
                        <button className="btn btn-primary" onClick={() => saveItem()}>Guardar</button>
                    </div>
                </Modal.Footer>
            </Modal>

            {/* <Modal
                show={state.showCreateGroupModal}
                onHide={() => setState({ ...state, showCreateGroupModal: false })}
                backdrop="static"
                keyboard={false}
           >

            </Modal> */}
        </>
    )
}

export default App