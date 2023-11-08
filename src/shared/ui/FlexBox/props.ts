export const JUSTIFYCONTENT = {
    CENTER:"center",
    FLEX_START:"flex-start",
    FLEX_END:"flex-end",
    SPACE_BETWEEN:"space-between",
    SPACE_AROUND:"space-around"
} as const;

export type JUSTIFYCONTENT = typeof JUSTIFYCONTENT [keyof typeof JUSTIFYCONTENT]

export const GAP = {
    small:"2px",
    medium:"5px",
    large:"10px",
    extralarge:"15px",
    xxlarge:"20px",
    xxxlarge:"25px",
    xxxxxarge:"30px",

} as const;

export type GAP = typeof GAP [keyof typeof GAP]
