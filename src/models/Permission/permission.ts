import { AbilityBuilder,  MongoAbility } from "@casl/ability";
import { ProductInterface } from "@features/store/model/Product/Interface/ProductInterface";
import { StoreInterface } from "@features/store/model/Store/Interface/StoreInterface";
import { StoreCategoryInterface } from "@features/store/model/StoreCategory/Interface/StoreCategoryInterface";
// type InterfaceWithKind<Type,Name> = Type & {
//   __caslSubjectType__ :Name
// }
type Actions = 'read' | 'create' | 'update' | 'delete' | 'settings'
type Subjects = 
    StoreInterface | 'Store' |
    StoreCategoryInterface | 'Store Category' |
    ProductInterface | 'Product'|
    //{} | 'Store Create' |
    {store:{company_profile:number}} | 'Store Category Create' |
    {store_category:{store:{company_profile:number}}} | 'Product Create' |  
    'all'
export type AppAbility = MongoAbility<[Actions,Subjects]>

export interface AbilityBuilderParams  {
    can: AbilityBuilder<AppAbility>['can'];
    cannot: AbilityBuilder<AppAbility>['cannot'];
}