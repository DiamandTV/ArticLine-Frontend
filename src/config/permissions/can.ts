
import { createContext } from "react";
import { createContextualCan } from '@casl/react';
import { createMongoAbility } from "@casl/ability";
import { AppAbility, SubjectsType } from "@models/Permission/permission";


export function CaslSubject<T,K extends SubjectsType>(obj:T,name:K){
    const typeWithKind:T&{__caslSubjectType__:K} = {...obj,__caslSubjectType__:name}
    return typeWithKind
}

export const AbilityContext = createContext(createMongoAbility<AppAbility>([]))
export const Can = createContextualCan(AbilityContext.Consumer)