import { NextResponse } from "next/server";
import { Coinbase, Wallet } from "@coinbase/waas-sdk-web";
import OpenAI from "openai";

interface WalletBalance {
  currency: string;
  amount: string;
  network?: string;
}

interface ApiResponse {
  poem: string;
  balances: WalletBalance[];
}

interface CoinbaseCredentials {
  name: string;
  privateKey: string;
}

export async function GET(): Promise<
  NextResponse<ApiResponse | { error: string }>
> {
  try {
    // Initialize OpenAI
    const openai: OpenAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY as string,
    });

    // Decode coinbase key and parse as JSON
    const encodedKey: string = process.env.ENCODED_COINBASE_API_KEY as string;
    const decodedKey: string = Buffer.from(encodedKey, "base64").toString(
      "utf8"
    );
    const credentials: CoinbaseCredentials = JSON.parse(decodedKey);

    // Initialize Coinbase with decoded credentials
    Coinbase.configure({
      apiKeyName: credentials.name,
      privateKey: credentials.privateKey,
    });

    // Initialize wallet from seed
    const wallet: Wallet = await Wallet.import({
      walletId: process.env.WALLET_ID as string,
      seed: process.env.WALLET_SEED as string,
    });

    // Get wallet balances
    const balances: WalletBalance[] = await wallet.list_balances();

    // Format balances for the poem
    const balanceText: string = balances
      .map((b: WalletBalance) => `${b.amount} ${b.currency}`)
      .join(", ");

    // Generate poem using OpenAI
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a poet who writes short, creative poems about cryptocurrency wallets.",
        },
        {
          role: "user",
          content: `Write a short, creative poem about a crypto wallet containing these balances: ${balanceText}. The poem should be whimsical and fun, mentioning the specific amounts and currencies. You can ask users to fund the wallet or send a tip at ${process.env.AGENT_NAME} on ${process.env.WALLET_NETWORK}.`,
        },
      ],
      model: "gpt-4o-mini",
      max_tokens: 200,
      temperature: 0.7,
    });

    const poem: string = completion.choices[0].message.content || "";

    return NextResponse.json(
      { poem, balances },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in wallet poem route:", error);
    return NextResponse.json(
      { error: "Failed to generate wallet poem" },
      {
        status: 500,
      }
    );
  }
}
