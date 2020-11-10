import React from 'react'
import { truncateText } from '../../utils'
import TagChip from '../TagChip'

const Note = ({note, onEdit}) => {
    const MAX_LENGTH = 340
    return(
        <div className="note-container" onClick={onEdit}>
              <h4 className="note-title">{note["title"]}</h4>
              <p className="note-body">
                  {truncateText(note["body"], MAX_LENGTH)}
              </p>
        </div>
    )
}

export default Note