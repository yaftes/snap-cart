
export function validateInputString(input : string | undefined | null,name : string) {
    if(!input || input.trim().length === 0){
        throw new Error(`${name} is required`)
    }
}