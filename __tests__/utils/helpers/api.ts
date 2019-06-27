import axios from "axios";
import "jest-extended";

export class ApiHelpers {
    public static async request(method, url, headers, params = {}) {
        const url1 = `${url}`;
        let result = {};
        if (method === "GET") {
            try {
                result = await axios.get(url1);
            } catch (e) {
                result = e.response;
            }
        }
        if (method === "POST") {
            try {
                result = await axios.post(url1, params);
            } catch (e) {
                result = e.response;
            }
        }
        if (method === "PUT") {
            try {
                result = await axios.put(url1, params);
            } catch (e) {
                result = e.response;
            }
        }
        console.log("result = " + result);
        console.log("url = " + url);
        return Object.assign(result);
    }

    public static expectJson(response) {
        expect(response.data).toBeObject();
    }

    public static expectStatus(response, code) {
        expect(response.status).toBe(code);
    }

    public static expectResource(response) {
        expect(response.data.data).toBeObject();
    }

    public static expectCollection(response) {
        expect(Array.isArray(response.data.data)).toBe(true);
    }

    public static expectSuccessful(response, statusCode = 200) {
        this.expectStatus(response, statusCode);
        this.expectJson(response);
    }

    public static expectError(response, statusCode = 404) {
        this.expectStatus(response, statusCode);
        this.expectJson(response);
        expect(response.data.statusCode).toBeNumber();
        expect(response.data.error).toBeString();
        expect(response.data.message).toBeString();
    }
}
