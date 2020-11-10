import Note from "./components/Note"
import TagChip from "./components/TagChip"
import logo  from "./assets/images/logo.png"
import data from "./data.json"
import NoteEditor from "./components/NoteEditor"
import { useEffect, useState } from "react"
import uuid from 'uuid-random'
import { filterByTags, saveData } from "./utils"


const App = () => {
  const [notes, setNotes] = useState(data["notes"])
  const [tags, setTags] = useState(data["tags"])
  const [editingNote, setEditingNote] = useState(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState(null)

  const onEdit = (id) => {
    let noteIndex = notes.findIndex(note => note.id === id)
    setEditingNote(notes[noteIndex])
    setIsEditorOpen(true)
  }

  const onDelete = () => {
    let newSet = notes.filter(note => note.id !== editingNote.id)
    setIsEditorOpen(false)
    setEditingNote(null)
    setNotes(newSet)
  }

  const onCancel = () => {
    setIsEditorOpen(false)
    setEditingNote(null)
  }

  const tagsLookUp = text => {
    let tags = text.match(/#[a-zA-Zа-яА-Я0-9]+/g)
    return tags?.filter((item, index) => tags.indexOf(item.toLowerCase()) === index).map(tag => tag.slice(1).toLowerCase())
  }

  const onDeleteTag = (tag) => {
    let newTaglist = tags.filter(t => t!== tag)
    setTags(newTaglist)
    setNotes(notes.map(note => ({...note, tags: note.tags.filter(t => t!== tag)})))
  }

  const updateTaglist = (tagsFromNote) => {
    let newTags = tagsFromNote?.filter(item => !tags.includes(item))
    if(newTags){
      setTags(tags => [...tags, ...newTags])
    }
  }

  const onSave = () => {
    let index = notes.findIndex(note => note.id === editingNote.id)
    let newSet = [...notes]
    let tags = tagsLookUp(editingNote.body)
    updateTaglist(tags)

    if(index !== -1){
      newSet[index] = {...editingNote, tags}
    }else{
      newSet.push({...editingNote, tags})
    }
    setNotes(newSet)
    setIsEditorOpen(false)
  }

  const createNote = () => {
    let id = uuid()
    console.log(id)
    setEditingNote({
      id, 
      title: "",
      body: "",
      tags: null
    })
    setIsEditorOpen(true)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-logo">
          <img src={logo} alt="logo"/>
        </div>
        <button className="btn new-note-btn" onClick={createNote}>+ New note</button>
      </header>
      <section className="notes-section">
        <div className="taglist-container">
          <ul className="taglist">
            <input className="chip-btn tag-chip" type="button" value="Show all" onClick={() => {setSelectedTag(null)}}/>
            {tags?.map(tag =>  
                <TagChip 
                    key={tag} 
                    name={tag} 
                    onClick={() => setSelectedTag(tag)} 
                    onDelete={() => onDeleteTag(tag)}
                    selected={tag === selectedTag}
                    />
            )}
            </ul>
        </div>
        <div className="notes-list">
          {
            filterByTags(notes, selectedTag)?.map(
              note => <Note 
                        key={note.id} 
                        note={note} 
                        onEdit={() => onEdit(note.id)}
                        />)
          }
        </div>
      </section>

      <NoteEditor 
        open={isEditorOpen} 
        note={editingNote} 
        onCancel={onCancel} 
        onSave={onSave} 
        onDelete={onDelete}
        onEdit={setEditingNote}
        />

    </div>
  );
}

export default App;
