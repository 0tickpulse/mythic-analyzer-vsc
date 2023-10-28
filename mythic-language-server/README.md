# mythic-language-server

Language server used by mythic-analyzer-vsc.

## Development

* This project uses [pnpm](https://pnpm.js.org/) as package manager. Install it with `npm i -g pnpm`.
* `mythic-analyzer` isn't listed as a dependency in `package.json` because it is not published to npm. To install it, [clone it](https://github.com/0tickpulse/mythic-analyzer), compile it, and run `pnpm link` in its directory. Then, run `pnpm link mythic-analyzer` in this directory. This will create a symlink to the local `mythic-analyzer` package.
