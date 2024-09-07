export const testIdToCypressFormat = (testid:string='TestId')=>{
    return `[data-testid="${testid}"]`
}