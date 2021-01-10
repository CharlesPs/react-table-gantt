export declare const getMonths: (start: string, end: string) => any;
export declare const getAllDays: (start: string, end: string) => {
    dmy: string;
    dom: number;
    dow: string;
}[];
export declare const getMonthsPositions: (months: any, dayWidth: number) => any;
export declare const thereIsTodayHighlight: (start: string, end: string) => boolean;
export declare const getTodayPosition: (start: string, dayWidth: number) => number;
export declare const getBoxPositionX: (ganttStart: string, taskStart: string, dayWidth: number) => number;
export declare const getTaskDays: (start: string, end: string) => number;
export declare const moveTask: (task: any, to: string) => void;
export declare const fixRelationsDates: (tasksRows: any) => any;
export declare const getRelations: (tasksItems: any) => any;
declare const _default: {
    getMonths: (start: string, end: string) => any;
    getAllDays: (start: string, end: string) => {
        dmy: string;
        dom: number;
        dow: string;
    }[];
    getMonthsPositions: (months: any, dayWidth: number) => any;
    thereIsTodayHighlight: (start: string, end: string) => boolean;
    getTodayPosition: (start: string, dayWidth: number) => number;
    getBoxPositionX: (ganttStart: string, taskStart: string, dayWidth: number) => number;
    getTaskDays: (start: string, end: string) => number;
    fixRelationsDates: (tasksRows: any) => any;
    getRelations: (tasksItems: any) => any;
};
export default _default;
