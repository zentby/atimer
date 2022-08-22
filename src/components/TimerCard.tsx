import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Collapse,
    IconButton,
    IconButtonProps,
    styled,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    ExpandMore as ExpandMoreIcon,
    Pause,
    PlayArrow,
    Replay,
} from "@mui/icons-material";
import { memo, useCallback, useState } from "react";
import { TimeText } from "./TimeText";

interface TimerCardProps {
    id: string;
    lastStartTime: Date;
    lastElapsed: number;
    started?: Date;
    isPaused: boolean;
    showControls?: boolean;
    deletable?: boolean;
    onCardClick?: (key: string) => void;
    onPlayOrPause?: (key: string) => void;
    onReset?: (key: string) => void;
    onDelete?: (key: string) => void;
}

const TimerCard = ({
    id,
    lastElapsed,
    lastStartTime,
    started,
    isPaused,
    showControls,
    onCardClick,
    onPlayOrPause,
    onReset,
    onDelete,
    deletable = true,
}: TimerCardProps) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDelete = useCallback(() => {
        onDelete?.(id);
    }, [onDelete, id]);

    const handlePlayOrPause = useCallback(() => {
        onPlayOrPause?.(id);
    }, [onPlayOrPause, id]);

    const handleReset = useCallback(() => {
        onReset?.(id);
    }, [onReset, id]);

    const handleCardClick = useCallback(() => {
        onCardClick?.(id);
    }, [onCardClick, id]);

    return (
        <Card sx={{ maxWidth: "sm", margin: "20px", minWidth: "300px" }}>
            <CardContent sx={{ paddingLeft: "20px", paddingRight: "20px" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="subtitle1"> Stopwatch</Typography>
                    {deletable && (
                        <IconButton aria-label="delete" onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
                <CardActionArea onClick={handleCardClick}>
                    <TimeText
                        lastElapsed={lastElapsed}
                        lastStartTime={lastStartTime}
                        isPaused={isPaused}
                    />
                </CardActionArea>

                <CardActions disableSpacing>
                    {showControls && (
                        <>
                            {isPaused ? (
                                <IconButton
                                    aria-label="start"
                                    onClick={handlePlayOrPause}
                                >
                                    <PlayArrow />
                                </IconButton>
                            ) : (
                                <IconButton
                                    aria-label="pause"
                                    onClick={handlePlayOrPause}
                                >
                                    <Pause />
                                </IconButton>
                            )}
                            <IconButton
                                aria-label="reset"
                                onClick={handleReset}
                            >
                                <Replay />
                            </IconButton>
                        </>
                    )}
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography variant="body1">
                    {`Started: ${started?.toLocaleString()}`}
                </Typography>
            </Collapse>
        </Card>
    );
};

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

export default memo(TimerCard);
