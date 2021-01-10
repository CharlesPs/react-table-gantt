declare type Props = {
    color: string;
    width: number;
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    type: string;
};
declare const GanttArrow: (props: Props) => JSX.Element;
export default GanttArrow;
