import React from 'react'
import { truncateText } from '../../utils'

const Note = ({note, onEdit}) => {
    const MAX_LENGTH = 300
    return(
        <div className="note-container" onClick={onEdit}>
              <h4 className="note-title">{note["title"]}</h4>
              <p className="note-body">
                  {truncateText(note["body"], MAX_LENGTH)}
              </p>
              <ul className="note-tags">
                    {note?.tags?.slice(0, 6).map(t => <li key={t} className="tag">{t}</li>)}
             </ul>
        </div>
    )
}

export default Note