export default async (args: string[], callback: () => void): Promise<void> => {
    const oldArgv = process.argv;
    process.argv = [...oldArgv.slice(0, 2), ...args];
    try {
        await callback();
    } finally {
        process.argv = oldArgv;
    }
};
