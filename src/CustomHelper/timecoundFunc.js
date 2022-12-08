import moment from "moment";
export const timecoundFunc = (endDate) => {
    let end = moment(endDate)

    let timeCount = end.valueOf() - new Date(Date.now()).getTime()
    return timeCount;

}
