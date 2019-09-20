import React, { Component } from 'react'
import { CardPanel, Button } from 'react-materialize'
import { connect } from 'react-redux'
import { removeBook, getCleanedName } from '../store/actions/libraryActions'
import M from 'materialize-css'

class LibraryRecord extends Component {

    handleRemove = () => {
        const { data, removeBook } = this.props
        removeBook(data.issueDate + getCleanedName(data.bookName))
    }

    render() {
        // console.log(data)
        const { data } = this.props
        const returnDate = Number(data.issueDate) + 15 * 24 * 60 * 60 * 1000


        return (
            <CardPanel>
                <p>{data.bookName}</p>
                <hr />
                <div className="grey lighten-3">
                    <p>Issue Date <br /><span className="indigo-text">{new Date(Number(data.issueDate)).toDateString()}</span></p>
                </div>

                <div className="grey lighten-3">
                    <p>Return Date <br /> <span className="red-text">{new Date(returnDate).toDateString()}</span></p>
                </div>
                <Button waves="light" onClick={this.handleRemove}>Return</Button>
            </CardPanel>
        )
    }
}

const mapStateToProps = (state) => {

    if (state.library.bookAddErr)
        M.toast({ html: 'Error Adding Book' })

    if (state.library.bookRemErr)
        M.toast({ html: 'Error Removing Book' })

    return ({
        bookAddErr: state.library.bookAddErr,
        bookRemErr: state.library.bookRemErr
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        removeBook: (refId) => dispatch(removeBook(refId))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryRecord)
