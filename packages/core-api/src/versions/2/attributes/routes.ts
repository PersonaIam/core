import Hapi from "hapi";
import { AttributeController } from "./controller";

export const registerRoutes = (server: Hapi.Server): void => {
    const controller = new AttributeController();
    server.bind(controller);
    server.route({
        method: "GET",
        path: "/attributes/types/list",
        handler: controller.listTypes,
        options: {
            // validate: Schema.LIST_TYPES,
        },
    });

    server.route({
        method: "GET",
        path: "/attributes/types",
        handler: controller.getType,
        options: {
            // validate: Schema.GET_TYPE,
        },
    });

    server.route({
        method: "GET",
        path: "/attributes",
        handler: controller.getAttribute,
        options: {
            // validate: Schema.GET_ATTRIBUTE,
        },
    });

    server.route({
        method: "POST",
        path: "/attributes",
        handler: controller.postAttribute,
        options: {
            // validate: Schema.POST_ATTRIBUTE,
        },
    });

    server.route({
        method: "PUT",
        path: "/attributes",
        handler: controller.putAttribute,
        options: {
            // validate: Schema.PUT_ATTRIBUTE,
        },
    });

    // TODO
    //         'post /consume': 'consumeAttribute',
    //         'get /consume': 'getAttributeConsumptions',
    //         'post /runrewardround': 'runRewardRound',
    //         'post /updaterewardround': 'updateRewardRound',
};
