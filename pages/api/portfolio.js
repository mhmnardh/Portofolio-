import fs from "fs";
import { join } from "path";

export default function handler(req, res) {
  if (process.env.NODE_ENV !== "development") {
    return res.status(404).json({ error: "Not found" });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({ error: "Invalid portfolio data" });
  }

  const portfolioData = join(process.cwd(), "data", "portfolio.json");

  try {
    fs.writeFileSync(portfolioData, JSON.stringify(req.body), "utf-8");
    return res.status(200).json({ status: "SAVED" });
  } catch (error) {
    console.error("Failed to save portfolio data:", error);
    return res.status(500).json({ error: "Unable to save portfolio data" });
  }
}
