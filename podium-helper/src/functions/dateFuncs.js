const dateToString = (date) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const dateArr = date.split("-");
    const monthNum = Number(dateArr[0]) - 1;
    const day = Number(dateArr[1]);
    const monthName = months[monthNum];
    return `${monthName} ${day}, ${Number(dateArr[2])}`;
};

const getToday = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${mm}-${dd}-${year}`;
};

const compareStartDate = (a, b) => {
    const aDate = new Date(a.startDate);
    const bDate = new Date(b.startDate);

    return aDate < bDate ? -1 : 1;
};

export { dateToString, getToday, compareStartDate };
