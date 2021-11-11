import moment from "moment";

export const currentDate = moment().format("L"); // 05/25/2018
export const currentTime = moment().format("HH:mm"); // 08:55

export const auth = `${currentDate} - ${currentTime}`;
