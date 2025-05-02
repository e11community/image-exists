"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
async function run() {
    try {
        const tag = core.getInput('tag', { required: true });
        let exists = false;
        core.info(`Checking for container image tag: ${tag}`);
        try {
            /*
            docker manifest inspect returns a non-zero exit code if the manifest does not exist.
            We redirect stdout and stderr to ignore the output and only check the exit code.
            */
            await exec.exec('docker', ['manifest', 'inspect', tag], {
                listeners: {
                    stdout: () => { },
                    stderr: () => { },
                },
            });
            exists = true; // Command succeeded, tag exists
            core.info(`Image tag ${tag} found.`);
        }
        catch (error) {
            /*
            If the command fails, the tag likely does not exist.
            We don't need to log the specific docker error in this case.
            */
            core.info(`Image tag ${tag} not found.`);
            exists = false;
        }
        core.setOutput('exists', exists);
    }
    catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        }
        else {
            core.setFailed('An unknown error occurred.');
        }
    }
}
run();
