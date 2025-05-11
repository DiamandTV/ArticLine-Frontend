
import { PaddingView } from "@views/PaddingView";
import { CategoryList } from "../components/lists/Category/CategoryList";
import { StoreHomeList } from "@features/store/components/list/StoreList";

export function HomePage() {
    return (
        <PaddingView className="flex flex-col gap-2">
            <CategoryList />
            <div className="w-full">
                <StoreHomeList/>
            </div>
        </PaddingView>
    );
}
