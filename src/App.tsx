import { TimerCard } from "./components/TimerCard";
import { useStopwatch } from "./hooks/useStopwatch";

const timers = { a: { initialSeconds: 9999 }, b: { initialSeconds: 19999 } };
function App() {
    const { stopwatches, pause, resume } = useStopwatch({
        timers,
    });
    return (
        <div>
            <div className="App">
                {Object.keys(timers).map((key) => (
                    <TimerCard
                        key={key}
                        started={stopwatches[key].startingTime}
                        {...stopwatches[key]}
                    />
                ))}
            </div>
            <div>
                <button onClick={() => pause()}>Pause All</button>
            </div>
            <div>
                <button onClick={() => resume()}>Resume All</button>
            </div>
        </div>
    );
}

export default App;
