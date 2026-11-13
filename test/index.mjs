import test from 'tape';

import hasTypes from '../index.mjs';

const before = '2025-10-31'; // update this date as desired

test('hasTypes', async (t) => {
	t.comment(`date is pinned to ${before}`);

	const packages = {
		'has-proto': true,
		// the returned `@types` specifier is always the fully resolved version as a caret range, not the queried range
		'tape@4': '@types/tape@^4.13.4',
		'tape@latest': '@types/tape@^5.8.1',
		tape: '@types/tape@^5.8.1',
		'pargs@1.0.0': true,
		// runtime `express` is at 4.21, but `@types/express` caps at 4.17: falls back to the major
		'express@4.21.2': '@types/express@^4.17.25',
		// `chalk`'s `types` points at `./source/index.d.ts`; only a `fullMetadata` manifest exposes it
		'chalk@5.3.0': true,
	};

	const specifiers = /** @type {(keyof typeof packages)[]} */ (Object.keys(packages));

	const results = await Promise.all(specifiers.map(async (specifier) => /** @type {const} */ ([
		specifier,
		(await Promise.allSettled([hasTypes(specifier, { before })]))[0],
	])));

	results.forEach(([specifier, result]) => {
		t.equal(result.status, 'fulfilled', `expected ${specifier} to be fulfilled; got ${result.status}`);
		if (result.status === 'fulfilled') {
			t.equal(result.value, packages[specifier], `expected ${specifier} to be ${packages[specifier]}; got ${result.value}`);
		} else {
			t.fail(result.reason);
		}
	});
});

test('an unresolvable specifier rejects cleanly instead of crashing', async (t) => {
	// `resolve@2.0` has only prereleases, so the manifest ETARGETs; the eager extract must not reject unhandled
	const error = await hasTypes('resolve@2.0', { before }).then(() => null, (e) => e);

	t.ok(error, 'an unresolvable specifier rejects');
	t.equal(error && error.code, 'ETARGET', 'rejects with ETARGET, rather than crashing the process');

	t.end();
});
