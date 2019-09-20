import React, { Component } from 'react'
import { CollapsibleItem, Badge, Button, Modal } from 'react-materialize'
import { downloadFile, downloadFromLink } from '../store/actions/storageActions'
import { EditorState, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { connect } from 'react-redux'

class Notification extends Component {

    constructor(props) {
        super(props)

        let editorState
        if (props.data.msgType === 'rich') {
            const rawContent = JSON.parse(props.data.msg)
            editorState = EditorState.createWithContent(convertFromRaw(rawContent))
        }
        else
            editorState = EditorState.createEmpty()

        this.state = {
            activeKey: '',
            editorState
        }
    }



    handleDownloadAttachment = () => {
        console.log("starting download...")
        const { teacherId, data } = this.props

        if (this.props.type !== 'public') {
            this.props.downloadFile({ teacherId, fileName: data.msg })
        } else {
            data.attachmentsUrls.map(url => {
                // return saveAs(url)
                return this.props.downloadFromLink(url)
            })
        }
    }


    handleSelect = (key) => {
        const { onSelect } = this.props;
        if (onSelect) { onSelect(key); }
        if (this.state.activeKey === key) { key = null; }
        if (this.props.accordion) {
            this.setState({ activeKey: key });
        }
    }



    render() {

        console.log(this.props)

        const { data, type } = this.props
        const title = type === 'public' ? data.title : (data.msgType === 'rich' ? "[RICH TEXT DATA]" : data.msg)
        const content = type === 'public' ? data.message : ""
        const date = type === 'public' ? data.dateAndTimeStamp : new Date(data.sendTimestamp).toDateString()
        const msgType = type === 'public' ? undefined : data.msgType
        const icon = (data.attachmentsUrls || msgType === 'media') ? "attachment" : (data.msgType === 'rich' ? 'description' : "format_quote")

        const downloadBtn = <Button waves="light" onClick={this.handleDownloadAttachment} >Download Attachments</Button>
        const triggerModal = <Button waves="light">open document</Button>

        const openRichText =
            <Modal
                id="richTextModal"
                fixedFooter
                bottomSheet
                header="Rich Text"
                trigger={triggerModal}>
                <Editor
                    toolbarHidden
                    readOnly
                    editorState={this.state.editorState}
                    onEditorStateChange={(editorState) => { this.setState({ editorState }) }}
                />
            </Modal>



        return (

            <CollapsibleItem onSelect={this.handleSelect} header={<div> <p>{title}</p> <Badge className="red left lighten-1 white-text">{date}</Badge> </div>} icon={icon}>

                <div>
                    <br />
                    <p>{content}</p>
                    {(data.attachmentsUrls || msgType === 'media') && downloadBtn}
                    {msgType === 'rich' && openRichText}
                </div>

            </CollapsibleItem>

        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return ({
        downloadFile: (data) => dispatch(downloadFile(data)),
        downloadFromLink: (url) => dispatch(downloadFromLink(url))
    })
}

export default connect(null, mapDispatchToProps)(Notification)