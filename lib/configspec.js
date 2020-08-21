
class ConfigSpec {
    constructor(type) {
        this.type = type;
    }
    init() {
        console.log("config");
        if (this.type == "wx") {
            this.wxConfig();
        }
    }
    wxConfig() {
        return;
    }
}
module.exports = ConfigSpec;
