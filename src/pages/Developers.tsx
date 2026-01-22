import { useState } from 'react';
import { CollapsibleCodeBlock } from '../components/CollapsibleCodeBlock';

const SWAP_EXAMPLE = `import { Felt, FeltArray, FungibleAsset, Note, NoteAssets,
  NoteExecutionHint, NoteInputs, NoteMetadata, NoteRecipient,
  NoteTag, NoteType, MidenArrays, OutputNote,
  TransactionRequestBuilder } from '@demox-labs/miden-sdk';

const deadline = Date.now() + 120_000; // 2 minutes from now
const p2idTag = NoteTag.fromAccountId(userAccountId).asU32();

const inputs = new NoteInputs(
  new FeltArray([
    new Felt(minAmountOut),           // [0] min output
    new Felt(BigInt(0)),              // [1] padding
    buyToken.faucetId.suffix(),       // [2] output asset suffix
    buyToken.faucetId.prefix(),       // [3] output asset prefix
    new Felt(BigInt(deadline)),       // [4] deadline
    new Felt(BigInt(p2idTag)),        // [5] p2id tag
    new Felt(BigInt(0)),              // [6-9] padding
    new Felt(BigInt(0)),
    new Felt(BigInt(0)),
    new Felt(BigInt(0)),
    userAccountId.suffix(),           // [10] creator suffix
    userAccountId.prefix(),           // [11] creator prefix
  ])
);

const noteAssets = new NoteAssets([
  new FungibleAsset(sellToken.faucetId, sellAmount)
]);

const metadata = new NoteMetadata(
  userAccountId,
  NoteType.Public,
  NoteTag.fromAccountId(poolAccountId),
  NoteExecutionHint.always(),
  new Felt(BigInt(0))
);

const note = new Note(
  noteAssets,
  metadata,
  new NoteRecipient(serialNumber, compiledScript, inputs)
);

// Build transaction request
const txRequest = new TransactionRequestBuilder()
  .withOwnOutputNotes(
    new MidenArrays.OutputNoteArray([OutputNote.full(note)])
  )
  .build();

// Submit via wallet (handles signing)
await wallet.requestTransaction(txRequest);`;

const DEPOSIT_EXAMPLE = `const inputs = new NoteInputs(
  new FeltArray([
    new Felt(BigInt(0)),              // [0] padding
    new Felt(minLpTokensOut),         // [1] min LP tokens
    new Felt(BigInt(deadline)),       // [2] deadline
    new Felt(BigInt(p2idTag)),        // [3] p2id tag
    new Felt(BigInt(0)),              // [4-5] padding
    new Felt(BigInt(0)),
    userAccountId.suffix(),           // [6] creator suffix
    userAccountId.prefix(),           // [7] creator prefix
  ])
);

const noteAssets = new NoteAssets([
  new FungibleAsset(depositToken.faucetId, depositAmount)
]);

const metadata = new NoteMetadata(
  userAccountId,
  NoteType.Public,
  NoteTag.fromAccountId(poolAccountId),
  NoteExecutionHint.always(),
  new Felt(BigInt(0))
);

const note = new Note(
  noteAssets,
  metadata,
  new NoteRecipient(serialNumber, compiledScript, inputs)
);

const txRequest = new TransactionRequestBuilder()
  .withOwnOutputNotes(
    new MidenArrays.OutputNoteArray([OutputNote.full(note)])
  )
  .build();

// 1. Submit to blockchain via wallet
await wallet.requestTransaction(txRequest);

// 2. Wait for confirmation, then notify backend
// Convert byte array to Base64 for safe JSON transmission
const noteBytes = note.serialize();
const serializedNote = btoa(String.fromCharCode(...noteBytes));
await fetch('https://api.zoroswap.com/deposit/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ note_data: serializedNote })
});`;

const WITHDRAW_EXAMPLE = `// Convert requested asset to Word format (4 Felts)
const requestedAsset = new FungibleAsset(
  withdrawToken.faucetId,
  lpTokenAmount
).intoWord().toFelts();

const inputs = new NoteInputs(
  new FeltArray([
    ...requestedAsset,                // [0-3] requested asset word
    new Felt(BigInt(0)),              // [4] padding
    new Felt(minAmountOut),           // [5] min tokens out
    new Felt(BigInt(deadline)),       // [6] deadline
    new Felt(BigInt(p2idTag)),        // [7] p2id tag
    new Felt(BigInt(0)),              // [8-9] padding
    new Felt(BigInt(0)),
    userAccountId.suffix(),           // [10] creator suffix
    userAccountId.prefix(),           // [11] creator prefix
  ])
);

// Withdraw notes have no assets attached
const noteAssets = new NoteAssets([]);

const metadata = new NoteMetadata(
  userAccountId,
  NoteType.Public,
  NoteTag.fromAccountId(poolAccountId),
  NoteExecutionHint.always(),
  new Felt(BigInt(0))
);

const note = new Note(
  noteAssets,
  metadata,
  new NoteRecipient(serialNumber, compiledScript, inputs)
);

const txRequest = new TransactionRequestBuilder()
  .withOwnOutputNotes(
    new MidenArrays.OutputNoteArray([OutputNote.full(note)])
  )
  .build();

// 1. Submit to blockchain via wallet
await wallet.requestTransaction(txRequest);

// 2. Wait for confirmation, then notify backend
// Convert byte array to Base64 for safe JSON transmission
const noteBytes = note.serialize();
const serializedNote = btoa(String.fromCharCode(...noteBytes));
await fetch('https://api.zoroswap.com/withdraw/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ note_data: serializedNote })
});`;

const JSON_REQUEST = `{
  "note_data": "base64-encoded-serialized-note"
}`;

const JSON_DEPOSIT_RESPONSE = `{
  "success": true,
  "order_id": "550e8400-e29b-41d4-a716-446655440001",
  "message": "Deposit order submitted successfully."
}`;

const JSON_WITHDRAW_RESPONSE = `{
  "success": true,
  "order_id": "550e8400-e29b-41d4-a716-446655440002",
  "message": "Withdraw order submitted successfully."
}`;

const JSON_POOLS_INFO = `{
  "pool_account_id": "mtst1arkgh38jcqatxyznw6x8s8uelgqvm60p",
  "liquidity_pools": [
    {
      "name": "Bitcoin pool",
      "symbol": "BTC",
      "decimals": 8,
      "faucet_id": "mtst1aqgwhvfa5jl47gqgvje8m92faygswyrh",
      "oracle_id": "e62df6c8b4a85fe1a67db44dc12de5db..."
    },
    {
      "name": "Ethereum pool",
      "symbol": "ETH",
      "decimals": 8,
      "faucet_id": "mtst1aqqz052uutcx2gp9ly8hqt6q6ytjffde",
      "oracle_id": "ff61491a931112ddf1bd8147cd1b641375..."
    },
    {
      "name": "USDC pool",
      "symbol": "USDC",
      "decimals": 8,
      "faucet_id": "mtst1aqystjpq0me4vgqskvhcppcy75shcvkc",
      "oracle_id": "eaa020c61cc479712813461ce153894a96..."
    }
  ]
}`;

const JSON_POOLS_BALANCE = `{
  "data": [
    {
      "faucet_id": "mtst1aqgwhvfa5jl47gqgvje8m92faygswyrh",
      "reserve": "100000707736787",
      "reserve_with_slippage": "100000707736789",
      "total_liabilities": "100000152999612"
    },
    {
      "faucet_id": "mtst1aqqz052uutcx2gp9ly8hqt6q6ytjffde",
      "reserve": "99990172098179",
      "reserve_with_slippage": "99990172098797",
      "total_liabilities": "100000427816109"
    }
  ]
}`;

const WS_SUBSCRIBE = `{
  "type": "Subscribe",
  "channels": [
    { "channel": "order_updates" },
    { "channel": "pool_state" },
    { "channel": "oracle_prices" }
  ]
}`;

const WS_ORDER_UPDATE = `{
  "type": "OrderUpdate",
  "order_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "executed",
  "timestamp": 1706000000000
}`;

const WS_POOL_STATE = `{
  "type": "PoolStateUpdate",
  "faucet_id": "mtst1aqgwhvfa5jl47gqgvje8m92faygswyrh",
  "balances": {
    "reserve": "100000707736787",
    "reserve_with_slippage": "100000707736789",
    "total_liabilities": "100000152999612"
  },
  "timestamp": 1706000000000
}`;

const WS_ORACLE_PRICE = `{
  "type": "OraclePriceUpdate",
  "oracle_id": "e62df6c8b4a85fe1a67db44dc12de5db...",
  "faucet_id": "mtst1aqgwhvfa5jl47gqgvje8m92faygswyrh",
  "price": 42000.50,
  "timestamp": 1706000000000
}`;

function Developers() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <div className='min-h-screen bg-background text-foreground flex flex-col dotted-bg'>
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer'
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt='Enlarged view'
            className='max-w-full max-h-full object-contain'
          />
        </div>
      )}
      <title>Developers - ZoroSwap | AMM Integration Guide</title>
      <meta
        name='description'
        content='Developer documentation for integrating with ZoroSwap AMM on Miden.'
      />
      <meta property='og:title' content='Developers - ZoroSwap | AMM Integration Guide' />
      <meta
        property='og:description'
        content='Technical documentation for creating ZoroSwap notes and integrating AMM functionality into your Miden project.'
      />
      <meta name='twitter:title' content='Developers - ZoroSwap | AMM Integration Guide' />
      <meta
        name='twitter:description'
        content='Technical documentation for creating ZoroSwap notes and integrating AMM functionality into your Miden project.'
      />
      <main className='flex-1 flex items-center justify-center p-4 sm:mt-10 container pb-20 md:pb-30'>
        <div className='w-full text-left max-w-2xl sm:max-w-2xl space-y-4 sm:space-y-6'>
          <div className='space-y-8 sm:space-y-10'>
            <h1 className='text-2xl sm:text-3xl font-bold'>Developer Documentation</h1>
            <p>
              Integrate ZoroSwap AMM functionality into your Miden project by creating notes that interact with our liquidity pools.
            </p>
            <p>
              Our protocol supports for integrations to take fees, hence integrating ZoroSwap into your application can provide a way to monetize your product.
            </p>

            {/* Table of Contents */}
            <nav className='bg-muted/50 rounded-lg p-4'>
              <h2 className='text-lg font-semibold mb-2'>Contents</h2>
              <ul className='space-y-1 text-sm'>
                <li><a href='#resources' className='text-primary hover:text-foreground'>Project Resources</a></li>
                <li><a href='#overview' className='text-primary hover:text-foreground'>Overview</a></li>
                <li><a href='#submission-flow' className='text-primary hover:text-foreground'>Submission Flow</a></li>
                <li><a href='#core-concepts' className='text-primary hover:text-foreground'>Core Concepts</a></li>
                <li><a href='#zoroswap-note' className='text-primary hover:text-foreground'>ZOROSWAP Note (Token Swaps)</a></li>
                <li><a href='#deposit-note' className='text-primary hover:text-foreground'>DEPOSIT Note (Add Liquidity)</a></li>
                <li><a href='#withdraw-note' className='text-primary hover:text-foreground'>WITHDRAW Note (Remove Liquidity)</a></li>
                <li><a href='#rest-api' className='text-primary hover:text-foreground'>REST API Reference</a></li>
                <li><a href='#support' className='text-primary hover:text-foreground'>Support</a></li>
              </ul>
            </nav>

            <hr className='border-foreground/10 my-8' />

            {/* Project Resources */}
            <h2 id='resources' className='text-xl sm:text-2xl font-bold'>Project Resources</h2>
            <div className='bg-primary/10 border border-primary/20 rounded-lg p-3 text-sm flex gap-3'>
              <svg className='w-5 h-5 flex-shrink-0 text-primary mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
              </svg>
              <span><strong>Testnet Notice:</strong> ZoroSwap is currently deployed on Miden testnet only. All tokens are test tokens with no real value. API endpoints and account IDs may change before mainnet launch.</span>
            </div>
            <p className='mt-3'>
              Here are the key resources:
            </p>
            <ul className='list-disc list-inside space-y-1 ml-4'>
              <li>
                <strong>Frontend:</strong>{' '}
                <a href='https://app.zoroswap.com' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>
                  app.zoroswap.com
                </a>
              </li>
              <li>
                <strong>Server with REST API:</strong>{' '}
                <a href='https://api.zoroswap.com/health' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>
                  api.zoroswap.com
                </a>
              </li>
              <li>
                <strong>Testnet Faucet:</strong>{' '}
                <a href='https://app.zoroswap.com/faucet' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>
                  app.zoroswap.com/faucet
                </a>
              </li>
              <li>
                <strong>Frontend Code:</strong>{' '}
                <a href='https://github.com/zoroswap/frontend' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>
                  github.com/zoroswap/frontend
                </a>
              </li>
              <li>
                <strong>Backend Code:</strong>{' '}
                <a href='https://github.com/zoroswap/zoroswap' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>
                  github.com/zoroswap/zoroswap
                </a>
              </li>
            </ul>

            <hr className='border-foreground/10 my-8' />

            {/* Overview */}
            <h2 id='overview' className='text-xl sm:text-2xl font-bold'>Overview</h2>
            <p>
              ZoroSwap operates as an Oracle-informed AMM on the Miden blockchain. Other projects can utilize our AMM infrastructure by creating properly formatted notes that our pool account processes. There are three types of notes you can create:
            </p>
            <ul className='list-disc list-inside space-y-2 ml-4'>
              <li><strong>ZOROSWAP Notes:</strong> Execute token swaps</li>
              <li><strong>DEPOSIT Notes:</strong> Add liquidity to pools</li>
              <li><strong>WITHDRAW Notes:</strong> Remove liquidity from pools</li>
            </ul>

            <h3 className='text-lg font-semibold mt-6'>SDK Options</h3>
            <p>
              The code examples on this page use TypeScript with the{' '}
              <a href='https://www.npmjs.com/package/@demox-labs/miden-sdk' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>
                @demox-labs/miden-sdk
              </a>{' '}
              package. However, Miden supports multiple SDKs:
            </p>
            <ul className='list-disc list-inside space-y-1 ml-4 mt-2'>
              <li>
                <strong>TypeScript:</strong>{' '}
                <a href='https://www.npmjs.com/package/@demox-labs/miden-sdk' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>
                  @demox-labs/miden-sdk
                </a>{' '}
                (used in examples below)
              </li>
              <li>
                <strong>Rust:</strong>{' '}
                <a href='https://crates.io/crates/miden-client' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>
                  miden-client
                </a>{' '}
                (official Miden client)
              </li>
            </ul>
            <p className='text-sm text-muted-foreground mt-2'>
              The note input formats documented below apply regardless of which SDK you use, only the syntax differs.
            </p>

            <hr className='border-foreground/10 my-8' />

            {/* Submission Flow */}
            <h2 id='submission-flow' className='text-xl sm:text-2xl font-bold'>Submission Flow</h2>
            <p>
              All notes must be signed and submitted to the Miden blockchain. The flow differs by note type:
            </p>

            <h3 className='text-lg font-semibold mt-6'>Swaps (Public Note)</h3>
            <div className='bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-sm flex gap-3'>
              <svg className='w-5 h-5 flex-shrink-0 text-blue-500 mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              <span><strong>Note:</strong> We are actively working on supporting private notes, for now only public notes are supported though.</span>
            </div>
            <ol className='list-decimal list-inside space-y-1 ml-4'>
              <li>Create a ZOROSWAP note using the Miden SDK and the instructions on this page</li>
              <li>Sign and submit transaction to blockchain via a wallet</li>
              <li>ZoroSwap server detects the note on-chain and processes the swap</li>
              <li>Result note, a <a href='https://docs.miden.xyz/quick-start/notes' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>P2ID (pay-to-id) note</a>, is sent back to the specified <code>creatorId</code></li>
              <li>The beneficiary needs to claim the P2ID note in their wallet</li>
            </ol>
            <p className='text-sm text-muted-foreground mt-2'>
              No backend API call is required for swaps. Our server monitors the chain for notes tagged with the pool account ID.
            </p>

            <h3 className='text-lg font-semibold mt-6'>Pool Deposits & Withdrawals (Private Notes)</h3>
            <ol className='list-decimal list-inside space-y-1 ml-4'>
              <li>Create the note using the Miden SDK and the instructions on this page</li>
              <li>Sign and submit transaction to blockchain via a wallet</li>
              <li>Wait for block inclusion</li>
              <li>Serialize the note and send it to ZoroSwap API</li>
              <li>ZoroSwap server processes and executes the note</li>
              <li>Result note, a <a href='https://docs.miden.xyz/quick-start/notes' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>P2ID (pay-to-id) note</a>, is sent back to the specified <code>creatorId</code></li>
              <li>The beneficiary needs to claim the P2ID note in their wallet</li>
            </ol>
            <p className='text-sm text-muted-foreground mt-2'>
              Private notes require both blockchain submission and API notification!
            </p>

            <hr className='border-foreground/10 my-8' />

            {/* Core Concepts */}
            <h2 id='core-concepts' className='text-xl sm:text-2xl font-bold'>Core Concepts</h2>

            <h3 className='text-lg font-semibold mt-6'>Felt Values</h3>
            <p>
              Miden uses <a href='https://docs.miden.xyz/glossary#felt' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>field elements (Felts)</a> as its native data type. A Felt is a 64-bit integer within a prime field. All note inputs are arrays of Felt values.
            </p>
            <p className='mt-2'>
              To create a Felt from a number in TypeScript, use the <code className='bg-muted px-1 rounded'>Felt</code> constructor from the <a href='https://www.npmjs.com/package/@demox-labs/miden-sdk' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>@demox-labs/miden-sdk</a> package with a <code className='bg-muted px-1 rounded'>BigInt</code>:
            </p>
            <ul className='list-disc list-inside space-y-1 ml-4 mt-2'>
              <li>From a number: <code className='bg-muted px-1 rounded'>new Felt(BigInt(12345))</code></li>
              <li>From an existing bigint: <code className='bg-muted px-1 rounded'>new Felt(someAmount)</code></li>
            </ul>
            <p className='mt-2'>
              <strong>Account IDs and Faucet IDs</strong> are 128-bit identifiers that don't fit in a single Felt. They are split into two Felts using the <code className='bg-muted px-1 rounded'>.prefix()</code> and <code className='bg-muted px-1 rounded'>.suffix()</code> methods. When specifying these in note inputs, always place the suffix before the prefix (see the input tables below).
            </p>

            <h3 className='text-lg font-semibold mt-6'>Note Structure</h3>
            <p>Miden has the primitive of <a href='https://docs.miden.xyz/quick-start/notes' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>notes</a>. Every ZoroSwap note consists of:</p>
            <ul className='list-disc list-inside space-y-1 ml-4'>
              <li><strong>Assets:</strong> Fungible tokens attached to the note</li>
              <li><strong>Metadata:</strong> Sender, type, tag, and execution hint</li>
              <li><strong>Recipient:</strong> Serial number, script, and inputs</li>
            </ul>

            <h3 className='text-lg font-semibold mt-6'>Note Tag</h3>
            <p>
              The note tag determines routing. For public notes targeting ZoroSwap pools, use <code className='bg-muted px-1 rounded'>NoteTag.fromAccountId(poolAccountId)</code>. This ensures the note is routed to the correct pool account. You can obtain the <code className='bg-muted px-1 rounded'>poolAccountId</code> from our <a href='#pools-info' className='text-primary hover:text-foreground'>/pools/info</a> endpoint.
            </p>

            <h3 className='text-lg font-semibold mt-6'>Serial Number and Note Script</h3>
            <p>
              Every note requires a <code className='bg-muted px-1 rounded'>serialNumber</code> and a compiled <code className='bg-muted px-1 rounded'>noteScript</code>:
            </p>
            <ul className='list-disc list-inside space-y-1 ml-4 mt-2'>
              <li><strong>Serial Number:</strong> A random 4-element array that makes each note unique. Generate it using <code className='bg-muted px-1 rounded'>NoteSerialNumber.random()</code></li>
              <li><strong>Note Script:</strong> The MASM program that defines note behavior. ZoroSwap provides scripts for each note type: <a href='https://github.com/zoroswap/frontend/blob/main/src/lib/zoroswap.masm' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>zoroswap.masm</a>, <a href='https://github.com/zoroswap/frontend/blob/main/src/lib/deposit.masm' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>deposit.masm</a>, <a href='https://github.com/zoroswap/frontend/blob/main/src/lib/withdraw.masm' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>withdraw.masm</a></li>
            </ul>
            <p className='text-sm text-muted-foreground mt-2'>
              The frontend repository contains helper classes that handle script compilation: <a href='https://github.com/zoroswap/frontend/blob/main/src/lib/ZoroSwapNote.ts' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>ZoroSwapNote</a>, <a href='https://github.com/zoroswap/frontend/blob/main/src/lib/ZoroDepositNote.ts' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>ZoroDepositNote</a>, <a href='https://github.com/zoroswap/frontend/blob/main/src/lib/ZoroWithdrawNote.ts' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>ZoroWithdrawNote</a>.
            </p>

            <h3 className='text-lg font-semibold mt-6'>Token Decimals</h3>
            <p>
              All token amounts in note inputs are raw integer values (no decimal places). Use the token's <code className='bg-muted px-1 rounded'>decimals</code> field from <a href='#pools-info' className='text-primary hover:text-foreground'>/pools/info</a> to convert:
            </p>
            <ul className='list-disc list-inside space-y-1 ml-4 mt-2'>
              <li><strong>Human → Raw:</strong> <code className='bg-muted px-1 rounded'>parseUnits("1.5", 8)</code> → <code>150000000n</code></li>
              <li><strong>Raw → Human:</strong> <code className='bg-muted px-1 rounded'>formatUnits(150000000n, 8)</code> → <code>"1.5"</code></li>
            </ul>
            <p className='text-sm text-muted-foreground mt-2'>
              These functions are available from the <a href='https://viem.sh/docs/utilities/parseUnits' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>viem</a> package or similar utilities.
            </p>

            <h3 id='common-parameters' className='text-lg font-semibold'>Common Parameters</h3>
            <p>
              These parameters are used across multiple note types in the input arrays:
            </p>
            <div className='overflow-x-auto mt-2'>
              <table className='w-full text-sm'>
                <thead className='border-t-2 border-foreground/20'>
                  <tr className='border-b-2 border-foreground/20'>
                    <th className='px-3 py-2 text-left font-semibold'>Parameter</th>
                    <th className='px-3 py-2 text-left font-semibold'>Type</th>
                    <th className='px-3 py-2 text-left font-semibold'>Description</th>
                  </tr>
                </thead>
                <tbody className='border-b-2 border-foreground/20'>
                  <tr>
                    <td className='px-3 py-2'><code>deadline</code></td>
                    <td className='px-3 py-2'>u64</td>
                    <td className='px-3 py-2'>Unix timestamp in milliseconds. Recommended: Use at least ten seconds to leave time for the server to discover and process the note.</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'><code>minAmountOut</code></td>
                    <td className='px-3 py-2'>u64</td>
                    <td className='px-3 py-2'>Slippage protection. Note rejected if output would be less.</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'><code>p2idTag</code></td>
                    <td className='px-3 py-2'>u32</td>
                    <td className='px-3 py-2'>
                      Tag for the result P2ID note. Derived from user account: <code>NoteTag.fromAccountId(userAccountId).asU32()</code>.
                      The recipient wallet uses this tag to filter and discover incoming notes when syncing.</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'><code>creatorId</code></td>
                    <td className='px-3 py-2'>AccountId</td>
                    <td className='px-3 py-2'>Split into suffix (first) and prefix (second) Felts.</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'><code>faucetId</code></td>
                    <td className='px-3 py-2'>AccountId</td>
                    <td className='px-3 py-2'>Token identifier. Split into suffix and prefix Felts.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <hr className='border-foreground/10 my-8' />

            {/* ZOROSWAP Note */}
            <h2 id='zoroswap-note' className='text-xl sm:text-2xl font-bold'>ZOROSWAP Note (Token Swaps)</h2>
            <p>
              Use ZOROSWAP notes to exchange one token for another through ZoroSwap's liquidity pools.
            </p>

            <h3 className='text-lg font-semibold mt-6'>Note Inputs (12 Felts)</h3>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead className='border-t-2 border-foreground/20'>
                  <tr className='border-b-2 border-foreground/20'>
                    <th className='px-3 py-2 text-left font-semibold'>Index</th>
                    <th className='px-3 py-2 text-left font-semibold'>Field</th>
                    <th className='px-3 py-2 text-left font-semibold'>Description</th>
                  </tr>
                </thead>
                <tbody className='border-b-2 border-foreground/20'>
                  <tr>
                    <td className='px-3 py-2'>0</td>
                    <td className='px-3 py-2'><a href='#common-parameters' className='text-primary hover:text-foreground'><code>minAmountOut</code></a></td>
                    <td className='px-3 py-2'>Minimum output tokens (slippage protection)</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>1</td>
                    <td className='px-3 py-2'><code>padding</code></td>
                    <td className='px-3 py-2'>Reserved (set to 0)</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>2</td>
                    <td className='px-3 py-2'><code>outputAssetId.suffix</code></td>
                    <td className='px-3 py-2'>Output token faucet ID suffix</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>3</td>
                    <td className='px-3 py-2'><code>outputAssetId.prefix</code></td>
                    <td className='px-3 py-2'>Output token faucet ID prefix</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>4</td>
                    <td className='px-3 py-2'><a href='#common-parameters' className='text-primary hover:text-foreground'><code>deadline</code></a></td>
                    <td className='px-3 py-2'>Unix timestamp in milliseconds</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>5</td>
                    <td className='px-3 py-2'><a href='#common-parameters' className='text-primary hover:text-foreground'><code>p2idTag</code></a></td>
                    <td className='px-3 py-2'>P2ID tag for return notes</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>6-9</td>
                    <td className='px-3 py-2'><code>padding</code></td>
                    <td className='px-3 py-2'>Reserved (set to 0)</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>10</td>
                    <td className='px-3 py-2'><a href='#common-parameters' className='text-primary hover:text-foreground'><code>creatorId</code></a>.suffix</td>
                    <td className='px-3 py-2'>Creator account ID suffix</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>11</td>
                    <td className='px-3 py-2'><a href='#common-parameters' className='text-primary hover:text-foreground'><code>creatorId</code></a>.prefix</td>
                    <td className='px-3 py-2'>Creator account ID prefix</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className='text-lg font-semibold mt-6'>Note Assets</h3>
            <p>
              Attach exactly <em>one fungible asset</em>: the token you want to sell. The amount attached is the input amount for the swap.
            </p>

            <h3 className='text-lg font-semibold mt-6'>Metadata</h3>
            <ul className='list-disc list-inside space-y-1 ml-4'>
              <li><strong>Type:</strong> <code className='bg-muted px-1 rounded'>NoteType.Public</code></li>
              <li><strong>Tag:</strong> <code className='bg-muted px-1 rounded'>NoteTag.fromAccountId(poolAccountId)</code></li>
              <li><strong>Execution Hint:</strong> <code className='bg-muted px-1 rounded'>NoteExecutionHint.always()</code>, hint for our server that the note has no constraint on when it should be consumed (no particular block height, &hellip;).</li>
            </ul>

            <h3 className='text-lg font-semibold mt-6'>Example (TypeScript)</h3>
            <CollapsibleCodeBlock code={SWAP_EXAMPLE} title='View swap example code' />

            <hr className='border-foreground/10 my-8' />

            {/* DEPOSIT Note */}
            <h2 id='deposit-note' className='text-xl sm:text-2xl font-bold'>DEPOSIT Note (Add Liquidity)</h2>
            <p>
              Use DEPOSIT notes to provide liquidity to a pool and receive LP tokens in return.
            </p>

            <h3 className='text-lg font-semibold mt-6'>Note Inputs (8 Felts)</h3>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead className='border-t-2 border-foreground/20'>
                  <tr className='border-b-2 border-foreground/20'>
                    <th className='px-3 py-2 text-left font-semibold'>Index</th>
                    <th className='px-3 py-2 text-left font-semibold'>Field</th>
                    <th className='px-3 py-2 text-left font-semibold'>Description</th>
                  </tr>
                </thead>
                <tbody className='border-b-2 border-foreground/20'>
                  <tr>
                    <td className='px-3 py-2'>0</td>
                    <td className='px-3 py-2'><code>padding</code></td>
                    <td className='px-3 py-2'>Reserved (set to 0)</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>1</td>
                    <td className='px-3 py-2'><code>minLpOut</code></td>
                    <td className='px-3 py-2'>Minimum LP tokens to receive</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>2</td>
                    <td className='px-3 py-2'><a href='#common-parameters' className='text-primary hover:text-foreground'><code>deadline</code></a></td>
                    <td className='px-3 py-2'>Unix timestamp in milliseconds</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>3</td>
                    <td className='px-3 py-2'><a href='#common-parameters' className='text-primary hover:text-foreground'><code>p2idTag</code></a></td>
                    <td className='px-3 py-2'>P2ID tag for return notes</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>4-5</td>
                    <td className='px-3 py-2'><code>padding</code></td>
                    <td className='px-3 py-2'>Reserved (set to 0)</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>6</td>
                    <td className='px-3 py-2'><a href='#common-parameters' className='text-primary hover:text-foreground'><code>creatorId</code></a>.suffix</td>
                    <td className='px-3 py-2'>Creator account ID suffix</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>7</td>
                    <td className='px-3 py-2'><a href='#common-parameters' className='text-primary hover:text-foreground'><code>creatorId</code></a>.prefix</td>
                    <td className='px-3 py-2'>Creator account ID prefix</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className='text-lg font-semibold mt-6'>Note Assets</h3>
            <p>
              Attach exactly <em>one fungible asset</em>: the token you want to deposit as liquidity.
            </p>

            <h3 className='text-lg font-semibold mt-6'>Metadata</h3>
            <ul className='list-disc list-inside space-y-1 ml-4'>
              <li><strong>Type:</strong> <code className='bg-muted px-1 rounded'>NoteType.Public</code> or <code className='bg-muted px-1 rounded'>NoteType.Private</code></li>
              <li><strong>Tag:</strong> For public use <code className='bg-muted px-1 rounded'>NoteTag.fromAccountId(poolAccountId)</code>, for private <code className='bg-muted px-1 rounded'>NoteTag.forLocalUseCase(0, 0)</code></li>
              <li><strong>Execution Hint:</strong> <code className='bg-muted px-1 rounded'>NoteExecutionHint.always()</code>, hint for our server that the note has no constraint on when it should be consumed (no particular block height, &hellip;).</li>
            </ul>

            <h3 className='text-lg font-semibold mt-6'>Example (TypeScript)</h3>
            <CollapsibleCodeBlock code={DEPOSIT_EXAMPLE} title='View deposit example code' />

            <hr className='border-foreground/10 my-8' />

            {/* WITHDRAW Note */}
            <h2 id='withdraw-note' className='text-xl sm:text-2xl font-bold'>WITHDRAW Note (Remove Liquidity)</h2>
            <p>
              Use WITHDRAW notes to redeem LP tokens and receive underlying assets from the pool. Each liquidity pool has its own LP token faucet ID, which you'll need for the <code className='bg-muted px-1 rounded'>requestedAsset</code> field. Query <a href='#pools-info' className='text-primary hover:text-foreground'>/pools/info</a> to get the LP token faucet IDs for each pool.
            </p>

            <h3 className='text-lg font-semibold mt-6'>Note Inputs (12 Felts)</h3>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead className='border-t-2 border-foreground/20'>
                  <tr className='border-b-2 border-foreground/20'>
                    <th className='px-3 py-2 text-left font-semibold'>Index</th>
                    <th className='px-3 py-2 text-left font-semibold'>Field</th>
                    <th className='px-3 py-2 text-left font-semibold'>Description</th>
                  </tr>
                </thead>
                <tbody className='border-b-2 border-foreground/20'>
                  <tr>
                    <td className='px-3 py-2'>0-3</td>
                    <td className='px-3 py-2'><code>requestedAsset</code></td>
                    <td className='px-3 py-2'>Requested asset as Word (amount + faucet ID)</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>4</td>
                    <td className='px-3 py-2'><code>padding</code></td>
                    <td className='px-3 py-2'>Reserved (set to 0)</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>5</td>
                    <td className='px-3 py-2'><a href='#common-parameters' className='text-primary hover:text-foreground'><code>minAmountOut</code></a></td>
                    <td className='px-3 py-2'>Minimum tokens to receive</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>6</td>
                    <td className='px-3 py-2'><a href='#common-parameters' className='text-primary hover:text-foreground'><code>deadline</code></a></td>
                    <td className='px-3 py-2'>Unix timestamp in milliseconds</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>7</td>
                    <td className='px-3 py-2'><a href='#common-parameters' className='text-primary hover:text-foreground'><code>p2idTag</code></a></td>
                    <td className='px-3 py-2'>P2ID tag for return notes</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>8-9</td>
                    <td className='px-3 py-2'><code>padding</code></td>
                    <td className='px-3 py-2'>Reserved (set to 0)</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>10</td>
                    <td className='px-3 py-2'><a href='#common-parameters' className='text-primary hover:text-foreground'><code>creatorId</code></a>.suffix</td>
                    <td className='px-3 py-2'>Creator account ID suffix</td>
                  </tr>
                  <tr>
                    <td className='px-3 py-2'>11</td>
                    <td className='px-3 py-2'><a href='#common-parameters' className='text-primary hover:text-foreground'><code>creatorId</code></a>.prefix</td>
                    <td className='px-3 py-2'>Creator account ID prefix</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className='text-lg font-semibold mt-6'>Note Assets</h3>
            <p>
              Pass an empty array to the <code className='bg-muted px-1 rounded'>NoteAssets</code> constructor: <code className='bg-muted px-1 rounded'>new NoteAssets([])</code>. Unlike swap and deposit notes, withdraw notes don't carry any tokens; you're requesting tokens back from the pool, not sending them. The LP token amount to burn is specified in the <code className='bg-muted px-1 rounded'>requestedAsset</code> input field instead.
            </p>

            <h3 className='text-lg font-semibold mt-6'>Metadata</h3>
            <ul className='list-disc list-inside space-y-1 ml-4'>
              <li><strong>Type:</strong> <code className='bg-muted px-1 rounded'>NoteType.Public</code> or <code className='bg-muted px-1 rounded'>NoteType.Private</code></li>
              <li><strong>Tag:</strong> For public: <code className='bg-muted px-1 rounded'>NoteTag.fromAccountId(poolAccountId)</code>, for private: <code className='bg-muted px-1 rounded'>NoteTag.forLocalUseCase(0, 0)</code></li>
              <li><strong>Execution Hint:</strong> <code className='bg-muted px-1 rounded'>NoteExecutionHint.always()</code>, hint for our server that the note has no constraint on when it should be consumed (no particular block height, &hellip;).</li>
            </ul>

            <h3 className='text-lg font-semibold mt-6'>Example (TypeScript)</h3>
            <CollapsibleCodeBlock code={WITHDRAW_EXAMPLE} title='View withdraw example code' />

            <hr className='border-foreground/10 my-8' />

            {/* REST API Reference */}
            <h2 id='rest-api' className='text-xl sm:text-2xl font-bold'>REST API Reference</h2>
            <p>
              These endpoints are used to notify the backend about private notes (deposits/withdrawals) after they have been submitted to the blockchain.
            </p>
            <div className='bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-sm flex gap-3'>
              <svg className='w-5 h-5 flex-shrink-0 text-blue-500 mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              <span><strong>Note:</strong>
                Swaps currently can only be executed as public notes and do not require API calls. We are actively working on supporting private notes for swaps too.
              </span>
            </div>

            {/* POST /deposit/submit */}
            <h3 className='text-lg font-semibold mt-10'>POST /deposit/submit</h3>
            <p>Submit a DEPOSIT note to add liquidity.</p>
            <CollapsibleCodeBlock code={JSON_REQUEST} language='json' title='View request format' />
            <CollapsibleCodeBlock code={JSON_DEPOSIT_RESPONSE} language='json' title='View response format' />

            {/* POST /withdraw/submit */}
            <h3 className='text-lg font-semibold mt-10'>POST /withdraw/submit</h3>
            <p>Submit a WITHDRAW note to remove liquidity.</p>
            <CollapsibleCodeBlock code={JSON_REQUEST} language='json' title='View request format' />
            <CollapsibleCodeBlock code={JSON_WITHDRAW_RESPONSE} language='json' title='View response format' />

            {/* Tracking Results */}
            <h3 className='text-lg font-semibold mt-10'>Tracking Note Results</h3>
            <p>
              After submitting a deposit or withdrawal note, use the returned <code className='bg-muted px-1 rounded'>order_id</code> to track its status via WebSocket:
            </p>
            <ol className='list-decimal list-inside space-y-1 ml-4 mt-2'>
              <li>Connect to the WebSocket endpoint at <code className='bg-muted px-1 rounded'>wss://api.zoroswap.com/ws</code></li>
              <li>Subscribe to the <code className='bg-muted px-1 rounded'>order_updates</code> channel</li>
              <li>Listen for <code className='bg-muted px-1 rounded'>OrderUpdate</code> messages matching your <code className='bg-muted px-1 rounded'>order_id</code></li>
              <li>When status changes to <code className='bg-muted px-1 rounded'>executed</code>, the result note has been sent to your account</li>
            </ol>
            <p className='text-sm text-muted-foreground mt-2'>
              See the <a href='#websocket' className='text-primary hover:text-foreground'>WebSocket section</a> below for message formats and status values.
            </p>

            <h3 className='text-lg font-semibold mt-10'>Error Handling</h3>
            <p>
              Notes can fail for several reasons. Monitor the <code className='bg-muted px-1 rounded'>status</code> field in WebSocket updates:
            </p>
            <ul className='list-disc list-inside space-y-1 ml-4 mt-2'>
              <li><code className='bg-muted px-1 rounded'>failed</code>: Note was rejected (slippage exceeded, invalid inputs, insufficient liquidity). Your original assets remain in your account.</li>
              <li><code className='bg-muted px-1 rounded'>expired</code>: Deadline passed before execution. Your original assets remain in your account.</li>
            </ul>
            <p className='mt-2'>
              API error responses return JSON with an <code className='bg-muted px-1 rounded'>error</code> field:
            </p>
            <CollapsibleCodeBlock code={`{
  "success": false,
  "error": "Invalid note data: deserialization failed"
}`} language='json' title='View error response format' />

            <h3 className='text-lg font-semibold mt-10'>Receiving Result Notes</h3>
            <p>
              After successful execution, ZoroSwap sends a <a href='https://docs.miden.xyz/quick-start/notes' target='_blank' rel='noopener noreferrer' className='text-primary hover:text-foreground'>P2ID (pay-to-id)</a> note back to the account specified as creator.
              This note contains the resulting tokens, it needs to be claimed by the user. The claim process will incur user fees in future versions of Miden, so should not be done without the users acknowledgment.
              On a high-level the process is:
            </p>
            <ol className='list-decimal list-inside space-y-1 ml-4 mt-2'>
              <li>Sync your account with the Miden node to fetch new notes</li>
              <li>The SDK's wallet adapter handles this automatically when you call <code className='bg-muted px-1 rounded'>wallet.sync()</code></li>
              <li>Incoming notes appear in your account's input notes and can be consumed in subsequent transactions</li>
            </ol>
            <p className='mt-2'>
              The Miden wallet takes care of the above and the user sees the following:
            </p>
            <div className='flex items-start gap-5 justify-center mt-3'>
              <div className='gap-2 flex flex-col items-center justify-center'>
                <img
                  src='/claim0.png'
                  alt='Claim note step 1'
                  className='h-64 sm:h-72 cursor-pointer hover:opacity-80 transition-opacity'
                  onClick={() => setLightboxImage('/claim0.png')}
                />
                <p className='text-center text-sm text-muted-foreground'>New claims show up</p>
              </div>
              <div className='gap-2 flex flex-col items-center justify-center'>
                <img
                  src='/claim1.png'
                  alt='Claim note step 2'
                  className='h-64 sm:h-72 cursor-pointer hover:opacity-80 transition-opacity'
                  onClick={() => setLightboxImage('/claim1.png')}
                />
                <p className='text-center text-sm text-muted-foreground'>Users need to claims intentionally</p>
              </div>
            </div>
            <p className='text-sm text-muted-foreground mt-2'>
              For swaps, you receive the output tokens. For deposits, you receive LP tokens. For withdrawals, you receive the underlying pool tokens.
            </p>

            {/* GET /pools/info */}
            <h3 id='pools-info' className='text-lg font-semibold mt-10'>GET /pools/info</h3>
            <p>Returns pool configuration and liquidity pool details. Use this to get:</p>
            <ul className='list-disc list-inside space-y-1 ml-4 mt-1 mb-2'>
              <li><code className='bg-muted px-1 rounded'>pool_account_id</code>: Required for note tags</li>
              <li><code className='bg-muted px-1 rounded'>faucet_id</code>: Token identifiers for each pool</li>
              <li><code className='bg-muted px-1 rounded'>decimals</code>: For formatting token amounts</li>
            </ul>
            <br/>
            <CollapsibleCodeBlock code={JSON_POOLS_INFO} language='json' title='View response example' />

            <h4 className='font-semibold mt-6'>Available Trading Pairs</h4>
            <p className='text-sm'>
              Any token listed in <code className='bg-muted px-1 rounded'>liquidity_pools</code> can be swapped for any other token in the list. For example, with BTC, ETH, and USDC pools, you can swap BTC↔ETH, BTC↔USDC, or ETH↔USDC.
            </p>

            {/* GET /pools/balance */}
            <h3 className='text-lg font-semibold mt-10'>GET /pools/balance</h3>
            <p>Returns current token balances in pools.</p>
            <CollapsibleCodeBlock code={JSON_POOLS_BALANCE} language='json' title='View response example' />

            {/* POST /faucets/mint */}
            <h3 className='text-lg font-semibold mt-10'>POST /faucets/mint</h3>
            <p>Mint test tokens on testnet. Provide your account ID and the faucet ID of the token you want.</p>
            <CollapsibleCodeBlock code={`{
  "account_id": "your-account-id",
  "faucet_id": "mtst1aqgwhvfa5jl47gqgvje8m92faygswyrh"
}`} language='json' title='View request format' />
            <CollapsibleCodeBlock code={`{
  "success": true,
  "message": "Tokens minted successfully"
}`} language='json' title='View response format' />
            <br/>
            <p className='text-sm text-muted-foreground mt-2'>
              Get available faucet IDs from <a href='#pools-info' className='text-primary hover:text-foreground'>/pools/info</a>. Minted tokens will appear as an input note in your account after syncing.
            </p>

            {/* GET /ws */}
            <h3 id='websocket' className='text-lg font-semibold mt-10'>GET /ws (WebSocket)</h3>
            <p>
              Real-time updates for order status, pool state, and oracle prices. Connect via WebSocket and subscribe to channels.
            </p>

            <h4 className='font-semibold mt-3'>Subscribe to Channels</h4>
            <CollapsibleCodeBlock code={WS_SUBSCRIBE} language='json' title='View subscribe message format' />

            <p className='text-sm mt-6'>
              <strong>Available channels:</strong>
            </p>
            <ul className='list-disc list-inside space-y-1 ml-4 text-sm'>
              <li><code className='bg-muted px-1 rounded'>order_updates</code>: Order status changes</li>
              <li><code className='bg-muted px-1 rounded'>pool_state</code>: Pool reserve updates</li>
              <li><code className='bg-muted px-1 rounded'>oracle_prices</code>: Price feed updates</li>
            </ul>

            <h4 className='font-semibold mt-3'>Server Messages</h4>

            <CollapsibleCodeBlock code={WS_ORDER_UPDATE} language='json' title='View Order Update message' />
            <p className='text-sm mb-4'>
              Status values: <code className='bg-muted px-1 rounded'>pending</code>, <code className='bg-muted px-1 rounded'>matching</code>, <code className='bg-muted px-1 rounded'>executed</code>, <code className='bg-muted px-1 rounded'>failed</code>, <code className='bg-muted px-1 rounded'>expired</code>
            </p>

            <CollapsibleCodeBlock code={WS_POOL_STATE} language='json' title='View Pool State Update message' />

            <CollapsibleCodeBlock code={WS_ORACLE_PRICE} language='json' title='View Oracle Price Update message' />

            <h4 className='font-semibold mt-6'>Heartbeat</h4>
            <p className='text-sm'>
              Send <code className='bg-muted px-1 rounded'>{`{"type": "Ping"}`}</code> periodically. Server responds with <code className='bg-muted px-1 rounded'>{`{"type": "Pong"}`}</code>. Connections without activity for 60 seconds are closed.
            </p>

            <h4 className='font-semibold mt-3'>Rate Limits</h4>
            <p className='text-sm'>
              There are currently no rate limits on the testnet API. This may change for mainnet.
            </p>

            <hr className='border-foreground/10 my-8' />

            {/* Support */}
            <h2 id='support' className='text-xl sm:text-2xl font-bold'>Support</h2>
            <p>
              For integration support or questions, reach out to{' '}
              <a
                className='text-primary hover:text-foreground'
                href='mailto:support@zoroswap.com'
              >
                support@zoroswap.com
              </a>{' '}
              or join {' '}
              <a
                className='text-primary hover:text-foreground'
                href='https://t.me/+KyKHHuIxxPdmOTky'
                target='_blank'
                rel='noopener noreferrer'
              >
                  our Telegram group
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Developers;
