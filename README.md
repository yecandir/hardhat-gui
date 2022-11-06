# hardhat-gui

A Graphical User Interface for testing with wallet.

## What

This plugin help you to test and control your deployed contracts before production.
It creates simple one-click app for contracts

## Installation

<_A step-by-step guide on how to install the plugin_>

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

## Tasks

This plugin creates no additional tasks.

You can simply start your react interface by

```bash
npx hardhat gui
```

## Usage

<_A description of how to use this plugin. How to use the tasks if there are any, etc._>

There are no additional steps you need to take for this plugin to work.

Install it and access ethers through the Hardhat Runtime Environment anywhere
you need it (tasks, scripts, tests, etc).
