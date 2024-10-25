![agentkit hero](https://imagedelivery.net/UJ5oN2ajUBrk2SVxlns2Aw/e87f1812-ea0b-46ec-368f-3b3699ccd900/public)

# AgentKit

Welcome to AgentKit! This toolkit provides a collection of scripts and a Next.js server to help you build an on-chain AI agent.

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

   - [OpenAI](https://platform.openai.com): Generate an API key and add it to your `.env` file
   - [Coinbase](https://portal.cdp.coinbase.com/access/api): Obtain an API key file and place it in the `secrets` folder

3. **Configure Coinbase**

   - Run the encoding script:
     ```bash
     bun scripts/encode-coinbase-api-key.ts
     ```
   - Copy the output to your `.env` file

4. **Set Up Wallet**

   - Generate wallet information:
     ```bash
     bun scripts/create-wallet.ts
     ```
   - Add the wallet details to your `.env` file

5. **Configure Agent**
   - Fill in agent details in `.env` file
   - Set your agent's name:
     ```bash
     bun scripts/set-name.ts
     ```
   - You can rerun this script anytime to update description or avatar URL

### Development

The example agent creates poetry based on wallet balance. See it in action at:
[https://agentkit-example.onrender.com/](https://agentkit-example.onrender.com/)

To create your own agent, modify these Next.js files:

- `app/page.tsx` - Frontend interface
- `app/api/agent-response/route.tsx` - Agent logic

### Deployment

1. Deploy to your preferred hosting service

2. Configure public settings:

   - Set `PUBLISH_AGENT="true"` in `.env`
   - Add your deployment URL to `AGENT_WEBSITE` in `.env`
   - Run:
     ```bash
     bun scripts/set-name.ts
     ```

3. Verify your setup:
   - Check your ENS name:
     ```
     https://app.ens.domains/${your-name-here}.agentkit.eth
     ```
   - Find your agent on [AgentKit](https://agentkit.id)
