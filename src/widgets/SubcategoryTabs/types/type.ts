export const SubcategoryTabsList = {
    generalInfoTab:0,
    eventTab:1,
    parametersTab:2,
    archivesTab:3,
    graphicTab:4,
    schemaTab:5,
} as const;
export type SubcategoryTabsList = typeof SubcategoryTabsList [keyof typeof SubcategoryTabsList]