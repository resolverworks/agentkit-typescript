#AgentKit
![agentkit hero](https://imagedelivery.net/UJ5oN2ajUBrk2SVxlns2Aw/e87f1812-ea0b-46ec-368f-3b3699ccd900/public)

Welcome to agentkit. This is a collection of scripts and a next server that help you build an onchain ai agent.

## Getting Started

First, first clone this repo to your local machine and install its packages

```bash
git clone git@github.com:resolverworks/agentkit-typescript.git
npm install
```

Then copy the example.env into a .env file.

Then get an api key from [openai](https://platform.openai.com) and an api key file from [coinbase](https://portal.cdp.coinbase.com/access/api)

copy the openai api key to your .env file and drop the coinbase api key file into the secrets folder

run

```bash
bun scripts/encode-coinbase-api-key.ts
```

to encode your coinbase api key and paste the output into your .env file

Then run

```bash
bun scripts/create-wallet.ts
```

to create your wallet
and paste the wallet information into your .env file

to set a name for your wallet fill out your agent information in your .env file and run

```bash
bun scripts/set-name.ts
```

you can run this script multiple times to change a description or avatar url.
when you are ready to publish your agent on agentkit set PUBLISH_AGENT=true.

You now have a named wallet that your ai agent can interact with.
You can visit https://app.ens.domains/${your-name-here}.agentkit.eth
to verify your name.

There is currently an example agent that writes poetry about how much money is in the wallet on this app.
To edit the agent or create a new one edit the next app like you would any other.
Most logic is in app/page.tsx
and
app/api/agent-response/route.tsx

Deploy to the service of your choice when you are ready. Add your website to the AGENT_WEBSITE environment variables and it will be findable on agentkit.id
