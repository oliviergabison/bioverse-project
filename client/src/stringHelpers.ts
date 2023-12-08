export const formatDate = (timestampString) => {
    const timestampDate = new Date(timestampString);

    const datePart = timestampDate.toISOString().split('T')[0];
    return datePart;
}