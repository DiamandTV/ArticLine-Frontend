
import { CategoryList } from "../components/lists/Category/CategoryList";
import { StoreHomeList } from "@features/store/components/list/StoreList";

export function HomePage() {
    return (
        <div className="flex flex-col gap-2 @container my-mb-df mx-mb-df md:mx-df">
            <CategoryList />
            <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] ">
                <StoreHomeList/>
            </div>
        </div>
    );
}
