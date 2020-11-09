import React from 'react'

const Note = ({title, body, tags, onClick}) => {
    return(
        <div className="note-container" onClick={onClick}>
              <h4 className="note-title">{title || "Title"}</h4>
              <p className="note-body">
                  {body}
              </p>
              <ul className="note-taglist">
                    {tags?.map(t => <li>{t}</li>)}
              </ul>
        </div>
    )
}

export default Note