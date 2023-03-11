
export const calculatorTime = (timeStamp: string) => {
    const date = new Date(timeStamp)
    const now = new Date()

    const differ = now.getTime() - date.getTime()

    const formatter = new Intl.RelativeTimeFormat('en', {numeric: 'auto'})
    let time:string

    // Intl.RelativeTimeFormat allows you to format a time relative to the current, using natural language syntax and other formatting options.
    if (differ >= 31536000000) {
        // More than a year
        time = formatter.format(Math.floor(-differ / 31536000000), "year");
    } else if (differ >= 2592000000) {
        // More than a month
        time = formatter.format(Math.floor(-differ / 2592000000), "month");
    } else if (differ >= 86400000) {
        // More than a day
        time = formatter.format(Math.floor(-differ / 86400000), "day");
    } else if (differ >= 3600000) {
        // More than an hour
        time = formatter.format(Math.floor(-differ / 3600000), "hour");
    } else if (differ >= 60000) {
        // More than a minute
        time = formatter.format(Math.floor(-differ / 60000), "minute");
    } else {
        time = "just now";
    }

    return time
}

export const getText = (path: string) => {
    switch(path) {
        case '/setting':
            return {
                header: 'Profile Info',
                textSave:'Profile Info',
                text: 'Update your basic profile information such as Email Address, Name, and Image.'
            }
        case '/setting/security':
            return {
                header: 'Security',
                textSave:'Password',
                text: 'Update your password to improve security.'
            }
        default:
            return {
                header: 'None',
                textSave:'None',
                text: 'None'
            }
    }
}