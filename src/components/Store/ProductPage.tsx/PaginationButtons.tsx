import { Pagination, Stack } from "@mui/material";

interface PaginationButtonsProps{
    count:number | undefined,
    page:number,
    onChange:(page:number)=>void
}

export function PaginationButtons({count,page,onChange}:PaginationButtonsProps){
    return(
        (count && count > 0) ?
        <div className="max-w-max max-h-max bg-white p-2 rounded-xl self-end justify-self-end sticky top-0">
            <Stack spacing={2}>
                <Pagination count={count} shape="rounded" page={page} onChange={(_,page)=>onChange(page)}/>
            </Stack>
        </div>
        : null
    )
}