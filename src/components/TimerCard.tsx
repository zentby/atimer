interface TimerCardProps {
    hours?: number;
    minutes?: number;
    seconds?: number;
    started?: Date;
}

export const TimerCard = ({
    hours,
    minutes,
    seconds,
    started,
}: TimerCardProps) => {
    return (
        <div>
            <div>
                <div>Stopwatch</div>
                <div>Delete</div>
            </div>
            <div>
                <div>
                    <span>{`${hours?.toString().padStart(2, "0")}:${minutes
                        ?.toString()
                        .padStart(2, "0")}`}</span>
                    <span>{seconds?.toString().padStart(2, "0")}</span>
                </div>
            </div>
            <div>
                <div>{started?.toLocaleString()}</div>
            </div>
        </div>
    );
};
