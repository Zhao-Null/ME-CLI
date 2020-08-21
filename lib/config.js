const path = require("path");
const fs = require("fs-extra");
const Inquirer = require("inquirer");
const ConfigSpec = require("./ConfigSpec");
module.exports = async function (projectName, options) {
    // 配置项目

    // 配置项目
    const config = new ConfigSpec(projectName, targetDir);
};
