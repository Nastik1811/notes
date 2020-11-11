const writeJsonFile = require('write-json-file');
const uuid = require('uuid-random');
 

export const saveData =  (tags, notes) => {
    return writeJsonFile('db.json', {notes, tags});
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

export const getNoteTemplate = () => ({
    id: uuid(), 
    title: "",
    body: "",
    tags: []
  })

export const extractTagsFromText = text => {
    let tags = text.match(/#[a-zA-Zа-яА-Я0-9_]+/g)
    return tags?.map(tag => tag.slice(1).toLowerCase())
  }

export const removeDuplicate = list => {
    let uniqueValues = list?.filter((item, index) => list.indexOf(item) === index)
    return uniqueValues
}