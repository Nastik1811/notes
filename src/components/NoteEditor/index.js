import React from 'react'
import { HighlightWithinTextarea } from 'react-highlight-within-textarea'
import TagChip from '../TagChip'


const NoteEditor = ({onSave, onCancel, onDelete, open, note, onEdit}) => {

    if(!open){
        return null
    }

    return(
        <div className="overlay">
            <div className="modal">
                <button className="close-btn" onClick={onCancel}></button>
                <div className="edit-form">
                    <input 
                        className="note-title-input" 
                        placeholder="Title"  
                        maxLength="50" 
                        value={note?.title} 
                        onChange={e => onEdit(note => ({...note, title: e.target.value}))}
                        />

                    <HighlightWithinTextarea
                        className="body-textarea" 
                        containerClassName="body-container" 
                        
                        placeholder="Start typing here..." 
                        value={note?.body} 
                        onChange={e => {
                            onEdit(note => ({...note, body: e.target.value}))
                                }
                            }
                        highlight={note.tags|| ""}
                    />

    
                    <ul className="editor-taglist">
                            {note?.tags?.map(t => <TagChip 
                                    key={t}
                                    tagClassName="note-tag" 
                                    name={t}
                                    onDelete={() => onEdit(note => ({...note, tags: note.tags.filter(tag => tag !== t)}))}
                                    />)}
                    </ul>
                </div>
                <div className="modal-actions">
                    <button className="modal-action-btn" onClick={onSave}>Save</button>
                    <button className="modal-action-btn" onClick={onDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default NoteEditor