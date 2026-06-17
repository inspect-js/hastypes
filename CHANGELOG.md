# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v4.0.2](https://github.com/inspect-js/hastypes/compare/v4.0.1...v4.0.2) - 2026-06-17

### Commits

- [Deps] update `pargs` [`e31e682`](https://github.com/inspect-js/hastypes/commit/e31e682650184049b82611547d897edc2a933445)
- [Dev Deps] override `yargs` to 17.7.3-candidate.0 (Node 26 require(ESM) fix) [`150ac06`](https://github.com/inspect-js/hastypes/commit/150ac06eaf9f96b657858dba42b07eae9c2fb5ae)

## [v4.0.1](https://github.com/inspect-js/hastypes/compare/v4.0.0...v4.0.1) - 2026-06-16

### Commits

- [Fix] detect bundled types declared outside `./index.d.ts` [`1e43776`](https://github.com/inspect-js/hastypes/commit/1e437766f31125e741b065c21184143dcd7a1d11)
- [Dev Deps] add `@types/semver` [`598c3f5`](https://github.com/inspect-js/hastypes/commit/598c3f57f39227071a8cc1bee0a6f12b7b95bead)

## [v4.0.0](https://github.com/inspect-js/hastypes/compare/v3.0.0...v4.0.0) - 2026-06-16

### Commits

- [Fix] fall back to the package major when an exact `@types` version is unpublished [`53d528d`](https://github.com/inspect-js/hastypes/commit/53d528d056a2226f36a1049ee398834057ee8aad)
- [Dev Deps] update `eslint`, `@ljharb/eslint-config`; migrate to flat config [`0278f1f`](https://github.com/inspect-js/hastypes/commit/0278f1f9742c710b2896f9779761362554b4db24)
- [meta] update repo URL [`c49f908`](https://github.com/inspect-js/hastypes/commit/c49f908388bb287215691dceb8b457791b6da28e)
- [Dev Deps] update `@arethetypeswrong/cli`, `@ljharb/eslint-config`, `@types/node`, `auto-changelog`, `eslint`, `npmignore`, `tape` [`301eb7a`](https://github.com/inspect-js/hastypes/commit/301eb7a0de12e959fa92d331c926ef1568ccb592)
- [Breaking] drop node 22 [`6f4bcd5`](https://github.com/inspect-js/hastypes/commit/6f4bcd58096c288cd47bb8cf52f2125037446f25)
- [Deps] update `dts-gen`, `get-dep-tree`, `npm-package-arg`, `pacote`, `pargs`, `tmp` [`9b0407e`](https://github.com/inspect-js/hastypes/commit/9b0407e30e088648ec32b3db6b2ca7d4b29a0749)
- [actions] update workflows [`0706c54`](https://github.com/inspect-js/hastypes/commit/0706c54a643f24ad3abfde0b72b2723f12a5806b)
- [Robustness] use `es-errors` [`1c55a8c`](https://github.com/inspect-js/hastypes/commit/1c55a8c4a27efbdd5431b3d4062bf223d40c9cbf)
- [Fix] check the `types` field points at a `.d.ts`/`.d.mts`/`.d.cts` file [`836af5d`](https://github.com/inspect-js/hastypes/commit/836af5d7e87e97006e15c63335ecd2edc83b455a)
- [Deps] update `npm-package-arg` [`4855450`](https://github.com/inspect-js/hastypes/commit/48554505b07f3a5fe5890f48c5ea8827b1f2eee3)
- [Dev Deps] update `eslint` [`3b04724`](https://github.com/inspect-js/hastypes/commit/3b04724626bdb88776bf6f21ec4b1eee6aa2569c)
- [readme] replace runkit CI badge with shields.io check-runs badge [`0bea164`](https://github.com/inspect-js/hastypes/commit/0bea164cc9eac12574f6da319ab3705884498f54)

## [v3.0.0](https://github.com/inspect-js/hastypes/compare/v2.0.0...v3.0.0) - 2025-10-30

### Commits

- [Refactor] use `pargs` package [`ea23656`](https://github.com/inspect-js/hastypes/commit/ea23656a8e6f955bc90ae1e7a47785318a018587)
- [meta] add missing LICENSE file [`6d1ee7e`](https://github.com/inspect-js/hastypes/commit/6d1ee7e5c7097713bcd5f19e2a5b62577a1e7b01)
- [meta] fix package name [`af54a47`](https://github.com/inspect-js/hastypes/commit/af54a47b06f62d02481856e6d3e4bfe67d22f747)
- [Fix] handle when an ESM-only package has a `.d.mts` file [`5862846`](https://github.com/inspect-js/hastypes/commit/58628465c59e28ba1f1bc27f6225e10b851ee0dc)
- [Dev Deps] update `@arethetypeswrong/cli`, `@ljharb/eslint-config`, `@ljharb/tsconfig`, `@types/node`, `@types/tape` [`4a88d33`](https://github.com/inspect-js/hastypes/commit/4a88d33b6967ce1e439673c95a163c09e80f8eed)
- [Deps] update `dts-gen`, `npm-package-arg`, `pacote`, `tmp` [`c3886f2`](https://github.com/inspect-js/hastypes/commit/c3886f225977089bd6b85854f79768e4c6bab12c)
- [Dev Deps] update `@arethetypeswrong/cli` [`adc79fa`](https://github.com/inspect-js/hastypes/commit/adc79fa655417990fb86cae4cefb8fddd53ef38a)
- [Breaking] update `engines.node` [`37c9baf`](https://github.com/inspect-js/hastypes/commit/37c9baf2e702c03cfd3e0e1f002bd55f3bf03c92)
- [meta] bump audit-level due to https://github.com/jonschlinkert/parse-git-config/issues/14 [`b258dce`](https://github.com/inspect-js/hastypes/commit/b258dcef92cf0faf6814443e3a0b4b84621a9bf3)
- [Deps] update `npm-package-arg` [`bc58421`](https://github.com/inspect-js/hastypes/commit/bc5842138bb92b1917067726d7402cd1a627a3f1)

## [v2.0.0](https://github.com/inspect-js/hastypes/compare/1.0.0...v2.0.0) - 2024-12-07

### Commits

- Only apps should have lockfiles [`0672041`](https://github.com/inspect-js/hastypes/commit/06720419048f728b217837168f2ff329507695bb)
- [Breaking] v2 implementation, tests, readme, types [`ddec422`](https://github.com/inspect-js/hastypes/commit/ddec422a9e4969d8ef4362f45b426902ab04af4f)

## 1.0.0 - 2017-11-13

### Commits

- Initial commit [`cafb49b`](https://github.com/inspect-js/hastypes/commit/cafb49b7292b7a85e4aeeccfd9f0c9425b1be8a1)
- Rename from has-types to hastypes [`8aa23de`](https://github.com/inspect-js/hastypes/commit/8aa23deb28fbf0ada1bb47b4f1ff70b3c11847ee)
- Force node engine to be 8.9.1 or higher [`bf908d7`](https://github.com/inspect-js/hastypes/commit/bf908d7a1a0fcab39e22b0f408668df514839ee6)
- Correct bin file [`162fb4a`](https://github.com/inspect-js/hastypes/commit/162fb4af78f9cad3a2f4176d0595f081ef0143a0)
- 1.0.1 release [`fbcee3a`](https://github.com/inspect-js/hastypes/commit/fbcee3a04ae4a861a1a6a0d46f8a45dd1a6b4d46)
