export interface PaginationModel{
    count:number,               // the count of the elements in the corrent page
    next:string,                // next data url for the next data
    previous:string,            // previous data url for previous data
    number_of_pages:number,     // total number of pages
    current_page_number:number, // the actual page number
    page_size:number,           // number of elements in a page
    results?:Array<unknown>      // result of the query
}
