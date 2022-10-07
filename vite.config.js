import { defineConfig } from 'vitest/config';
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
	test: {
		include: ['**/js/*.test.js'],
		globals: true,
		reporters: 'verbose',
	},
	root: 'src',
	build: {
		emptyOutDir: true,
		outDir: '../dist',
	},
	plugins: [
		topLevelAwait({
		  promiseExportName: "__tla",
		  promiseImportName: i => `__tla_${i}`
		})
	  ]
});
