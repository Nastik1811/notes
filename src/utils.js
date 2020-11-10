const saveData = (date, db) => {

}

export const filterByTags = (notes, tag) => {
    if(tag){
        return notes.filter(n => n.tags?.includes(tag))
    }
    return notes
} 

export const truncateText = (text, length) => {
    return text.length < length ? text : text.slice(0, length - 1).concat(" ...")
}