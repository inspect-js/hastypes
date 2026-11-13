import { execFile } from 'child_process';
import path from 'path';
import { promisify } from 'util';

import test from 'tape';

const bin = path.join(import.meta.dirname, '..', 'bin.mjs');

/** @type {(args: string[]) => Promise<{ code: number, stdout: string, stderr: string }>} */
function run(args) {
	return promisify(execFile)(process.execPath, [bin].concat(args)).then(
		({ stdout, stderr }) => ({ code: 0, stdout, stderr }),
		(e) => ({ code: e.code, stdout: e.stdout, stderr: e.stderr }),
	);
}

test('bin: a package specifier is required', async (t) => {
	const { code, stderr } = await run([]);

	t.equal(code, 1, 'exits 1');
	t.doesNotMatch(stderr, /Cannot read properties of undefined/, 'does not crash');
	t.match(stderr, /positional/i, 'reports the missing positional');
});

test('bin: an invalid `--before` date is a usage error', async (t) => {
	const { code, stdout, stderr } = await run(['hastypes', '--before', 'not a date']);

	t.equal(code, 1, 'exits 1');
	t.match(stderr, /`before` option must be a valid Date value/, 'reports the invalid date');
	t.match(stdout + stderr, /Usage: hastypes/, 'prints usage');
});

test('bin: usage for an error goes to stderr, keeping stdout clean', async (t) => {
	const { code, stdout, stderr } = await run(['hastypes', '--bogus']);

	t.equal(code, 1, 'exits 1');
	t.equal(stdout, '', 'nothing on stdout');
	t.match(stderr, /Unknown option '--bogus'/, 'reports the error on stderr');
	t.match(stderr, /Usage: hastypes/, 'prints usage on stderr');
});

test('bin: an explicit `--help` still goes to stdout', async (t) => {
	const { code, stdout } = await run(['--help']);

	t.equal(code, 0, 'exits 0');
	t.match(stdout, /Usage: hastypes/, 'prints usage on stdout');
});
