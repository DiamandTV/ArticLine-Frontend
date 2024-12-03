import { FixedSizeDropdown } from "../Dropdown/FixedSizeDropdown";

const list = ['PIZZA','SUSHI','DESSERT']

export function MultiSelectInput() {
    const filterFunction = (e:React.ChangeEvent<HTMLInputElement>)=>{
    
        const regex = new RegExp(e.target.value, "i");
        if (e.target.value.trim() === "") return list;
        return list.filter((item) => item.match(regex));
    }
    return (
        <div className="w-full flex flex-row ">
            <FixedSizeDropdown
                labelName="CATEGORIES"
                name="store_categories"
                list={list}
                showFunction={(item)=>item as string}
                filterFunction={filterFunction}
            />
            <div></div>
        </div>
    )
}
