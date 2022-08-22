import { AddOutlined } from "@mui/icons-material";
import {
    AppBar,
    Box,
    FormControlLabel,
    Grid,
    IconButton,
    Switch,
    Toolbar,
} from "@mui/material";
import { useContext, useState } from "react";
import { TimerActions, TimersDispatchContext } from "./components/TimerContext";
import { TimerStack } from "./components/TimerStack";
import { Configuration } from "./types";
import { upsertConfig } from "./utils";

function App({ config }: { config: Configuration }) {
    const [excl, setExcl] = useState(config["exclusive"] ?? false);
    const { dispatch } = useContext(TimersDispatchContext);

    const onExclChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExcl(e.target.checked);
        if (e.target.checked) {
            dispatch({ type: TimerActions.SET_EXCLUSIVE });
        }
        upsertConfig({ exclusive: e.target.checked });
    };

    return (
        <Grid container justifyContent="center">
            <AppBar position="sticky">
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    color="warning"
                                    onChange={onExclChange}
                                    checked={excl}
                                />
                            }
                            defaultChecked={excl}
                            label="Exclusive Mode"
                        />
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton
                            color="inherit"
                            size="large"
                            onClick={() => {
                                dispatch({
                                    type: TimerActions.UPSERT,
                                    payload: {
                                        isPaused: true,
                                    },
                                });
                            }}
                        >
                            <AddOutlined />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <TimerStack exclusiveMode={excl} />
        </Grid>
    );
}

export default App;
