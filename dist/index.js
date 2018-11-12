"use strict";
const axios_1 = require("axios");
const CONFIG = {
    API: "https://kutt.it",
    KEY: "",
    DOMAIN: undefined,
};
class Kutt {
    constructor() {
        this._config = CONFIG;
    }
    _request(method, path, data, callback) {
        if (typeof data === "function") {
            callback = data;
            data = undefined;
        }
        const request = axios_1.default({
            method,
            data,
            baseURL: this._config.API,
            url: path,
            headers: {
                "X-API-Key": this._config.KEY,
            },
        });
        if (!callback)
            return request;
        request
            .then(response => callback(null, response.data))
            .catch((err) => callback(err));
    }
    /**
     * Sets instance's API address
     */
    setAPI(api) {
        this._config.API = api;
        return this;
    }
    /**
     * Sets instance's API key
     */
    setKey(key) {
        this._config.KEY = key;
        return this;
    }
    /**
     * Sets instance's custom domain
     */
    setDomain(domain) {
        this._config.DOMAIN = domain;
        return this;
    }
    list(callback) {
        return this._request("get", "/api/url/geturls", callback);
    }
    submit(data, callback) {
        return this._request("post", "/api/url/submit", data, callback);
    }
    delete(id, callback) {
        return this._request("post", "/api/url/deleteurl", {
            id,
            domain: this._config.DOMAIN,
        }, callback);
    }
    stats(id, callback) {
        const domain = this._config.DOMAIN;
        return this._request("get", `/api/url/stats?id=${id}${domain ? `&domain=${domain}` : ""}`, callback);
    }
}
/**
 * Sets global API address
 */
Kutt.setAPI = (api) => CONFIG.API = api;
/**
 * Sets global API key
 */
Kutt.setKey = (key) => CONFIG.KEY = key;
/**
 * Sets global custom domain
 */
Kutt.setDomain = (domain) => CONFIG.DOMAIN = domain;
module.exports = Kutt;
