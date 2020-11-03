
import React, { useState } from 'react'

import Modal from 'react-bootstrap/Modal'

import moment from 'moment'
import 'moment/locale/es'

import Gantt from './Components/Gantt/Gantt'

const App = () => {

    moment.locale('es')
    moment.updateLocale('es', {
        week: {
            dow: 1
        }
    })

    const [ state, setState ] = useState({
        showEditModal: false,
    })

    const [ start, setStart ] = useState('')
    const [ end, setEnd ] = useState('')

    const [ tasks, setTasks ] = useState([
        {
            _id: '01.00.00',
            title: 'Cambiar piso de cocina',
            start: '2020-11-02',
            end: '2020-11-03',
            status: 'Atrasada',
            bgColor: '#F00',
        },
        {
            _id: '02.00.00',
            title: 'Pintar estacionamiento',
            start: '2020-11-02',
            end: '2020-11-04',
            status: 'Pendiente',
            bgColor: '#093763',
        },
        {
            _id: '03.00.00',
            title: 'Task 3',
            start: '2020-11-03',
            end: '2020-11-05',
            status: 'Liberada',
            bgColor: '#200ab9',
        },
        {
            _id: '04.00.00',
            title: 'Task 4',
            start: '2020-11-04',
            end: '2020-11-05',
            status: 'Completada',
            bgColor: '#b7b7b7',
        },
        {
            _id: '05.00.00',
            title: 'Task 5',
            start: '2020-11-06',
            end: '2020-11-08',
            status: 'Activa',
            bgColor: '#34a854',
        },
        {
            _id: '06.00.00',
            title: 'Task 6',
            start: '2020-11-07',
            end: '2020-11-10',
            status: 'Activa Atrasada',
            bgColor: '#980001',
        },
    ])

    setTimeout(() => {

        setStart('2020-09-01')
        setEnd('2020-12-31')
    }, 100)

    return (
        <div>
            <div>
                <button className="btn btn-raised btn-raised-secondary"
                    onClick={() => setState({ ...state, showEditModal: true })}
                >
                    Add Task
                </button>
            </div>
            <Gantt
                start={start}
                end={end}
                day_width={46}
                tasks={tasks}
                onTaskClick={(task: any, i: number) => console.log({ task, i })}
                onReorder={(_tasks: any) => setTasks(_tasks)}
                table={{
                    width: 500,
                    reorder: true,
                    columns: [
                        {
                            title: 'ID',
                            width: 90,
                            style: {
                                textAlign: 'left',
                                paddingLeft: 6,
                                paddingRight: 6,
                            },
                            render: (data: any) => data._id
                        },
                        {
                            title: 'Actividad',
                            width: '*',
                            style: {
                                textAlign: 'left',
                            },
                            hideOnMobile: true,
                            render: (data: any) => data.title,
                        },
                        {
                            title: 'Estado',
                            width: '60',
                            style: {
                                textAlign: 'left',
                            },
                            hideOnMobile: true,
                            render: (data: any) => data.status,
                        },
                    ]
                }}
            />

            <Modal show={state.showEditModal}
                onHide={() => setState({ ...state, showEditModal: false })}
            >
                <Modal.Body>
                    sss
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-raised btn-raised-secondary"
                        onClick={() => setState({ ...state, showEditModal: false })}
                    >
                        Cerrar
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default App
