import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";

async function main() {
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

  // Create wallet and get default address
  const wallet = await Wallet.create();
  const address = await wallet.getDefaultAddress();
  const walletExport = wallet.export();

  console.log("Copy the following lines to your environment variables");
  console.log(`WALLET_NETWORK=${address.getNetworkId()}`);
  console.log(`WALLET_ID=${walletExport.walletId}`);
  console.log(`WALLET_ADDRESS=${address.getId()}`);
  console.log(`WALLET_SEED=${walletExport.seed}`);
}

main().catch(console.error);
