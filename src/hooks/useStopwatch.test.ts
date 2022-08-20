import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { act, renderHook } from "@testing-library/react-hooks/dom";
import { useStopwatch } from "./useStopwatch";

beforeEach(() => {
    vi.useFakeTimers();
});
afterEach(() => {
    vi.restoreAllMocks();
});
describe("test stopwatch", () => {
    it("should count on from start", () => {
        const { result } = renderHook(() =>
            useStopwatch({ timers: { a: {} } })
        );
        act(() => {
            vi.advanceTimersToNextTimer();
        });
        expect(result.current.stopwatches["a"].seconds).toBe(1);
    });

    it("should count on from givin seconds", () => {
        const { result } = renderHook(() =>
            useStopwatch({ timers: { a: { initialSeconds: 10 } } })
        );
        act(() => {
            vi.advanceTimersToNextTimer();
        });
        expect(result.current.stopwatches["a"].seconds).toBe(11);
    });

    it("should count on with correct hours and minutes", () => {
        const { result } = renderHook(() =>
            useStopwatch({ timers: { a: { initialSeconds: 4000 } } })
        );
        act(() => {
            vi.advanceTimersToNextTimer();
        });
        expect(result.current.stopwatches["a"].seconds).toBe(41);
        expect(result.current.stopwatches["a"].minutes).toBe(6);
        expect(result.current.stopwatches["a"].hours).toBe(1);
    });

    it("should count on from givin starting time", () => {
        const now = new Date(2022, 8, 1, 1, 2, 0);
        vi.setSystemTime(now);
        const oldDate = new Date(2022, 8, 1, 1, 1, 0);
        const { result } = renderHook(() =>
            useStopwatch({
                timers: { a: { initialSeconds: 10, startingTime: oldDate } },
            })
        );
        act(() => {
            vi.advanceTimersToNextTimer();
        });
        expect(result.current.stopwatches["a"].seconds).toBe(10 + 1);
        expect(result.current.stopwatches["a"].minutes).toBe(1);
    });
});

describe("test stopwatch controls", () => {
    it("should pause/resume stopwatch when pause()/resume()", () => {
        const { result } = renderHook(() =>
            useStopwatch({ timers: { a: {} } })
        );
        act(() => {
            vi.advanceTimersToNextTimer();
        });
        expect(result.current.stopwatches["a"].seconds).toBe(1);
        act(() => {
            result.current.pause("a");
        });
        act(() => {
            vi.advanceTimersByTime(2000);
        });
        expect(result.current.stopwatches["a"].seconds).toBe(1);

        act(() => {
            result.current.resume("a");
        });
        act(() => {
            vi.advanceTimersByTime(2000);
        });
        expect(result.current.stopwatches["a"].seconds).toBe(3);
    });
});
