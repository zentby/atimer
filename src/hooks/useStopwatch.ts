import { useState } from "react";
import { useInterval } from "usehooks-ts";

export const useStopwatch = (startTime: Date, elapsed: number, isPaused: boolean) => {
    const [time, setTime] = useState(getTime(startTime, elapsed, isPaused));
    useInterval(() => {
        if (!isPaused) {
            setTime(getTime(startTime, elapsed));
        }
    }, 1000);
    return time;
};

const getTime = (
    startTime: Date,
    elapsed: number,
    isPaused: boolean = false
) => {
    const newElapsed =
        (isPaused ? 0 : new Date().getTime() - startTime.getTime()) / 1000 +
        elapsed;
    const totalSeconds = Math.floor(newElapsed);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const hours = Math.floor(totalSeconds / 3600);
    return { hours, minutes, seconds };
};
