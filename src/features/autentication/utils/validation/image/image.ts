import { z } from "zod"

export const singleImageValidator = z.instanceof(FileList).
refine((file) => file?.length == 1, 'File is required.').
refine((file)=>{
    if(file?.length){
        if(file[0].size > 1000000000 ){
            return false
        }
    }
    return true
},'File too big')
.transform((fileList)=>fileList[0])
.refine((file) => file instanceof File, {
    message: 'Invalid file',
})