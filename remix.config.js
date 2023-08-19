/** @type {import('@remix-run/dev').AppConfig} */
export const ignoredRouteFiles = ["**/.*"];
// export const server = process.env.NODE_ENV === "development" ? undefined : "./server.ts";
// export const serverBuildPath = "api/index.js";
export const tailwind = true;
export const serverModuleFormat = "cjs";
export const future = {
  v2_dev: true,
  v2_errorBoundary: true,
  v2_headers: true,
  v2_meta: true,
  v2_normalizeFormMethod: true,
  v2_routeConvention: true,
};
