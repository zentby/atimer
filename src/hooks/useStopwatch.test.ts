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
    it("should not count if it is paused", () => {
        const { result } = renderHook(() => useStopwatch(new Date(), 0, true));
        act(() => {
            vi.advanceTimersByTime(10000);
        });
        expect(result.current.seconds).toBe(0);
    });

    it("should have default values", () => {
        const { result } = renderHook(() =>
            useStopwatch(new Date(), 4000, true)
        );
        expect(result.current.seconds).toBe(40);
        expect(result.current.minutes).toBe(6);
        expect(result.current.hours).toBe(1);
    });

    it("should count on from 0 when is not paused", () => {
        const { result } = renderHook(() => useStopwatch(new Date(), 0, false));
        act(() => {
            vi.advanceTimersToNextTimer();
        });
        expect(result.current.seconds).toBe(1);
    });

    it("should count on from givin seconds", () => {
        const { result } = renderHook(() =>
            useStopwatch(new Date(), 10, false)
        );
        act(() => {
            vi.advanceTimersToNextTimer();
        });
        expect(result.current.seconds).toBe(11);
    });

    it("should count on with correct hours and minutes", () => {
        const { result } = renderHook(() =>
            useStopwatch(new Date(), 4000, false)
        );
        act(() => {
            vi.advanceTimersToNextTimer();
        });
        expect(result.current.seconds).toBe(41);
        expect(result.current.minutes).toBe(6);
        expect(result.current.hours).toBe(1);
    });

    it("should count on from givin starting time", () => {
        const now = new Date(2022, 8, 1, 1, 2, 0);
        vi.setSystemTime(now);
        const oldDate = new Date(2022, 8, 1, 1, 1, 0);
        const { result } = renderHook(() => useStopwatch(oldDate, 10, false));
        act(() => {
            vi.advanceTimersToNextTimer();
        });
        expect(result.current.seconds).toBe(10 + 1);
        expect(result.current.minutes).toBe(1);
    });
});
