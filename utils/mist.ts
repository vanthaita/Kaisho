const mistToSui = (mist: string | number): number => {
    const mistNumber = typeof mist === 'string' ? parseFloat(mist) : mist;
    if (isNaN(mistNumber)) {
        throw new Error('Invalid input: mist must be a valid number or numeric string.');
    }
    const sui = mistNumber / 1_000_000_000;
    return parseFloat(sui.toFixed(9));
};

export default mistToSui;