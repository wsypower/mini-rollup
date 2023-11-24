interface RollupOptions {
    entry: string;
    output: string;
}
declare function rollup(config: RollupOptions): void;

export { rollup as default };
