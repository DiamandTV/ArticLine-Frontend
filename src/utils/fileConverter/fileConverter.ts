
export async function urlToFile(fileName:string,defaultType:string='image/jpeg'){
    const response = await fetch(fileName)
    const data = await response.blob()
    return new File([data],fileName,{
        type:data.type || defaultType
    }) 
}