#! /usr/bin/env node

import npa from 'npm-package-arg';

import pargs from 'pargs';

const {
	errors,
	help,
	positionals: [specifier],
	values: { before },
} = await pargs(import.meta.filename, {
	allowPositionals: 1,
	options: {
		before: {
			type: 'string',
		},
	},
});

if (typeof before !== 'undefined' && typeof before !== 'string') {
	errors.push('`before` option must be a valid Date value');
}

await help();

let name, rawSpec;
try {
	({ name, rawSpec } = npa(specifier));
	if (rawSpec === '*') {
		rawSpec = 'latest';
	}
} catch (e) {
	// eslint-disable-next-line no-extra-parens
	console.error(/** @type {Error} */ (e)?.message ?? 'Unknown error');
	process.exit(1);
}

import hasTypes from './index.mjs';

import mockProperty from 'mock-property';

// eslint-disable-next-line no-empty-function, no-extra-parens
const restore = mockProperty(/** @type {Parameters<typeof mockProperty>[0]} */ (/** @type {unknown} */ (console)), 'error', { value() {} });
// @ts-expect-error before is a string
const promise = hasTypes(specifier, { before });

promise.finally(() => {
	restore();
}).catch((e) => {
	console.error(e.message);
	process.exit(1);
}).then((r) => {
	console.log(`${name}@${rawSpec} ${typeof r === 'string' ? r : r ? 'integrated' : 'none'}`);
});
