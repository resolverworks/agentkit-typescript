import * as fs from "fs";
import * as path from "path";

try {
  const filePath = path.join("secrets", "cdp_api_key.json");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const base64Content = Buffer.from(fileContent).toString("base64");
  console.log("Copy the following line to your environment variables");
  console.log(`ENCODED_COINBASE_API_KEY=${base64Content}`);
} catch (error) {
  console.error("Error reading or encoding file:", error);
}
