#!/usr/bin/env node
'use strict';

const { runCLI } = require("../lib");

(async () => {
  await runCLI();
})().catch(console.error);
