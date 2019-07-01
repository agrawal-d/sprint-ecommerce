import React from 'react';
import './App.css';


var notes = [
  {
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  }
];

class TextBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit(e) {

    if (e.keyCode === 13) {
      if (e.target.value === "") {
        alert("Please enter some text");
        return;
      }
      this.props.onCreateNote(e.target.value);
      this.setState({
        value: ""
      })
    }
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    })


  }

  render() {
    return (
      <input className="note-input" placeholder="Type a new note here" autoFocus={true} onChange={this.handleInputChange} onKeyUp={this.handleSubmit} value={this.state.value}></input>
    )
  }
}

class Note extends React.Component {

  constructor(props) {
    super(props);
    this.deleteNote = this.deleteNote.bind(this)
  }

  deleteNote() {
    console.log(this.props.index);
    this.props.deleteNote(this.props.index)
  }

  render() {
    return (
      <li className="note">
        <button className="delete-button" onClick={this.deleteNote} title="Delete Note">×</button>
        {this.props.note}
      </li>
    )
  }
}

class NotesApp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: this.props.notes
    }
    this.createNote = this.createNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);

  }

  createNote(note) {
    var notes = this.state.notes;
    notes.unshift({
      text: note
    })
    this.setState({
      notes: notes
    })
  }

  deleteNote(index) {
    var notes = this.state.notes;
    notes.splice(index, 1);
    this.setState({
      notes: notes
    })
  }


  render() {
    var list = [];
    for (var index in this.state.notes) {
      list.push(
        <Note note={this.state.notes[index].text} key={index} index={index} deleteNote={this.deleteNote}></Note>
      )
    }
    return (
      <div className="app">
        <TextBox value={""} onCreateNote={this.createNote}></TextBox>
        <ul className="notes-container">
          {list}
        </ul>
      </div>

    )
  }
}

function App() {
  return (
    <NotesApp notes={notes}></NotesApp>
  );
}

export default App;
