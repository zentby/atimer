import { createContext, ReactNode, useReducer } from "react";
import { Stopwatches, Stopwatch } from "../types";
import { setStopWatches } from "../utils";

interface Action {
    type: string;
    key?: string;
    payload?: Stopwatch;
}

export enum TimerActions {
    PAUSE = "pause",
    RESUME = "resume",
    RESET = "reset",
    UPSERT = "upsert",
    DELETE = "delete",
    SET_EXCLUSIVE = "set_exclusive",
}

const reducer = (state: Stopwatches, action: Action): Stopwatches => {
    const keys = action.key ? [action.key] : Object.keys(state);
    switch (action.type) {
        case TimerActions.PAUSE:
            return keys.reduce((prev, key) => {
                const { lastStartTime, lastElapsed } = prev[key];
                const newElapsed =
                    lastStartTime !== undefined
                        ? (new Date().getTime() - lastStartTime.getTime()) /
                          1000
                        : 0;
                const elapsed = Math.floor(newElapsed + (lastElapsed ?? 0));
                return {
                    ...prev,
                    [key]: {
                        ...prev[key],
                        isPaused: true,
                        lastElapsed: elapsed,
                        lastStartTime: undefined,
                    },
                };
            }, state);
        case TimerActions.RESUME:
            return keys.reduce(
                (prev, key) => ({
                    ...prev,
                    [key]: {
                        ...prev[key],
                        isPaused: false,
                        lastStartTime: prev[key].isPaused
                            ? new Date()
                            : prev[key].lastStartTime,
                        startingTime: prev[key].startingTime ?? new Date(),
                    },
                }),
                state
            );
        case TimerActions.RESET:
            return keys.reduce(
                (prev, key) => ({
                    ...prev,
                    [key]: {
                        ...prev[key],
                        isPaused: true,
                        startingTime: undefined,
                        lastStartTime: undefined,
                        lastElapsed: 0,
                    },
                }),
                state
            );
        case TimerActions.UPSERT:
            const key = action.key ?? Date.now().toString();
            return {
                ...state,
                [key]: {
                    isPaused: true,
                    startingTime: undefined,
                    lastStartTime: undefined,
                    lastElapsed: 0,
                    ...state[key],
                },
            };
        case TimerActions.DELETE:
            const newState = Object.assign({}, state);
            keys.forEach((key) => delete newState[key]);
            return newState;
        case TimerActions.SET_EXCLUSIVE:
            const runningTimers = keys.filter(
                (key) => state[key].isPaused === false
            );
            if (runningTimers.length == 1) {
                return state;
            }
            return reducer(state, { type: TimerActions.PAUSE });
    }
    return state;
};

const reducerHooks = (state: Stopwatches, action: Action): Stopwatches => {
    const newState = reducer(state, action);
    setStopWatches(newState).catch((err) =>
        console.error("Saving data failed", err)
    );
    return newState;
};

export const TimersStateContext = createContext<{ state: Stopwatches }>({
    state: {},
});
export const TimersDispatchContext = createContext<{
    dispatch: (action: Action) => void;
}>({
    dispatch: () => {},
});

export const TimersContextProvider = ({
    children,
    timers,
}: {
    children: ReactNode;
    timers: { [key: string]: Stopwatch };
}) => {
    const [state, dispatch] = useReducer(reducerHooks, timers);

    return (
        <TimersDispatchContext.Provider value={{ dispatch }}>
            <TimersStateContext.Provider value={{ state }}>
                {children}
            </TimersStateContext.Provider>
        </TimersDispatchContext.Provider>
    );
};
