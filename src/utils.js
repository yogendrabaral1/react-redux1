export const sortList = (arr) => {
    return arr.sort((a,b) => b.isFavorite - a.isFavorite);
}