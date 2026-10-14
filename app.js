import { readFile, writeFile } from "fs/promises";
import { createServer } from "http";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "data", "links.json");

const routes = {
  "/": { file: "index.html", contentType: "text/html" },
  "/style.css": { file: "style.css", contentType: "text/css" },
  "/script.js": { file: "script.js", contentType: "text/javascript" },
  "/links.json": { file: "links.json", contentType: "application/json" },
};

const serverFile = async (res, filePath, contentType) => {
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("404 Page Not Found.");
  }
};

const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8");

    // ✅ Handle empty / whitespace-only file
    if (!data.trim()) {
      return {};
    }

    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
};

const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links));
};

const server = createServer(async (req, res) => {
  //? console.log(req.method, req.url);

  //* Post Method
  if (req.method === "POST" && req.url === "/shorten") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const links = await loadLinks();

        let parsed;
        try {
          parsed = JSON.parse(body);
        } catch {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ success: false, error: " Invalid JSON" }),
          );
        }

        const { url, shortCode } = parsed;

        if (!url) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          return res.end("URL is required.");
        }

        const finalShortCode =
          shortCode || crypto.randomBytes(4).toString("hex");
        if (links[finalShortCode]) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          return res.end(
            JSON.stringify({
              success: false,
              error: " Short code already exists. Please choose another.",
            }),
          );
        }

        links[finalShortCode] = url;
        await saveLinks(links);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, shortCode: finalShortCode }));
      } catch (err) {
        // ✅ Catch EVERYTHING so the server never crashes
        console.error("POST /shorten error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: " Server error" }));
      }
    });

    return;
  }

  //* GET /links (dynamic JSON of all saved links)
  if (req.method === "GET" && req.url === "/links") {
    try {
      const links = await loadLinks();
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(links));
    } catch (err) {
      console.error("GET /links error:", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Server error" }));
    }
  }

  //* GET static files (index.html, style.css, script.js, etc.)
  if (req.method === "GET" && routes[req.url]) {
    const route = routes[req.url];
    const filePath = path.join(__dirname, "public", route.file);
    return serverFile(res, filePath, route.contentType);
  }

  //* GET short code → redirect (catch-all for GET)
  if (req.method === "GET") {
    try {
      const shortCode = req.url.slice(1); // remove leading "/"
      const links = await loadLinks();

      console.log("Short code requested:", shortCode);

      if (links[shortCode]) {
        res.writeHead(302, { Location: links[shortCode] });
        return res.end();
      }

      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Short code not found.");
    } catch (err) {
      console.error("Redirect error:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end("Server error");
    }

    // ---------- Everything else ----------
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
