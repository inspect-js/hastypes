import ljharbConfig from '@ljharb/eslint-config/flat';
import ljharbNode20Config from '@ljharb/eslint-config/flat/node/20';

export default [
	...ljharbConfig,
	...ljharbNode20Config.map((c) => ({ ...c, files: ['bin.mjs'] })),
	{
		files: ['**/*'],
		rules: {
			'max-statements': 'off',
			'no-extra-parens': 'off',
		},
	},
];
