/**
 * Submit every sitemap URL to IndexNow (Bing, Yandex, Seznam, Naver…).
 * Bing's index feeds ChatGPT search and Copilot, so this speeds up AI-search discovery.
 * Google does not use IndexNow; use Search Console for Google.
 *
 * Usage (after a production deploy):  npm run indexnow
 * Optional: SITE_URL=https://devsroute.com npm run indexnow
 */
const KEY = "d3d0c59c9aebb9b4fb74312f0926cfc6";
const origin = (process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://devsroute.com").replace(/\/+$/, "");
const host = new URL(origin).host;

const sitemap = await fetch(`${origin}/sitemap.xml`, { redirect: "manual" });
if (sitemap.status !== 200) {
  console.error(`${origin}/sitemap.xml returned ${sitemap.status}. Is ${origin} the host that serves 200 (not a redirect)?`);
  process.exit(1);
}
const urlList = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const offHost = urlList.filter((u) => new URL(u).host !== host);
if (offHost.length) {
  console.error(`Sitemap lists ${offHost.length} URL(s) on a different host than ${host}, e.g. ${offHost[0]}. Fix NEXT_PUBLIC_SITE_URL first.`);
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${origin}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} — submitted ${urlList.length} URLs for ${host}`);
if (res.status >= 400) process.exit(1);
