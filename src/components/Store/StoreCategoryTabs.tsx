import { Tab, Tabs } from "@mui/material";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import {v4 as uuid} from "uuid"
import { StoreCategoryEditPopUpWithButton } from "../PopUps/StoreCategoryEditPopUpWithButton";
import {DndContext, DragEndEvent, useDraggable, useDroppable} from '@dnd-kit/core';
import { StoreModel } from "../../models/store";
import { StoreCategoriesModel } from "../../models/StoreCategories";
import { arrayMove } from '@dnd-kit/sortable';
import { updateStoreCategories } from "../../store/storeSlice";
const getTabStyle = ()=>({
    "&.MuiTab-root":{
        color:"white",
        opacity:0.6,
        fontWeight:"100",
        fontSize:"12px",
        // borderRight:"2px solid rgb(51 65 85)",
        // borderLeft:"2px solid rgb(51 65 85)"
    },
    "&.Mui-selected":{
        borderBottomColor:"red",
        color:'white',
        opacity:1,
        fontWeight:"600",
        fontSize:"18px",
        
    },   
    
})

export function StoreCategoryTabs(){
    const dispatch = useDispatch()
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    const handleDragEnd = (event:DragEndEvent)=>{
        const {active,over } = event;
        if(!over?.id || !active?.id ) return;
    
        const start = active.id as string;
        const end = over.id as string;
        
        alert(start)
        alert(end)
        if(store?.store_categories && start && end && start !== '-1' && end !== '-1'){
            const store_categories_updated = arrayMove(store!.store_categories as StoreCategoriesModel[],Number(start),Number(end))
            dispatch(updateStoreCategories(store_categories_updated))
            // console.error()
            // console.error(updated)
        }
    }

    return (
        <div className="w-full max-h-max flex flex-row gap-y-4 gap-x-2">
            <DndContext onDragEnd={handleDragEnd}>
                <CategoryTabs/>
            </DndContext>
            <StoreCategoryEditPopUpWithButton/>
        </div> 
    )
}

function CategoryTabs(){
    const [value,setValue] = useState(0)
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    const {setNodeRef} = useDroppable({
        id:'0',
    })
    
    return (
        <Tabs   
            ref={setNodeRef}
            TabIndicatorProps={{style:{
                //backgroundColor:"#0ea5e9",
                backgroundColor:"transparent",
                height:"3px",
                
            }}}    
            //className="w-full rounded-xl hover:cursor-pointer border-2 border-gray-700"    
            className="w-full bg-slate-200 bg-opacity-30 backdrop-blur-lg rounded-xl sticky top-0"    
            value={value} 
            onChange={(_,value)=>setValue(value)}>  
                {store?.store_categories?.map((category)=>(
                    <CategoryTab key={uuid()} store={store} category={category}/>
                ))}
        </Tabs>
    )
}


function CategoryTab({ store, category }: { store: StoreModel; category: StoreCategoriesModel }) {
    const navigate = useNavigate();
    const id = category.id?.toString() ?? null
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id || "unknown-category",
    });

    const style = transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: "transform 150ms ease", // Opzionale, per rendere il movimento più fluido
    } : undefined;

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <Tab
                sx={getTabStyle()}
                label={category.name}
                onClick={() => {
                    navigate(`/store/details/${store.id}/sub-category/${category.id}`);
                }}
            />
        </div>
    );
}

