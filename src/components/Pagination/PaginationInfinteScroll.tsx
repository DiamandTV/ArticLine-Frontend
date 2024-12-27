// import { useEffect } from "react"

// interface PaginationInfiniteScrollProps{
//     children
// }
// export function PaginationInfiniteScroll({children}){
//         const lastNotification = useRef<HTMLDivElement | null>(null)
//         const  {data ,status,fetchNextPage,refetch} = useInfiniteQuery({
//             queryKey:['get-notifications'],
//             queryFn:({pageParam=1})=>useNotificationService.getNotifications({pageParam}),
//             initialPageParam:1,
//             pagaParams:1,
//             getNextPageParam:(lastPage:AxiosResponse)=>{
//                 const data = lastPage.data as PaginationModel
//                 console.log("DATA")
//                 console.log(data)
//                 if (!data) return 1
//                 if(data.next) return data.current_page_number + 1
//                 return undefined
                
//             }
//         })
        
//         useEffect(()=>{
//             const observer = new IntersectionObserver(
//                 (entries)=>{
//                     entries.forEach((entry)=>{
//                         if(entry.isIntersecting){
//                             if(entry.target == lastNotification.current){
//                                 fetchNextPage()
//                             }
//                         }
//                     })
//                 },
//                 {
//                     //root:containerRef.current,
//                     rootMargin:'0px',
//                     threshold:0.001
//                 }
//             )
    
//             if(lastNotification.current) {
//                 observer.observe(lastNotification.current)
//             }
    
//             return ()=>{
//                 if(observer){
//                     observer.disconnect()
//                 }
//             }
        
//         },[])
// }