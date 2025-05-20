import { AbilityBuilder,  InferSubjects, PureAbility } from "@casl/ability";
import { ProductInterface } from "@features/store/model/Product/Interface/ProductInterface";
import { StoreInterface } from "@features/store/model/Store/Interface/StoreInterface";
import { StoreCategoryInterface } from "@features/store/model/StoreCategory/Interface/StoreCategoryInterface";
import { FlattenInterfaceWithKind } from "@utils/typescript/flattern";
export type InterfaceWithKind<Type,Name> = Type & {
   __caslSubjectType__ :Name
}
export type Actions = 'read' | 'create' | 'update' | 'delete' | 'settings'
// type Subjects = 
//     StoreInterface | 'Store' |
//     StoreCategoryInterface | 'Store Category' |
//     ProductInterface | 'Product'|
//     //{} | 'Store Create' |
//     {store:{company_profile:number}} | 'Store Category Create' |
//     {store_category:{store:{company_profile:number}}} | 'Product Create' |  
//     'all'

type InterfaceSubjects = 
    InterfaceWithKind<StoreInterface,'Store'> | 
    InterfaceWithKind<StoreCategoryInterface,'Store Category'> | InterfaceWithKind<{store:{company_profile:number}},'Store Category Create'> |
    InterfaceWithKind<ProductInterface,'Product'> | InterfaceWithKind<{store_category:{store:{company_profile:number}}},'Product Create'> |
    InterfaceWithKind<unknown,'Business'>

type FlatternInterfaceSubjects = FlattenInterfaceWithKind<InterfaceSubjects>;


export type Subjects = InferSubjects<InterfaceSubjects>
export type FlatternSubjects = InferSubjects<FlatternInterfaceSubjects>


export type SubjectsType = Extract<Subjects,string>


export type AppAbility = PureAbility<[Actions,Subjects]>

export interface AbilityBuilderParams  {
    can: AbilityBuilder<AppAbility>['can'];
    cannot: AbilityBuilder<AppAbility>['cannot'];
}