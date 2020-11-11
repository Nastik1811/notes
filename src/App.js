import Note from "./components/Note"
import TagChip from "./components/TagChip"
import logo  from "./assets/images/logo.png"
import data from "./data.json"
import NoteEditor from "./components/NoteEditor"
import { useState } from "react"
import { extractTagsFromText, filterByTags, getNoteTemplate, removeDuplicate } from "./utils"


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

  const onDeleteTag = (tag) => {
    let newTaglist = tags.filter(t => t!== tag)
    setTags(newTaglist)
    setNotes(notes.map(note => ({...note, tags: note.tags.filter(t => t!== tag)})))
  }

  const updateTaglist = (newTags) => {
    if(newTags){
      setTags(tags => removeDuplicate([...tags, ...newTags]))
    }
  }

  const onSave = () => {
    let index = notes.findIndex(note => note.id === editingNote.id)
    let newSet = [...notes]
    let newTags = extractTagsFromText(editingNote.body) || []
    let taglist = removeDuplicate([...editingNote.tags, ...newTags])

    if(index !== -1){
      newSet[index] = {...editingNote, tags: taglist}
    }else{
      newSet.push({...editingNote, tags: taglist})
    }
    
    updateTaglist(newTags)
    setNotes(newSet)
    setIsEditorOpen(false)
  }

  const createNote = () => {
    setEditingNote(getNoteTemplate())
    setIsEditorOpen(true)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-logo">
          <img src={logo} alt="logo"/>
        </div>
        <button className="new-note-btn" onClick={createNote}>+ New note</button>
      </header>
      <section className="notes-section">
          <ul className="taglist">
            <input className="chip-btn" type="button" value="Show all" onClick={() => {setSelectedTag(null)}}/>
            {tags?.map(tag =>  
                <TagChip 
                    key={tag} 
                    name={tag} 
                    onClick={() => setSelectedTag(tag)} 
                    onDelete={() => onDeleteTag(tag)}
                    tagClassName={tag === selectedTag ? "filter-tag selected" : "filter-tag" }
                    />
            )}
            </ul>
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
