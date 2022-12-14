import { Grid, Stack } from "@mui/material";
import { useCallback, useContext } from "react";
import TimerCard from "./TimerCard";
import {
    TimerActions,
    TimersDispatchContext,
    TimersStateContext,
} from "./TimerContext";

export const TimerStack = ({ exclusiveMode }: { exclusiveMode: boolean }) => {
    const { state: stopwatches } = useContext(TimersStateContext);
    const { dispatch } = useContext(TimersDispatchContext);
    const onCardClick = useCallback(
        (key: string) => {
            if (!stopwatches[key].isPaused) {
                dispatch({ type: TimerActions.PAUSE, key });
            } else {
                dispatch({ type: TimerActions.PAUSE });
                dispatch({ type: TimerActions.RESUME, key });
            }
        },
        [dispatch, stopwatches]
    );
    const onPlayOrPause = useCallback(
        (key: string) => {
            if (stopwatches[key].isPaused) {
                dispatch({ type: TimerActions.RESUME, key });
            } else {
                dispatch({ type: TimerActions.PAUSE, key });
            }
        },
        [dispatch, stopwatches]
    );
    const onReset = useCallback(
        (key: string) => {
            dispatch({ type: TimerActions.RESET, key });
        },
        [dispatch]
    );
    const onDelete = useCallback(
        (key: string) => {
            dispatch({ type: TimerActions.DELETE, key });
        },
        [dispatch]
    );
    return (
        // <Stack
        //     direction={{ xs: "column", sm: "row" }}
        //     marginTop="30px"
        //     flexWrap="wrap"
        // >
        <Grid container spacing={2}>
            {Object.keys(stopwatches)
                .sort()
                .map((key, _, array) => (
                    <Grid item sx={{ flexGrow: 1 }}>
                        <TimerCard
                            key={key}
                            started={stopwatches[key].startingTime}
                            id={key}
                            isPaused={!!stopwatches[key].isPaused}
                            lastStartTime={
                                stopwatches[key].lastStartTime ?? new Date()
                            }
                            lastElapsed={stopwatches[key].lastElapsed ?? 0}
                            onPlayOrPause={onPlayOrPause}
                            onReset={onReset}
                            onCardClick={onCardClick}
                            showControls={!exclusiveMode}
                            onDelete={onDelete}
                            deletable={array.length > 1}
                        />
                    </Grid>
                ))}
        </Grid>
        // </Stack>
    );
};
