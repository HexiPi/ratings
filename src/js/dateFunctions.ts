export const formatDate = (timestamp: number, withTime?: boolean, toUTC?: boolean) => {
    if (timestamp === undefined || timestamp === -1) {
        return '';
    }
    else {
        var date = new Date(timestamp);

        if (toUTC) {
            date = new Date(offsetUTCToLocalTimeStamp(Number(timestamp)));
        }
        
        let formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

        if (withTime) {
            const hour = (date.getHours() === 0 || date.getHours() === 12) ? 12 : date.getHours() % 12;
            const minute = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
            formattedDate = formattedDate + ` @ ${hour}:${minute} ${(date.getHours() >= 12) ? 'P.M.' : 'A.M.'}`;
        }

        return formattedDate;
    }
}

export const generateStartOfDayTimestamp = () => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return startOfDay.getTime();
}

export const offsetUTCToLocalTimeStamp = (timestamp: number, inverse?: boolean) => {
    const now = new Date();
    const timeStr = now.toTimeString();
    const offsetStr = timeStr.substr(timeStr.indexOf('GMT') + 3, 5);
    
    const offsetSign = offsetStr.substr(0, 1);
    const hourOffset =  Number(offsetSign + offsetStr.substr(1, 2));
    const minuteOffset = Number(offsetSign + offsetStr.substr(3, 2));

    const inverseFactor = (inverse) ? 1 : -1;

    return timestamp + (inverseFactor * hourOffset * 60 * 60 * 1000) + (inverseFactor * minuteOffset * 60 * 1000);
}