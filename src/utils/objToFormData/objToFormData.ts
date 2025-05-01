
// function arrayToFormData(array:Array<Record<string,unknown>>):Array<string>{
//     if(Array.isArray(array)){
//         const _array = array.map((item:Record<string,unknown>)=>{
//             return JSON.stringify(Array.from(objToFormData(item)))
//         })
//         return _array
//     }
//     return []
// }


function getNewKey(prevKey:string,actualKey:string){
    if(prevKey){
        return `${prevKey}[${actualKey}]`
    }
    return actualKey

}


// export function objToFormData(formData:FormData,obj:Record<string,unknown> | Array<Record<string,unknown>> ,prevKey:string=""):FormData{
//     if(typeof obj === 'object'){
//         Object.entries(obj).forEach(([key,value])=>{
//             switch(true){
//                 case Array.isArray(value):{
//                         const array:Array<Record<string,unknown>> = value
//                         array.forEach((element)=>{
                            
//                             objToFormData(formData,element,`${getNewKey(prevKey,key)}[]`)
//                         })
//                     }
//                     break;
//                 case value instanceof File:{
//                         const file = value as File
//                         formData.append(key,file,file.name)
//                     }
//                     break;
//                 case typeof value === 'object' && value !== null:{
                    
//                     objToFormData(formData,value as Record<string,unknown>,getNewKey(prevKey,key))
//                         //formData.append(key,JSON.stringify(value))
//                     }
//                     break;
//                 default:
//                     if(typeof value !== 'function' && typeof value !== 'symbol' && typeof value !== 'undefined'){
//                         formData.append(getNewKey(prevKey,key),value as string)
//                     }
//                     break;
//             }
//         })
//     }
//     console.log(Array.from(formData))
//     return formData
// }



export function objToFormData(formData:FormData,obj:Record<string,unknown> | Array<Record<string,unknown>> ,prevKey:string=""):FormData{
    switch(true){
        case Array.isArray(obj):{
                const array:Array<Record<string,unknown>> = obj
                array.forEach((element)=>{
                    objToFormData(formData,element,`${getNewKey(prevKey,'')}`)
                })
            }
            break;
        case obj instanceof File:{
                const file = obj as File
                
                formData.append(prevKey,file,file.name)
            }
            break;
        case typeof obj === 'object' && obj !== null:{
            Object.entries(obj).forEach(([_key,value])=>{
                console.log(prevKey ? getNewKey(prevKey,_key) : _key)
                objToFormData(formData,value as Record<string,unknown>,prevKey ? getNewKey(prevKey,_key) : _key)
            })
            
                //formData.append(key,JSON.stringify(value))
            }
            break;
        default:
            if(typeof obj !== 'function' && typeof obj !== 'symbol' && typeof obj !== 'undefined'){
                formData.append(prevKey,obj as string)
            }
            break;
    }

   
    console.log(Array.from(formData))
    return formData
}

// function arrayToFormData(array:Array<Record<string,unknown>>):Array<string>{
//     if(Array.isArray(array)){
//         const _array = array.map((item:Record<string,unknown>)=>{
//             return JSON.stringify(Array.from(objToFormData(item)))
//         })
//         return _array
//     }
//     return []
// }

// export function objToFormData(obj:Record<string,unknown> | Array<Record<string,unknown>>):FormData{
//     const formData = new FormData()
//     if(typeof obj === 'object'){
//         Object.entries(obj).forEach(([key,value])=>{
//             switch(true){
//                 case Array.isArray(value):{
//                         const array:Array<Record<string,unknown>> = value
//                         formData.append(key,JSON.stringify(
//                             Array.from(
//                                 arrayToFormData(array)
//                             )
//                         ))
//                     }
//                     break;
//                 case value instanceof File:{
//                         const file = value as File
//                         formData.append(key,file,file.name)
//                     }
//                     break;
//                 case typeof value === 'object' && value !== null:{
//                         formData.append(key,JSON.stringify(Array.from(
//                              objToFormData(value as Record<string,unknown>)
//                          )))
//                         //formData.append(key,JSON.stringify(value))
//                     }
//                     break;
//                 default:
//                     if(typeof value === 'string'){
//                         formData.append(key,value as string)
//                     }
//                     break;
//             }
//         })
//     }
//     console.log(Array.from(formData))
//     return formData
// }