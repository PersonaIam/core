import Hapi from "hapi";
import { IdentityUsesController } from "./controller";

export function registerRoutes(server: Hapi.Server): void {
    const controller = new IdentityUsesController();
    server.bind(controller);
    server.route({
        method: "GET",
        path: "/identity-use",
        handler: controller.getIdentityUsesRequest,
        options: {},
    });

    server.route({
        method: "POST",
        path: "/identity-use",
        handler: controller.createIdentityUseRequest,
        options: {},
    });

    server.route({
        method: "POST",
        path: "/identity-use/approve",
        handler: controller.approveIdentityUseRequest,
        options: {},
    });

    server.route({
        method: "POST",
        path: "/identity-use/decline",
        handler: controller.declineIdentityUseRequest,
        options: {},
    });

    server.route({
        method: "POST",
        path: "/identity-use/cancel",
        handler: controller.cancelIdentityUseRequest,
        options: {},
    });

    server.route({
        method: "POST",
        path: "/identity-use/notarize",
        handler: controller.notarizeIdentityUseRequest,
        options: {},
    });

    server.route({
        method: "POST",
        path: "/identity-use/end",
        handler: controller.endIdentityUseRequest,
        options: {},
    });
}
