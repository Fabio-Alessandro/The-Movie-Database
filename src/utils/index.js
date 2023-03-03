const convertMinutes = time => {

    const inHours = time / 60;
    const hours = Math.floor (inHours);
    const minutes = Math.round ((inHours - hours) * 60);

    return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}

module.exports = { convertMinutes }