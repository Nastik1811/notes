import Note from "./components/Note"
import TagChip from "./components/TagChip"
import logo  from "./assets/images/logo.png"
import data from "./data.json"
import NoteEditor from "./components/NoteEditor"
import { useEffect, useState } from "react"
import uuid from 'uuid-random'
import { filterByTags } from "./utils"


const editorDefaults = {
  open: false,
  note: undefined,
  onSave: null,
  onCancel: null,
}

const App = () => {
  const [notes, setNotes] = useState(data["notes"])
  const [tags, setTags] = useState(data["tags"])
  const [editingNote, setEditingNote] = useState(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState(null)

  useEffect(() => {

  }, [notes])


  const addNote = () => {
    let note = {id: "3", title: "New Note", body: "This is my note. He he he."}
    setNotes(notes => [note, ...notes])
  }

  const onEdit = (id) => {
    let noteIndex = notes.findIndex(note => note.id === id)
    setEditingNote(notes[noteIndex])
    setIsEditorOpen(true)
  }

  const onDelete = (id) => {
    let newSet = notes.filter(note => note.id !== id)
    setNotes(newSet)
  }

  const onCancel = () => {
    setIsEditorOpen(false)
    setEditingNote(null)
  }

  const tagsLookUp = text => {
    let tags = text.match(/#[a-zA-Zа-яА-Я0-9]+/g)
    return tags?.filter((item, index) => tags.indexOf(item) == index).map(tag => tag.slice(1))
  }

  const onDeleteTag = (tag) => {
    let newTaglist = tags.filter(t => t!== tag)
    setTags(newTaglist)
  }
  const updateTaglist = (tagsFromNote) => {
    let newTags = tagsFromNote?.filter(item => !tags.includes(item))
    console.log(newTags)
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
          <img src={logo}/>
        </div>
        <button className="btn new-note-btn" onClick={createNote}>+ New note</button>
      </header>
      <section className="notes-section">
        <div className="taglist-container">
          <ul className="taglist">
            <li>
              <input className="chip-btn tag-chip" type="button" value="Show all" onClick={() => {setSelectedTag(null)}}/>
            </li>
            {tags?.map(tag =>  
                <TagChip key={tag} name={tag} onClick={() => setSelectedTag(tag)}/>
          
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
        onEdit={setEditingNote}
        />

    </div>
  );
}

export default App;
