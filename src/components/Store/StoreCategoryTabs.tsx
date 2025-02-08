import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import {v4 as uuid} from "uuid"
import { StoreCategoryEditPopUpWithButton } from "../PopUps/StoreCategoryEditPopUpWithButton";
import {closestCenter, DndContext, DragEndEvent,} from '@dnd-kit/core';
import { StoreModel } from "../../models/store";
import { StoreCategoriesModel } from "../../models/StoreCategories";
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { updateStoreCategories } from "../../store/storeSlice";
import { CSS } from "@dnd-kit/utilities";
import { TbDragDrop } from "react-icons/tb";
import {
    restrictToParentElement
  ,
  } from '@dnd-kit/modifiers';
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

export function StoreCategoryTabs(){
    const dispatch = useDispatch()
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    const handleDragEnd = (event:DragEndEvent)=>{
        const {active,over } = event;
        if(!over?.id || !active?.id ) return;
    
        const start = active.id as string;
        const end = over.id as string
        const oldIndex = store?.store_categories?.findIndex((cat)=>cat.id!.toString() === start)
        const newIndex = store?.store_categories?.findIndex((cat)=>cat.id!.toString() === end)
        if(oldIndex != undefined && newIndex != undefined){
            const store_categories_updated = arrayMove(store!.store_categories as StoreCategoriesModel[],oldIndex,newIndex)
            dispatch(updateStoreCategories(store_categories_updated))
            // todo : send a request to the to tell it about the position change
        }
        
    }

    return (
        store && store.store_categories ? 
        <div className="w-full max-h-max flex flex-row gap-y-4 gap-x-2">
            <DndContext modifiers={[restrictToParentElement]} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={store.store_categories.map((cate)=>cate.id!.toString())}
                        //strategy={verticalListSortingStrategy}
                    >
                    <CategoryTabs/>
                </SortableContext>
            </DndContext>
            <StoreCategoryEditPopUpWithButton/>
        </div> 
         : null
    )
}

function CategoryTabs(){
    const store = useSelector((state:RootState)=>state.storeReducer.store)

    return (
        <div   
                
            //className="w-full rounded-xl hover:cursor-pointer border-2 border-gray-700"    
            className="w-full flex flex-row justify-start gap-x-8 bg-slate-200 bg-opacity-30 backdrop-blur-lg rounded-xl sticky top-0 px-4"    
            // value={value} 
            // onChange={(_,value)=>{
            //     alert(value)
            //     setValue(value)
            //     }}
            >  
                {store?.store_categories?.map((category)=>(
                    <CategoryTab key={uuid()} store={store} category={category}/>
                ))}
        </div>
    )
}


function CategoryTab({ store, category}: { store: StoreModel; category: StoreCategoriesModel }) {
    
    const id = category?.id?.toString() ?? '-1'
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: id});
    

    const style = transform ? {
        transform: CSS.Transform.toString(transform),
        transition, // Opzionale, per rendere il movimento più fluido
    } : undefined;

    if(!category?.id) return
    return (
        
        <div
            className="h-full flex flex-row justify-center items-center"
            ref={setNodeRef} style={style}
        >
            <TabComponent 
                        store={store}
                        category={category}
                        attributes={attributes}
                        listeners={listeners}
                    
                    />
        </div>
    );
}

interface CategoryTabIntern{
    store:StoreModel,
    category:StoreCategoriesModel,
    attributes: {
        role: string;
        tabIndex: number;
        'aria-pressed': boolean | undefined;
        'aria-roledescription': string;
        'aria-describedby': string;
    },
    listeners:SyntheticListenerMap | undefined,
 

}

function TabComponent({store,category,attributes,listeners}:CategoryTabIntern){
    const navigate = useNavigate()
    const params = useParams()
    const storeCategoryIdFromParam = params['sub-category-id']

    if(!storeCategoryIdFromParam) return
    const current  = storeCategoryIdFromParam === category.id!.toString()
    return(
        <div
            className={`max-w-max flex flex-row gap-2 justify-center items-end ${current ? 'text-lg font-bold text-white' : 'text-lg font-light'}`}  
            onClick={(event) => {
                alert("Ok")
                navigate(`/store/details/${store.id}/sub-category/${category.id}`);
                event.stopPropagation()
            }}
        >
            <h5>{category.name.toUpperCase()}</h5>
            <TbDragDrop 
                size={current ? 20 : 20}
                {...attributes}
                {...listeners}
            />
        </div>
    ) 
}

