var downloadUrl = require("download");
const util = require("util");
/**
 *
 * @param {String} repo
 * @param {String} dest
 * @param {Object} opts
 * @param {Function} fn
 */

function download(repo, dest, opts) {
    opts = opts || {};

    repo = normalize(repo);
    var url = repo.url || getUrl(repo);
    var downloadOptions = {
        extract: true,
        strip: 1,
        mode: "666",
        ...opts,
        headers: {
            accept: "application/zip",
            ...(opts.headers || {}),
        },
    };
    return downloadUrl(url, dest, downloadOptions);
}

/**
 * @param {String} repo
 * @return {Object}
 */

function normalize(repo) {
    regex = /^(?:(github|gitlab):)?(?:(.+):)?([^/]+)\/([^#]+)(?:#(.+))?$/;
    match = regex.exec(repo);
    var type = match[1] || "github";
    var origin = match[2] || null;
    var owner = match[3];
    var name = match[4];
    var checkout = match[5] || "master";

    if (origin == null) {
        if (type === "github") {
            origin = "github.com";
        } else if (type === "gitlab") {
            origin = "gitlab.com";
        }
    }

    return {
        type: type,
        origin: origin,
        owner: owner,
        name: name,
        checkout: checkout,
    };
}

/**
 * @param {String} url
 * @return {String}
 */

function addProtocol(origin) {
    if (!/^(f|ht)tps?:\/\//i.test(origin)) {
        origin = "https://" + origin;
    }

    return origin;
}

/**
 * @param {Object} repo
 * @return {String}
 */

function getUrl(repo) {
    var url;
    var origin = addProtocol(repo.origin) + "/";
    if (repo.type === "github") {
        url =
            origin +
            repo.owner +
            "/" +
            repo.name +
            "/archive/" +
            repo.checkout +
            ".zip";
    } else if (repo.type === "gitlab") {
        url =
            origin +
            repo.owner +
            "/" +
            repo.name +
            "/repository/archive.zip?ref=" +
            repo.checkout;
    }
    return url;
}
module.exports = download;
