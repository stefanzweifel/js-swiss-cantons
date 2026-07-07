import { defineConfig } from 'tsdown';

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        zipcodes: 'src/zipcodes/index.ts',
        'zipcodes/simple': 'src/zipcodes/simple.ts',
    },
    format: 'esm',
    dts: true,
    clean: true,
    outExtensions: () => ({ js: '.js' }),
});
