// Match the path and return it's index otherwise return -1
export function pathMatcher(paths:Array<string>,pathName:string){
    const startWithFind:Array<string> = []
    paths.forEach((path)=>{
        if(pathName.match(path)){
            startWithFind.push(path)
        }
    })

    if(startWithFind.length > 0){
        let longhestWord = startWithFind[0]
        for (let ii=0;ii<startWithFind.length;ii++){
            if(startWithFind[ii].length >= longhestWord.length) {
                longhestWord = startWithFind[ii]
            }
        }
        return paths.indexOf(longhestWord)
    }
    return -1
}