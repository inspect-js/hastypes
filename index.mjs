import { existsSync } from 'fs';
import { join, dirname, basename, extname } from 'path';

import { dirSync } from 'tmp';
import npa from 'npm-package-arg';
import pacote from 'pacote';
import { getDTName } from 'dts-gen/dist/names.js';
import semver from 'semver';
import regexTester from 'safe-regex-test';
import $TypeError from 'es-errors/type';

const isDeclarationFile = regexTester(/\.d\.[mc]?ts$/);

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

	/** @param {string} range */
	function exists(range) {
		return pacote.manifest(`@types/${dtName}@${range}`, { before: date }).then(() => true, () => false);
	}

	if (await exists(wanted)) {
		return /** @type {const} */ (`@types/${dtName}@${wanted}`);
	}

	const major = semver.coerce(wanted)?.major;
	if (typeof major === 'number' && `${major}` !== wanted && await exists(`${major}`)) {
		return /** @type {const} */ (`@types/${dtName}@${major}`);
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

	const pExtract = pacote.extract(specifier, tmpdir, { before: date }).catch(() => null);

	try {
		// `fullMetadata` is required: a plain manifest omits `main`/`types` (they aren't install metadata)
		const { main, types } = await pacote.manifest(specifier, { before: date, fullMetadata: true });

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
