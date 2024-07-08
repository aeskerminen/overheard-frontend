const getHowLongAgo = (ms) => {
    let seconds = Math.floor((Date.now() - new Date(ms)) / 1000)
    let minutes = Math.floor(seconds / 60)
    
    if(minutes == 0)
        return `${seconds}s`
    if (minutes < 60)
        return `${minutes}m`
    else if (minutes < 1440)
        return `${Math.floor(minutes / 60)}h`
    else if (minutes < 10080)
        return `${Math.floor(minutes / 60 / 24)}d`
    else if (minutes < 40320)
        return `${Math.floor(minutes / 60 / 24 / 7)}w`
    else
        return `${Math.floor(minutes / 60 / 24 / 7 / 52)}y`
}
  

export {getHowLongAgo}