import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigurationContext } from "./components/ConfigurationContext";
import { TimersContextProvider } from "./components/TimerContext";
import { Configuration, Stopwatches } from "./types";
import { getConfig, getStopWatches } from "./utils";

const renderUI = (timers: Stopwatches, config: Configuration) => {
    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <React.StrictMode>
            <ConfigurationContext.Provider value={config}>
                <TimersContextProvider timers={timers}>
                    <App config={config} />
                </TimersContextProvider>
            </ConfigurationContext.Provider>
        </React.StrictMode>
    );
};
const loadData = async () => {
    const timers = await getStopWatches();
    const config = await getConfig();
    return { timers, config };
};

loadData()
    .then(({ timers, config }) => {
        if (Object.keys(timers).length == 0) {
            timers[0] = {};
        }
        renderUI(timers, config);
    })
    .catch((err) => {
        console.error("Failed to load data from database", err);
        renderUI({ 0: {} }, {});
    });
