import { createContext } from "react";
import { NavigateFunction } from "react-router";

export const NavigatorContext = createContext<NavigateFunction|null>(null)