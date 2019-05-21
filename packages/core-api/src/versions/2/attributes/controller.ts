import Boom from "boom";
import Hapi from "hapi";
import { Controller } from "../shared/controller";

export class AttributeController extends Controller {

    public async listTypes(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.attributes.listTypes(request);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async getType(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.attributes.getType(request);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async getAttribute(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.attributes.getAttribute(request);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async postAttribute(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.attributes.postAttribute(request);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async putAttribute(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            // @ts-ignore
            return await request.server.methods.v2.attributes.putAttribute(request);

        } catch (error) {
            return Boom.badImplementation(error);
        }
    }


}
