import { STDOUT_LOGGER, Workspace } from "mythic-analyzer";
import { ProposedFeatures, createConnection } from "vscode-languageserver/node.js";

console.log("Mythic-analyzer-vsc SERVER active");
const workspace = new Workspace();
workspace.logger = STDOUT_LOGGER;
try {
    workspace.createLSP(createConnection(ProposedFeatures.all));
} catch (e) {
    console.error((e as any).stack);
}
