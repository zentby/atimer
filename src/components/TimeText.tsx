import { Box, Typography } from "@mui/material";
import { useStopwatch } from "../hooks/useStopwatch";
import { fixedDigits } from "../utils";

interface TimeTextProps {
    lastStartTime: Date;
    lastElapsed: number;
    isPaused: boolean;
}

export const TimeText = ({
    lastStartTime,
    lastElapsed,
    isPaused,
}: TimeTextProps) => {
    const { hours, minutes, seconds } = useStopwatch(
        lastStartTime,
        lastElapsed,
        isPaused
    );
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Typography variant="h1">{`${fixedDigits(hours, 2)}:${fixedDigits(
                minutes,
                2
            )}`}</Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    marginLeft: "10px",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    {fixedDigits(seconds, 2)}
                </Typography>
            </Box>
        </Box>
    );
};
