"use strict";
const axios_1 = require("axios");
const CONFIG = {
    API: "https://kutt.it",
    KEY: "",
    DOMAIN: undefined,
};
class Kutt {
    constructor() {
        this.config = CONFIG;
        this.axios = axios_1.default.create({
            baseURL: this.config.API,
            headers: {
                "X-API-Key": this.config.KEY,
            },
        });
    }
    setAPI(api) {
        this.config.API = api;
        return this;
    }
    ;
    setKey(key) {
        this.config.KEY = key;
        return this;
    }
    ;
    setDomain(domain) {
        this.config.DOMAIN = domain;
        return this;
    }
    ;
    getUrls(callback) {
        const request = this.axios.get("/api/url/geturls");
        if (!callback)
            return request;
        request
            .then((urls) => callback(null, urls))
            .catch((err) => callback(err));
    }
    ;
    submit(data, callback) {
        const request = this.axios.post("/api/url/submit", data);
        if (!callback)
            return request;
        request
            .then((url) => callback(null, url))
            .catch((err) => callback(err));
    }
    ;
    delete(id, callback) {
        const request = this.axios.post("/api/url/deleteurl", {
            id,
            domain: this.config.DOMAIN,
        });
        if (!callback)
            return request;
        request
            .then((url) => callback(null, url))
            .catch((err) => callback(err));
    }
    ;
}
Kutt.setAPI = (api) => CONFIG.API = api;
Kutt.setKey = (key) => CONFIG.KEY = key;
Kutt.setDomain = (domain) => CONFIG.DOMAIN = domain;
module.exports = Kutt;
