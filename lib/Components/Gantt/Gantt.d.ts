/// <reference types="react" />
import './styles.css';
declare type Props = {
    start: string;
    end: string;
    day_width: number;
    tasks: any;
    onTaskClick?: any;
    onReorder: any;
    table?: any;
};
declare const Gantt: (props: Props) => JSX.Element;
export default Gantt;
