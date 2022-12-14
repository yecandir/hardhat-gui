# hardhat-gui

A Graphical User Interface for testing contracts with wallet.

## A GUI Plugin for Hardhat

This plugin help you to test and control your deployed contracts before production.
It creates simple one-click app for contracts

## Installation

```bash
npm install hardhat-gui
```

Import the plugin in your `hardhat.config.js`:

```js
require('hardhat-gui');
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import 'hardhat-gui';
```

## Required plugins

This plugin requires that contracts are deployed using hardhat-deploy plugin

-   [wighawag/hardhat-deploy](https://github.com/wighawag/hardhat-deploy.git)

## Usage

First deploy your contracts if it is not deployed yet!

```bash
npx hardhat deploy
```

Last start react server

```bash
npx hardhat gui
```
