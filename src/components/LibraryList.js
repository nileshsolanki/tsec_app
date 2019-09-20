import React, { Component } from 'react'
import LibraryRecord from './LibraryRecord';
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { addBook } from '../store/actions/libraryActions'
import { Button, Modal, TextInput, DatePicker } from 'react-materialize'
import M from 'materialize-css'


class LibraryList extends Component {
    state = {
        name: '',
        date: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {

        // console.log(this.state)
        const { name, date } = this.state
        const bookData = {
            bookName: name,
            issueDate: new Date(date).getTime().toString(),
            bookId: new Date(date).getTime().toString().substring(6)
        }

        // console.log(bookData)
        name && date ? this.props.addBook(bookData) : M.toast({ html: '"Book Name" or "Issue Date" Cannot be empty' })
    }


    render() {
        // console.log(this.props)
        const { books } = this.props
        const fab = <Button floating waves="light" icon="add" className="red right" />

        return (
            <div className="container">
                <Modal header="Add Book" container="body" actions={<Button flat modal="close" onClick={this.handleSubmit}>add</Button>} trigger={fab}>
                    <div className="section">
                        <br /><br />
                        <TextInput className="section" id="name" label="Book name" onChange={this.handleChange} />
                        <br /><br />
                        <DatePicker className="section" id="date" label="Click to enter date" onChange={date => this.handleChange({ target: { id: 'date', value: date } })} />
                    </div>

                </Modal>
                <h6 className="section">Library</h6>
                <ul>
                    {books && books.map(book => <li key={book.key} ><LibraryRecord data={book.value} /></li>)}
                </ul>



            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    const { auth } = state.firebase
    const { library } = state.firebase.ordered
    return ({
        books: library ? library[auth.uid] : [],
        auth: state.firebase.auth
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        addBook: bookData => dispatch(addBook(bookData))
    })
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect((ownprops) => {
        const { auth } = ownprops
        return ([
            { path: `library/${auth.uid}/` }
        ])
    })
)(LibraryList)
