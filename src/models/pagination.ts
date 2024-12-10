export interface PaginationModel{
    count:number,
    next:string,
    previous:string,
    number_of_pages:number,
    current_page_number:number,
    page_size:number,
    results:Array<unknown>
}