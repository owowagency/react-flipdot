/**
 * You can proxy this to clearTimeout or its equivalent in your environment.
 */
export function cancelTimeout(id?: number) {
    return clearTimeout(id);
}