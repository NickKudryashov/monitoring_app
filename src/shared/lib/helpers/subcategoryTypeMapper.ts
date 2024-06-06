import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";

export const ROUTE_MAPPER: Record<string, string> = {
    heat_energy_node: RoutePathAuth.heat_subcat,
    auto_node: RoutePathAuth.auto_subcat,
    pump_station_node: RoutePathAuth.pump_subcat,
    electro_energy_node: RoutePathAuth.el_subcat,
};