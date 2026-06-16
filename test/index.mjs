import test from 'tape';

import hasTypes from '../index.mjs';

const before = '2025-10-31'; // update this date as desired

test('hasTypes', async (t) => {
	t.comment(`date is pinned to ${before}`);

	const packages = {
		'has-proto': true,
		'tape@4': '@types/tape@4',
		'tape@latest': '@types/tape@latest',
		tape: '@types/tape@latest',
		'pargs@1.0.0': true,
		// runtime `express` is at 4.21, but `@types/express` caps at 4.17: falls back to the major
		'express@4.21.2': '@types/express@4',
		// `chalk`'s `types` points at `./source/index.d.ts`; only a `fullMetadata` manifest exposes it
		'chalk@5.3.0': true,
	};

	// eslint-disable-next-line max-len
	const results = /** @type {[keyof packages, PromiseSettledResult<`@types/${string}` | boolean>][]} */ (await Promise.all(Object.keys(packages).map(async (specifier) => [
		specifier,
		(await Promise.allSettled([hasTypes(specifier, { before })]))[0],
	])));

	results.forEach(([specifier, {
		status,
		// @ts-expect-error yes, it exists on one half of the union
		value,
		// @ts-expect-error yes, it exists on one half of the union
		reason,
	}]) => {
		t.equal(status, 'fulfilled', `expected ${specifier} to be fulfilled; got ${status}`);
		if (status === 'fulfilled') {
			t.equal(value, packages[specifier], `expected ${specifier} to be ${packages[specifier]}; got ${value}`);
		} else {
			t.fail(reason);
		}
	});
});
