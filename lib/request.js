// 通过axios来获取结果

const axios = require("axios");

axios.interceptors.response.use((res) => res.data);

async function fetchRepoWX() {
    return axios.get("https://api.github.com/repos/Zhao-Null/weixinXCX");
}

async function fetchTagWX(repo) {
    return axios.get(
        `https://api.github.com/repos/Zhao-Null/${repo}/tags`
    );
}

module.exports = {
    fetchRepoWX,
    fetchTagWX,
};
// https://github.com/Zhao-Null/weixinXCX
