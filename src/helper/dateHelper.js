export const formatDate = (dateString) => {
    return dateString.split(' ')[0].split('-').reverse().join('.');
};

export const formatTime = (dateString) => {
    const hour = dateString.split(' ')[1].split(':');
    hour.pop();
    return hour.join(':');
};