import React from 'react'
import { HighlightWithinTextarea } from 'react-highlight-within-textarea'


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
                        maxLength="250" 
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

    
                    <ul className="note-taglist">
                            {note?.tags?.map(t => <li key={t} className="tag">{t}</li>)}
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