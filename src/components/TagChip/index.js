import React from 'react'

const TagChip = ({name, onClick, onDelete, tagClassName}) => {

    return(
        <li className={ "tag-chip " + tagClassName }>
            <span className="chip-text" onClick={onClick}>{name}</span>
            <button className="delete-btn" onClick={onDelete}></button>
        </li>
    )
}

export default TagChip