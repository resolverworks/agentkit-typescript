import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";
import fetch from "node-fetch";
import { hashMessage } from "viem";

const defaultAvatars = [
  "https://imagedelivery.net/UJ5oN2ajUBrk2SVxlns2Aw/6d90b9ba-6d9f-4aed-121b-f1affc4bc300/public",
  "https://imagedelivery.net/UJ5oN2ajUBrk2SVxlns2Aw/b58a5578-1289-4fb4-7bc8-6eca79058900/public",
  "https://imagedelivery.net/UJ5oN2ajUBrk2SVxlns2Aw/7850881a-ff56-4826-0e5b-804f331d4500/public",
];

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
    // Set Default Avatar if one is not provided
    const avatarURL =
      process.env.AVATAR_URL ||
      defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];
    const jsonPayload = {
      address: process.env.WALLET_ADDRESS,
      name: process.env.AGENT_NAME,
      text_records: {
        description: process.env.AGENT_DESCRIPTION,
        url: process.env.AGENT_WEBSITE,
        avatar: avatarURL,
        publish: process.env.PUBLISH_AGENT,
      },
      signature: signature,
    };
    console.log(jsonPayload);

    // Submit name setting request to AgentKit
    const setNameResponse = await fetch("https://agentkit.id/api/set-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonPayload),
    });
    if (!setNameResponse.ok) {
      const result = await setNameResponse.json();
      throw new Error(result.error);
    }

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
