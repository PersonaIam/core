import Hapi from "hapi";
import { ServiceController } from "./controller";

export const registerRoutes = (server: Hapi.Server): void => {
    const controller = new ServiceController();
    server.bind(controller);

    server.route({
        method: "POST",
        path: "/services",
        handler: controller.postService,
        options: {},
    });

    server.route({
        method: "GET",
        path: "/services",
        handler: controller.getService,
        options: {},
    });

    server.route({
        method: "GET",
        path: "/services/list",
        handler: controller.listServices,
        options: {},
    });

    server.route({
        method: "GET",
        path: "/services/attributeTypes",
        handler: controller.getAttributeTypes,
        options: {},
    });

    server.route({
        method: "PUT",
        path: "/services/inactivate",
        handler: controller.inactivateService,
        options: {},
    });

    server.route({
        method: "PUT",
        path: "/services/activate",
        handler: controller.activateService,
        options: {},
    });
};
