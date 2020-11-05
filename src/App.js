import Note from "./components/Note"
import TagChip from "./components/TagChip"
import logo  from "./assets/images/logo.png"
import data from "./data.json"
import NoteEditor from "./components/NoteEditor"

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
      <div className="app-logo">
        <img src={logo}/>
      </div>
      <button className="btn new-note-btn">+ New note</button>
      </header>
      
      <section className="notes-section">
        <div className="taglist-container">
        <ul className="taglist">
          {data["tags"].map(tag => 
            <li>
              <TagChip name={tag}/>
            </li>
          )}

        </ul>
        
      </div>
        <div className="notes-list">
          {data["notes"].map(note => <Note title={note["title"]} body={note["body"]}/>)}
        </div>
      </section>
      <NoteEditor/>

    </div>
  );
}

export default App;
