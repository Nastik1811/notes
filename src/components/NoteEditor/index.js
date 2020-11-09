import React, { useEffect, useState } from 'react'
import TagChip from '../TagChip'



const NoteEditor = ({onSave, onCancel, open, note, onEdit}) => {

    if(!open){
        return null
    }

    return(
        <div className="overlay">
            <div className="modal">
                <div className="edit-form">
                    <input 
                        className="note-title-input" 
                        placeholder="Title"  
                        maxLength="250" 
                        value={note?.title} 
                        onChange={e => onEdit(note => ({...note, title: e.target.value}))}
                        />
            
                    <textarea 
                        className="note-body-area" 
                        placeholder="Start typing here..." 
                        value={note?.body} 
                        onChange={e => onEdit(note => ({...note, body: e.target.value}))}
                    />

                    <ul className="note-taglist">
                            {note?.tags?.map(t => <li><TagChip name={t}/></li>)}
                    </ul>
                </div>
                <div className="modal-actions">
                    <button className="modal-action-btn" onClick={onSave}>Save</button>
                    <button className="modal-action-btn" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default NoteEditor