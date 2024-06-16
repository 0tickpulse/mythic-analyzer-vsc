// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { join } from "path";
import * as vscode from 'vscode';
import { ForkOptions, LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from "vscode-languageclient/node";

let client: LanguageClient;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log("Mythic-analyzer-vsc active");
	const serverModule = context.asAbsolutePath(join("mythic-language-server", "dist", "server.js"));
    console.log(`Mythic Language Client
        Node Version: ${process.version}
        File: ${__filename}`);
    console.log(`Attempting to start server from '${serverModule}'...`);
    const debugOptions: ForkOptions = { execArgv: ["--nolazy", "--inspect-brk=6009"] };
    const serverOptions: ServerOptions = {
        run: {
            module: serverModule,
            transport: TransportKind.ipc,
        },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: debugOptions,
        },
    };
    const clientOptions: LanguageClientOptions = {
        documentSelector: [
            {
                scheme: "file",
                language: "yaml",
            },
        ],
    };

    context.subscriptions.push(
        vscode.commands.registerCommand("mythic-analyzer-vsc.restartServer", () => {
            client.stop().then(() => client.start());
        }),
    );

    const status = vscode.window.createStatusBarItem();
    fullParseDefaultStatus(status);
    status.show();

    client = new LanguageClient("mythicLanguageServer", "Mythic Language Server", serverOptions, clientOptions);
    context.subscriptions.push(status);

    client.start();
    console.log("Server started!");
}

function fullParseDefaultStatus(status: vscode.StatusBarItem) {
    status.text = "Mythic Language Server";
}

// This method is called when your extension is deactivated
export function deactivate() {}
