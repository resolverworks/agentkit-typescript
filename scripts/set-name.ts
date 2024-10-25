import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";
import fetch from "node-fetch";
import { hashMessage } from "viem";

// FILL OUT THESE VARIABLES
const AGENT_NAME = "my-agent-name";
const AGENT_DESCRIPTION = "My agent description";
const AGENT_WEBSITE = "https://google.com";

async function setWalletName() {
  try {
    // Decode coinbase key and parse as JSON
    const encodedKey = process.env.ENCODED_COINBASE_API_KEY;
    const decodedKey = Buffer.from(encodedKey as string, "base64").toString(
      "utf8"
    );
    const credentials = JSON.parse(decodedKey);
    // Initialize Coinbase with decoded credentials
    Coinbase.configure({
      apiKeyName: credentials.name,
      privateKey: credentials.privateKey,
    });

    console.group("Importing wallet...");
    // Initialize wallet from seed
    const wallet = await Wallet.import({
      walletId: process.env.WALLET_ID as string,
      seed: process.env.WALLET_SEED as string,
    });

    console.log("Signing message...");
    // Get SIWE message from AgentKit
    const siweResponse = await fetch(
      `https://agentkit.id/api/siwe-message?address=${process.env.WALLET_ADDRESS}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const message = await siweResponse.text();

    // Sign the message with the wallet
    const signaturePayload = await wallet.createPayloadSignature(
      hashMessage(message)
    );
    const signature = signaturePayload.getSignature();
    console.log("Signature created successfully:", signature);

    console.log("Setting name...");
    // Submit name setting request to AgentKit
    const setNameResponse = await fetch("https://agentkit.id/api/set-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: process.env.WALLET_ADDRESS,
        name: AGENT_NAME,
        text_records: {
          description: AGENT_DESCRIPTION,
          url: AGENT_WEBSITE,
        },
        signature: signature,
      }),
    });

    const result = await setNameResponse.json();
    console.log("Name set successfully:", result);
  } catch (error) {
    console.error(
      "Error setting wallet name:",
      error instanceof Error ? error.message : String(error)
    );
    throw error;
  }
}

// Example usage
if (require.main === module) {
  setWalletName().catch(console.error);
}

export { setWalletName };
