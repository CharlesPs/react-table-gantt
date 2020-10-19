import React, { useState } from 'react';
import Gantt from './Components/Gantt/Gantt';
const App = () => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [tasks, setTasks] = useState([
        {
            _id: '01.00.00',
            title: 'Cambiar piso de cocina',
            start: '2020-10-17',
            end: '2020-10-18',
            status: 'Atrasada',
            bgColor: '#F00',
        },
        {
            _id: '02.00.00',
            title: 'Pintar estacionamiento',
            start: '2020-10-18',
            end: '2020-10-20',
            status: 'Pendiente',
            bgColor: '#093763',
        },
        {
            _id: '03.00.00',
            title: 'Task 3',
            start: '2020-10-21',
            end: '2020-10-23',
            status: 'Liberada',
            bgColor: '#200ab9',
        },
        {
            _id: '04.00.00',
            title: 'Task 4',
            start: '2020-10-21',
            end: '2020-10-22',
            status: 'Completada',
            bgColor: '#b7b7b7',
        },
        {
            _id: '05.00.00',
            title: 'Task 5',
            start: '2020-10-25',
            end: '2020-10-26',
            status: 'Activa',
            bgColor: '#34a854',
        },
        {
            _id: '06.00.00',
            title: 'Task 6',
            start: '2020-12-01',
            end: '2020-12-02',
            status: 'Activa Atrasada',
            bgColor: '#980001',
        },
    ]);
    setTimeout(() => {
        setStart('2020-09-01');
        setEnd('2020-12-31');
    }, 100);
    return (React.createElement("div", null,
        React.createElement(Gantt, { start: start, end: end, day_width: 46, tasks: tasks, onReorder: (_tasks) => setTasks(_tasks), table: {
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
                        render: (data) => data._id
                    },
                    {
                        title: 'Actividad',
                        width: '*',
                        style: {
                            textAlign: 'left',
                        },
                        hideOnMobile: true,
                        render: (data) => data.title,
                    },
                    {
                        title: 'Estado',
                        width: '60',
                        style: {
                            textAlign: 'left',
                        },
                        hideOnMobile: true,
                        render: (data) => data.status,
                    },
                ]
            } })));
};
export default App;
