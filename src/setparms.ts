#!/usr/bin/env node

import { parse } from 'ts-command-line-args'
import fs from 'fs'
import path from 'path'

interface IViscaiArguments {
    predictionEndpoint?: string;
    reviewEndpoint?: string;
}

export const args = parse<IViscaiArguments>({
    predictionEndpoint: { type: String, optional: true, alias: 'p' },
    reviewEndpoint: { type: String, optional: true, alias: 'r' },
});
let parms;
try {
    const jsonString = fs.readFileSync(new URL('./parms.json', import.meta.url)).toString('utf8');
    parms = JSON.parse(jsonString);
} catch (err) { 
    console.error(err);
}

console.log(`parms: ${JSON.stringify(parms)}`);