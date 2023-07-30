// function to convert time from UTC to 02:30pm format
export const convertUTCToTime = (utcTime) => {
    const date = new Date(utcTime);
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        caseFirst: 'lower'
    });

    // Convert "AM" or "PM" to lowercase
    const lowercaseTime = formattedTime.replace(/\b(A|P)M\b/, match => match.toLowerCase())
    
    return lowercaseTime;
};