import { useReducer } from "react";
import useInterval from "./useInterval";

interface StopWatchProps {
    timers: { [key: string]: StopwatchBase };
}
type Stopwatches = { [key: string]: Stopwatch };

interface StopwatchBase {
    /** Elapsed time */
    initialSeconds?: number;
    /** Starting time point to count on */
    startingTime?: Date;
}
interface Stopwatch extends StopwatchBase {
    isPaused: boolean;
    elapsed: number;
    lastElapsed: number;
    lastStartTime: Date;
    seconds?: number;
    minutes?: number;
    hours?: number;
}

interface Action {
    type: string;
    key?: string;
    payload?: string;
}
const reducer = (state: Stopwatches, action: Action): Stopwatches => {
    const keys = action.key ? [action.key] : Object.keys(state);
    switch (action.type) {
        case "update-clock":
            return keys.reduce((prev, key) => {
                const stopwatch: Stopwatch = prev[key];
                if (!stopwatch.isPaused) {
                    const newElapsed =
                        new Date().getTime() -
                        stopwatch.lastStartTime.getTime();
                    const elapsed = stopwatch.lastElapsed + newElapsed,
                        seconds = Math.floor((elapsed / 1000) % 60),
                        minutes =
                            Math.floor((elapsed - seconds) / 60 / 1000) % 60,
                        hours = Math.floor(
                            (elapsed - seconds * 1000 - minutes * 60000) /
                                1000 /
                                3600
                        );
                    return {
                        ...prev,
                        [key]: {
                            ...prev[key],
                            elapsed,
                            seconds,
                            minutes,
                            hours,
                        },
                    };
                }
                return prev;
            }, state);
        case "pause":
            return keys.reduce(
                (prev, key) => ({
                    ...prev,
                    [key]: {
                        ...prev[key],
                        isPaused: true,
                        lastElapsed: prev[key].elapsed,
                    },
                }),
                state
            );
        case "resume":
            return keys.reduce(
                (prev, key) => ({
                    ...prev,
                    [key]: {
                        ...prev[key],
                        isPaused: false,
                        lastStartTime: prev[key].isPaused
                            ? new Date()
                            : prev[key].lastStartTime,
                    },
                }),
                state
            );
    }
    return state;
};

export const useStopwatch = ({ timers }: StopWatchProps) => {
    const [state, dispatch] = useReducer(
        reducer,
        Object.keys(timers).reduce<Stopwatches>(
            (prev, key) => ({
                ...prev,
                [key]: {
                    initialSeconds: timers[key]?.initialSeconds ?? 0,
                    startingTime: timers[key]?.startingTime ?? new Date(),
                    elapsed: (timers[key]?.initialSeconds ?? 0) * 1000,
                    lastElapsed: (timers[key]?.initialSeconds ?? 0) * 1000,
                    lastStartTime: timers[key]?.startingTime ?? new Date(),
                    isPaused: false,
                } as Stopwatch,
            }),
            {} as Stopwatches
        )
    );

    const updateClock = (key?: string) => {
        dispatch({ type: "update-clock", key });
    };
    useInterval(updateClock, 500);

    return {
        stopwatches: state,
        pause: (key?: string) => {
            updateClock(key);
            dispatch({ type: "pause", key });
        },
        resume: (key?: string) => {
            dispatch({ type: "resume", key });
        },
    };
};
