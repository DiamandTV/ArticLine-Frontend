
import { createContext } from "react";
import { createContextualCan } from '@casl/react';
import { createMongoAbility } from "@casl/ability";
import { AppAbility } from "@models/Permission/permission";


export const AbilityContext = createContext(createMongoAbility<AppAbility>([]))
export const Can = createContextualCan(AbilityContext.Consumer)