import { RouteObject } from "react-router";

export interface RouteGroup {
    routesWithLayout: RouteObject[];
    standaloneRoutes: RouteObject[];
}

export interface FeatureRoutes {
    protected: RouteGroup;
    public: RouteGroup;
}
  
