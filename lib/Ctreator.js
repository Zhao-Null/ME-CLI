const { fetchRepoWX, fetchTagWX } = require("./request");
const Inquirer = require("inquirer");
const { wrapLoading } = require("./util");
const downloadGitRepo = require("./download"); // 不支持promise
const util = require("util");
const path = require("path");
const ConfigSpec = require("./ConfigSpec");
class Creator {
    constructor(projectName, targetDir) {
        this.name = projectName;
        this.target = targetDir;
        this.downloadGitRepo = downloadGitRepo;
    }
    async fetchRepo() {
        // 失败重新拉取
        let repos = await wrapLoading(fetchRepoWX, "waiting fetch template");
        if (!repos) return;
        repos = repos.name;
        return repos;
    }
    async fetchTag(repo) {
        let tags = await wrapLoading(fetchTagWX, "waiting fetch tag", repo);
        if (!tags) return;
        tags = tags.map((item) => item.name);
        let { tag } = await Inquirer.prompt({
            name: "tag",
            type: "list",
            choices: tags,
            message: "please choose a tag to create project",
        });
        return tag;
    }
    async download(repo, tag) {
        // 1.需要拼接处下载路径来
        let requestUrl = `Zhao-Null/${repo}${tag ? "#" + tag : ""}`;

        // 放到系统文件中,缓存 TODO ejs handlerbar
        await wrapLoading(
            this.downloadGitRepo,
            "please wait...",
            requestUrl,
            path.resolve(process.cwd(), this.name)
        );
        return this.target;
    }
    async create() {
        // 1) 先去拉取当前组织下的模板
        let repo = await this.fetchRepo();
        // 2) 在通过模板找到版本号
        let tag = await this.fetchTag(repo);
        let config = new ConfigSpec("wx");

        // // 3) 下载
        await this.download(repo, tag);
        config.init();
    }
}

module.exports = Creator;
