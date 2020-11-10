import React from 'react'

const TagChip = ({name, onClick}) => {
    return(

        <li className="tag-chip" onClick={onClick}>
            <span className="chip-text">{name}</span>
        </li>
    )
}

export default TagChip