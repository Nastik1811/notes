import React from 'react'

const TagChip = ({name}) => {
    return(
        <div className="tag-chip">
            <span className="chip-text">{name}</span>
        </div>
    )
}

export default TagChip