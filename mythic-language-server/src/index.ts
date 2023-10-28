import { STDOUT_LOGGER, Workspace } from "mythic-analyzer";
import { ProposedFeatures, createConnection } from "vscode-languageserver/node.js";

console.log("Mythic-analyzer-vsc SERVER active");
const workspace = new Workspace();
workspace.logger = STDOUT_LOGGER;
workspace.createLSP(createConnection(ProposedFeatures.all));
