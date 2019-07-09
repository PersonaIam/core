import Hapi from "hapi";
import { AttributeValidationsController } from "./controller";

export const registerRoutes = (server: Hapi.Server): void => {
    const controller = new AttributeValidationsController();
    server.bind(controller);
    server.route({
        method: "GET",
        path: "/attribute-validations/validationrequest",
        handler: controller.getAttributeValidationRequest,
        options: {},
    });

    server.route({
        method: "POST",
        path: "/attribute-validations/validationrequest",
        handler: controller.createAttributeValidationRequest,
        options: {},
    });

    server.route({
        method: "POST",
        path: "/attribute-validations/approve",
        handler: controller.approveAttributeValidationRequest,
        options: {},
    });

    server.route({
        method: "POST",
        path: "/attribute-validations/decline",
        handler: controller.declineAttributeValidationRequest,
        options: {},
    });

    server.route({
        method: "POST",
        path: "/attribute-validations/cancel",
        handler: controller.cancelAttributeValidationRequest,
        options: {},
    });

    server.route({
        method: "POST",
        path: "/attribute-validations/notarize",
        handler: controller.notarizeAttributeValidationRequest,
        options: {},
    });

    server.route({
        method: "POST",
        path: "/attribute-validations/reject",
        handler: controller.rejectAttributeValidationRequest,
        options: {},
    });

    server.route({
        method: "GET",
        path: "/attribute-validations/validationscore",
        handler: controller.getAttributeValidationScore,
        options: {},
    });

    server.route({
        method: "GET",
        path: "/attribute-validations/credibility",
        handler: controller.getAttributeCredibility,
        options: {},
    });
};
