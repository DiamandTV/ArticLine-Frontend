export interface FormTransformers<FormData,RequestData,ApiData>{
    formToRequest:(formData:FormData)=>RequestData,
    apiToForm:(apiData:ApiData)=>FormData,
}