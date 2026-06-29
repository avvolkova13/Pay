import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true";
const githubPagesBasePath = "/Pay";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPagesBuild ? githubPagesBasePath : undefined,
  turbopack: {
    root: projectRoot
  }
};

export default nextConfig;
