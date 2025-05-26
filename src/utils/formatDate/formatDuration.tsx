

export function formatDuration(duration:{hours:number,minutes:number,seconds:number}){
    const days = duration.hours / 24
    const hours = duration.hours % 24
    const minutes = duration.minutes
    const seconds = duration.seconds
    return `${days} ${hours}:${minutes}:${seconds}`
}