import { createContext } from "react";
import { createContextualCan } from '@casl/react';
import { createMongoAbility } from "@casl/ability";
export const AbilityContext = createContext(createMongoAbility([]))
export const Can = createContextualCan(AbilityContext.Consumer)