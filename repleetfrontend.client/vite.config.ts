import { fileURLToPath, URL } from 'node:url';


import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';
import { defineConfig, loadEnv } from 'vite'


const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "repleetfrontend.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7149';


// https://vitejs.dev/config/


export default defineConfig(({ mode }) => {
    // Load environment variables based on the mode (e.g., development, production, or a custom mode)
    const env = loadEnv(mode, process.cwd());

    return {
        define: {
            // Using environment variables inside your config file
            'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
        },
        plugins: [plugin()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            proxy: {
                
                '^/pingauth': {
                    target: env.VITE_API_URL,
                    secure: true
                },
                '^/register': {
                    target: env.VITE_API_URL,
                    secure: true
                },
                '^/login': {
                    target: env.VITE_API_URL,
                    secure: true
                },
                '^/logout': {
                    target: env.VITE_API_URL,
                    secure: true
                },
                '^/api/ProblemsAPI/submitratings': {
                    target: env.VITE_API_URL,
                    secure: true
                },
                '^/api/ProblemsAPI/getnextproblem': {
                    target: env.VITE_API_URL,
                    secure: true
                },
                '^/api/ProblemsAPI/submitproblem': {
                    target: env.VITE_API_URL,
                    secure: true
                },
                '^/api/ProblemsAPI/getcategoryprogress': {
                    target: env.VITE_API_URL,
                    secure: true
                }

            },

            port: 5173,
            https: {
                key: fs.readFileSync(keyFilePath),
                cert: fs.readFileSync(certFilePath),
            }

        },
    };
});

