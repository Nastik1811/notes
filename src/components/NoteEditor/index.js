import React from 'react'

const NoteEditor = ({note, tags}) => {
    return(
        <div className="overlay">
            <div className="modal">
                <div className="edit-form">
                    <input className="note-title-input" placeholder="Title"  maxLength="250"/>
            
                    <textarea className="note-body-area" placeholder="Start typing here..." />
                    <ul className="note-taglist">
                            {tags?.map(t => <li>{t}</li>)}
                    </ul>
                </div>
                <div className="modal-actions">
                    <button className="modal-action-btn">Close</button>
                </div>
            </div>
        </div>
    )
}

export default NoteEditor