declare type Props = {
    start: string;
    end: string;
    tasks: any;
    adjustRelations?: boolean;
    onItemClick?: any;
    onModifyTasks?: any;
    table: any;
    styles: any;
    locale: any;
};
declare const Gantt: (props: Props) => JSX.Element;
export default Gantt;
