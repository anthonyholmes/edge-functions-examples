import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  if (url.searchParams.get("method") !== "set-response-header") {
    return context.next();
  }

  console.log(`Adding a custom header to the response for ${url}`);

  const response = await context.next();
  response.headers.set("X-Your-Custom-Header", new Date().toISOString());
  // "Cache-Control": "public, max-age=0, must-revalidate",
  // "Netlify-CDN-Cache-Control": "public, max-age=31536000, must-revalidate",

  console.log("CDN CACHE MISS");

  response.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  response.headers.set("CDN-Cache-Control", "public, max-age=31536000, must-revalidate");
  response.headers.set("Netlify-CDN-Cache-Control", "public, max-age=31536000, must-revalidate");

  return response;
};
