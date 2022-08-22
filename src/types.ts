export interface Stopwatch {
    /** Starting time point to count on */
    startingTime?: Date;
    /** The timer is paused initially */
    isPaused?: boolean;
    /** Elapsed time before "lastStartTime" */
    lastElapsed?: number;
    /** The most recent starting time */
    lastStartTime?: Date;
}
export type Stopwatches = { [key: string]: Stopwatch };

export type Configuration = { [key: string]: any };
