# AgentKit

Welcome to AgentKit! This toolkit provides a collection of scripts and a Next.js server to help you build an on-chain AI agent.
![agentkit hero](https://imagedelivery.net/UJ5oN2ajUBrk2SVxlns2Aw/e87f1812-ea0b-46ec-368f-3b3699ccd900/public)

## Getting Started

### Installation

1. Clone this repository to your local machine:

```bash
git clone git@github.com:resolverworks/agentkit-typescript.git
```

2. Install dependencies:

```bash
npm install
```

### Setup

1. **Environment Setup**

   - Copy `example.env` to a new `.env` file:
     ```bash
     cp example.env .env
     ```

2. **Get API Keys**

   - [OpenAI](https://platform.openai.com): Generate an API key and add it to your `.env` file.
   - [Coinbase](https://portal.cdp.coinbase.com/access/api): Obtain an API key file and place it in the `secrets` folder.

3. **Encode your Coinbase API Key**

   - Run the encoding script to transform the key:
     ```bash
     bun scripts/encode-coinbase-api-key.ts
     ```
   - Copy the output to your `.env` file.

4. **Create a Wallet**

   - Generate your wallet information:
     ```bash
     bun scripts/create-wallet.ts
     ```
   - Paste the wallet details into your `.env` file.

5. **Set Up Your Agent**

   - Complete the agent details in your `.env` file.
   - Assign a name to your wallet by running:
     ```bash
     bun scripts/set-name.ts
     ```
   - This script can be rerun to update the description or avatar URL.

6. **Publishing Your Agent**
   - When ready to publish, set `PUBLISH_AGENT=true` in your `.env` file and rerun:
     ```bash
     bun scripts/set-name.ts
     ```
   - Verify your agent name on ENS:
     ```
     https://app.ens.domains/${your-name-here}.agentkit.eth
     ```

## Current Implementation

The current setup includes an example agent that creates poetry based on the balance in your wallet. You can see a demo here:

## Customization

To modify or create a new agent, update the Next.js app as you would for any other Next.js project. Key files include:

- `app/page.tsx`
- `app/api/agent-response/route.tsx`

## Deployment

1. Deploy to your preferred hosting service.
2. Add your site URL to the `AGENT_WEBSITE` variable in your `.env` file.
3. Your agent will be findable on [AgentKit](https://agentkit.id).
