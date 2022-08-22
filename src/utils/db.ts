import { Stopwatches } from "../types";
import localforage from "localforage";

const DB_STOPWATCHES = "stopwatches";
const DB_CONFIG = "config";

const stopwatchDb = localforage.createInstance({
    name: "atimer",
    storeName: "atimer",
});

export const getStopWatches = async (): Promise<Stopwatches> => {
    const stopwatches = await stopwatchDb.getItem<Stopwatches>(DB_STOPWATCHES);
    return stopwatches ?? {};
};

export const setStopWatches = async (
    stopwatches: Stopwatches
): Promise<void> => {
    await stopwatchDb.setItem(DB_STOPWATCHES, stopwatches);
};

export const getConfig = async (): Promise<any> => {
    const config = await stopwatchDb.getItem<any>(DB_CONFIG);
    return config ?? {};
};

export const upsertConfig = async (config: any): Promise<void> => {
    const oldConfig = await getConfig();
    await stopwatchDb.setItem(DB_CONFIG, { ...oldConfig, ...config });
};