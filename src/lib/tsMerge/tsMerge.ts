import { twMerge } from "tailwind-merge";

export function tailwindMerge(...classes:Array<string|undefined>){
    let className = ''
    classes.forEach((_class)=>{
        if(_class){
            className = className + " " + _class
        }
    })
    return twMerge(className)
}