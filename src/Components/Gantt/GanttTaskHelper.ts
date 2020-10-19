
import moment from 'moment'

const dayWidth = 46
const startAtTop = 56
const rowHeight = 38
const paddingTop = 7
const paddingLeft = 3

export const thereIsTodayHighlight = (start: string, end: string) => {

    const today = moment()

    return (today.isSameOrAfter(start) && today.isSameOrBefore(end))
}

export const getTodayPosition = (start: string) => {

    const today = moment()

    let days = 0

    while (today.isAfter(start)) {
        
        days += 1

        today.subtract(1, 'day')
    }

    return (days - 1) * dayWidth
}

export const getYesterdayPosition = (start: string) => {

    const today = moment()

    let days = 0

    while (today.isAfter(start)) {
        
        days += 1

        today.subtract(1, 'day')
    }

    return (days - 2) * dayWidth
}

export const getDaysForTask = (start: string, end: string) => {

    let days = 0

    let day = moment(start)

    while (day.isSameOrBefore(end)) {
        
        days += 1

        day.add(1, 'day')
    }

    return days
}

export const getBoxPositionX = (firstDay: string, start: string) => {

    let day = moment(start)
    let posX = 0

    if (day.isBefore(firstDay)) {

        while (day.isBefore(firstDay)) {

            posX -= 1
    
            day.add(1, 'day')
        }
    } else if (day.isAfter(firstDay)) {

        while (day.isAfter(firstDay)) {

            posX += 1
    
            day.subtract(1, 'day')
        }
    }

    return paddingLeft + (posX * dayWidth)
}

export const getBoxPositionY = (posY: number) => {

    return startAtTop + (posY * rowHeight) + paddingTop
}

export const getTextPositionX = (firstDay: string, start: string, boxWidth: number, isTextBigger: boolean) => {

    let day = moment(start)
    let posX = 0

    while (day.isAfter(firstDay)) {

        posX += 1

        day.subtract(1, 'day')
    }

    if (isTextBigger) {

        return (posX * dayWidth) + 8 + boxWidth
    } else {

        return (posX * dayWidth) + 8
    }
}

export const getTextPositionY = (posY: number) => {

    return startAtTop + (posY * rowHeight) + (paddingTop * 3.5)
}
