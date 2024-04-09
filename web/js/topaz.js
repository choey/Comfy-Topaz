import { app } from "../../scripts/app.js";
import { ComfyWidgets } from "../../scripts/widgets.js";

let tpai_setting;
const id = "comfy.topaz";
const ext = {
    name: id,
    async setup(app) {
        tpai_setting = app.ui.settings.addSetting({
            id,
            name: "Topaz Photo AI (tpai.exe)",
            defaultValue: "C:\\Program Files\\Topaz Labs LLC\\Topaz Photo AI\\tpai.exe",
            type: "string",
        });        
    },
    async beforeRegisterNodeDef(nodeType, nodeData, _app) {
        if (nodeData.name === 'TopazPhotoAI') {
            const ensureTpai = async (node) => {
                const tpaiWidget = node.widgets.find(w => w.name === "tpai_exe");
                if (tpaiWidget && tpaiWidget.value === "") {
                    tpaiWidget.value = tpai_setting.value;
                }
            }

            const onConfigure = nodeType.prototype.onConfigure;
            nodeType.prototype.onConfigure = function () {
                const r = onConfigure ? onConfigure.apply(this, arguments) : undefined;
                ensureTpai(this);
                return r;
            };

            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                const r = onNodeCreated ? onNodeCreated.apply(this, arguments) : undefined;
                ensureTpai(this);
                return r;
            };
        }
    },    
}
app.registerExtension(ext);