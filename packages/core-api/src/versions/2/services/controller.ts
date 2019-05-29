import Boom from "boom";
import Hapi from "hapi";
import { Controller } from "../shared/controller";

export class ServiceController extends Controller {

    public async postService(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.services.postService(request);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async getService(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.services.getService(request);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async listServices(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.services.listServices(request);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async getAttributeTypes(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.services.getAttributeTypes(request);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async activateService(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.services.updateServiceStatus(request, "ACTIVE");
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async inactivateService(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.services.updateServiceStatus(request, "INACTIVE");
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }


}
