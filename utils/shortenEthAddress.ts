export const shortenEthAddress = (address: `0x${string}` | undefined | string): string | undefined => {
    if (address) {
        const start = address.substring(0, 7);
        const end = address.substring(address.length - 4);
        return `${start}...${end}`;
    } else {
        return undefined;
    }
}