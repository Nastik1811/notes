import React, { useEffect, useState } from 'react'
import TagChip from '../TagChip'
import { HighlightWithinTextarea } from 'react-highlight-within-textarea'


const NoteEditor = ({onSave, onCancel, open, note, onEdit}) => {

    if(!open){
        return null
    }

    const lookForTags = text => {
        
    }
    const onEditBody = (e) => {


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
            

                    <HighlightWithinTextarea
                        className="body-textarea" 
                        containerClassName="body-container" 
                        
                        placeholder="Start typing here..." 
                        value={note?.body} 
                        onChange={e => {
                            onEdit(note => ({...note, body: e.target.value}))
                            let event = e
                            console.log(e.nativeEvent.data)
                                }
                            }
                        highlight={/word/g}
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