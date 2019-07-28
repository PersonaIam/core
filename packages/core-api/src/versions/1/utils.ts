import Boom from "boom";
import Hapi from "hapi";
import { transformerService } from "../../services/transformer";

function paginate(request: Hapi.Request): any {
    return {
        // @ts-ignore
        offset: request.query.offset || 0,
        // @ts-ignore
        limit: request.query.limit || 100,
    };
}

function respondWith(data, error = false): object {
    return error ? { error: data, success: false } : { ...data, success: true };
}

function respondWithCache(data, h): any {
    return data.isBoom
        ? h.response(data.output.payload).code(data.output.statusCode)
        : h.response(data).header("Last-modified", new Date());
}

function toResource(request, data, transformer): object {
    return transformerService.toResource(request, data, transformer);
}

function toCollection(request, data, transformer): object {
    return transformerService.toCollection(request, data, transformer);
}

export { paginate, respondWith, respondWithCache, toResource, toCollection };
