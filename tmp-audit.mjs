const base = "http://localhost:3000";
const pages = ["/", "/services", "/portfolio", "/about", "/contact"];
const folders = [
  "HDR/",
  "Exterior/",
  "Aerial/",
  "Aerial Cleanup/",
  "Aerial Borderline/",
  "Exterior Cleanup/",
  "Twilight/",
];

let bad = 0;
const nonFolder = new Set();
const total = new Set();

for (const p of pages) {
  const html = await (await fetch(base + p)).text();
  const uniq = [
    ...new Set(
      [...html.matchAll(/\/_next\/image\?url=([^"&\\]+)/g)].map((m) => decodeURIComponent(m[1])),
    ),
  ];
  for (const u of uniq) {
    total.add(u);
    if (!folders.some((f) => u.startsWith("/Images/" + f))) nonFolder.add(u);
    const r = await fetch(`${base}/_next/image?url=${encodeURIComponent(u)}&w=640&q=75`);
    if (!r.ok) {
      bad++;
      console.log("BROKEN", r.status, u);
    }
  }
  console.log(p.padEnd(11), "imgs:", String(uniq.length).padStart(3));
}

console.log("\ntotal unique images:", total.size, "| broken:", bad);
console.log("non-folder images still rendered:", nonFolder.size);
[...nonFolder].sort().forEach((u) => console.log("   ", u));
