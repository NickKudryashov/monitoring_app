export const timeConvert = (source:string | null):string => {
    if (!source) {
        return "Никогда";
    }
    const dateTimeList = source.split("T");
    const date = dateTimeList[0].split("-");
    const time = dateTimeList[1].split("+");
    const resultDate = `${date[2]}.${date[1]}.${date[0]}`;
    const resultTime = time[0].split(":");
    const clearSeconds = resultTime[2].split(".")[0];
    const clearTime = `${resultTime[0]}:${resultTime[1]}:${clearSeconds} `;
    return clearTime+resultDate;
};