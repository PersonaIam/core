import Hapi from "hapi";
import { registerMethods } from "./methods";
import { registerRoutes } from "./routes";

export const register = (server: Hapi.Server): void => {
    registerMethods(server);
    registerRoutes(server);
};
