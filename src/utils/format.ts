export const fixedDigits = (digit?: number, length: number = 1) => {
    return (digit?.toString() ?? "").padStart(length, "0");
};
