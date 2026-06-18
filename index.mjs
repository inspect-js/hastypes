import { existsSync } from 'fs';
import { join, dirname, basename, extname } from 'path';

import { dirSync } from 'tmp';
import npa from 'npm-package-arg';
import pacote from 'pacote';
import { getDTName } from 'dts-gen/dist/names.js';
import { coerce } from 'semver';
import regexTester from 'safe-regex-test';
import $TypeError from 'es-errors/type';

const { extract, manifest } = pacote;

const isDeclarationFile = regexTester(/\.d\.[mc]?ts$/);

/**
 * @param {string} dtName
 * @param {false | Date} date
 * @param {Promise<string>} range
 */
async function resolve(dtName, date, range) {
	return manifest(`@types/${dtName}@${range}`, { before: date })
		.then(
			(m) => m.version,
			() => null,
		);
}

/**
 * `@types/*` packages track the runtime package's major.minor, but the patch is their own
 * and they often lag a minor behind. So when the exact range has no match, fall back to the
 * same major before concluding that no `@types` package exists.
 *
 * @param {string} name
 * @param {string} fetchSpec
 * @param {false | Date} date
 */
async function dtSpec(name, fetchSpec, date) {
	const dtName = getDTName(name);
	const wanted = fetchSpec === '*' ? 'latest' : fetchSpec;

	const exact = await resolve(dtName, date, wanted);
	if (exact) {
		return /** @type {const} */ (`@types/${dtName}@^${exact}`);
	}

	const major = coerce(wanted)?.major;
	if (typeof major === 'number' && `${major}` !== wanted) {
		const resolved = await resolve(dtName, date, `${major}`);
		if (resolved) {
			return /** @type {const} */ (`@types/${dtName}@^${resolved}`);
		}
	}

	return false;
}

/** @type {import('./index.d.mts').default} */
export default async function hasTypes(specifier, { before } = {}) {
	const date = typeof before !== 'undefined' && new Date(before);
	if (date && isNaN(Number(date))) {
		throw new $TypeError('`before` option must be a valid Date value');
	}

	const {
		registry,
		name,
		fetchSpec,
	} = npa(specifier);
	if (!registry) {
		throw new $TypeError('specifier must be a registry package');
	}

	const { name: tmpdir, removeCallback } = dirSync({ unsafeCleanup: true });

	const pExtract = extract(specifier, tmpdir, { before: date }).catch(() => null);

	try {
		// `fullMetadata` is required: a plain manifest omits `main`/`types` (they aren't install metadata)
		const { main, types } = await manifest(specifier, { before: date, fullMetadata: true });

		// don't bother supporting typings
		if (types) {
			if (typeof types !== 'string') {
				throw new $TypeError('`types` field is not a string. Please report this!');
			}

			if (!isDeclarationFile(types)) {
				return false;
			}
			await pExtract;
			return existsSync(join(tmpdir, types));
		}

		const index = main || 'index.js';
		const extless = join(dirname(index), basename(index, extname(index)));
		const dts = /** @type {const} */ ([
			`./${extless}.d.ts`,
			`./${extless}.d.mts`,
			`./${extless}.d.cts`,
		]);

		await pExtract;
		if (dts.some((x) => existsSync(join(tmpdir, x)))) {
			return true;
		}

		return dtSpec(name, fetchSpec, date);
	} finally {
		await pExtract;
		removeCallback();
	}
}
