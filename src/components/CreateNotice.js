import React, { Component } from 'react'
import { Select, Button, CardPanel, Modal, Tab, Tabs, Textarea, Preloader } from 'react-materialize'
import { connect } from 'react-redux'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { createTextNotice, createMediaNotice, clearNoticeData, createRichNotice } from '../store/actions/noticeActions'
import { createGroup } from '../store/actions/groupActions'
import { getYears, getBranches, getDivs } from '../strings'
import M from 'materialize-css'


class CreateNotice extends Component {

    state = {
        editorState: EditorState.createEmpty(),
        activeTab: 'tab_50',
        selectedClass: 0,
        plainText: '',
        files: [],
        isSubmitClickable: true,
        addGroup: {
            year: 'Select',
            branch: 'Select',
            div: 'Select'
        }
    }

    //========================================//
    //*******constructor******* */
    //========================================//

    constructor(props) {
        super(props)
        this.dropzone = React.createRef()
    }


    //=======================================//
    //******handlers****** */
    //======================================//


    onEditorStateChange = (editorState) => {
        this.setState({ editorState });
    }

    handleTabChange = (index) => {
        console.log("index", index)
        this.setState({ activeTab: index % 10 })
    }

    handlePlainTextChange = (e) => {
        this.setState({
            plainText: e.target.value
        })

    }

    handleGroupCreation = () => {
        const { addGroup } = this.state
        const { uid, classgroups } = this.props


        //exit if group already exists
        if (classgroups) {

            for (let i = 0; i < classgroups.length; i++) {
                const group = classgroups[i].value
                if (addGroup.year === 'FE' && addGroup.year === group.year && addGroup.div === group.div)
                    return M.toast({ html: 'Group already Exists!' })
                else if ((addGroup.branch === 'Computer' || addGroup.branch === 'IT') && (group.branch === addGroup.branch) && (group.year === addGroup.year) && (group.div === addGroup.div))
                    return M.toast({ html: 'Group already Exists!' })
                else if ((addGroup.branch !== 'Computer' && addGroup.branch !== 'IT') && (group.year === addGroup.year) && (group.branch === addGroup.branch))
                    return M.toast({ html: 'Group already Exists!' })
            }
        }


        if (addGroup.year === 'Select') {
            return M.toast({ html: 'Please select &nbsp; <b>YEAR</b>' })
        } else if (addGroup.year === 'FE') {
            if (addGroup.div === 'Select') {
                return M.toast({ html: 'Please select  &nbsp; <b>DIVISION</b>' })
            }
        } else {
            if (addGroup.branch === 'Select') {
                return M.toast({ html: 'Please select  &nbsp; <b>BRANCH</b>' })
            }
            else if (['IT', 'Computer'].includes(addGroup.branch)) {
                if (addGroup.div === 'Select') {
                    return M.toast({ html: 'Please select  &nbsp; <b>DIVISION</b>' })
                }
            }
        }

        this.props.createGroup({ group: addGroup, uid })
            .then(res => {
                M.toast({ html: 'Group Created' })
            })
    }

    onSelectChange = (event) => {
        const index = event.nativeEvent.target.selectedIndex
        this.setState({
            selectedClass: index
        })
    }


    handleGroupSelectChange = (property, event) => {
        const value = event.nativeEvent.target.value

        let addGroup = { ...this.state.addGroup }
        switch (property) {
            case 'year':
                addGroup.year = value
                addGroup.branch = 'Select'
                addGroup.div = 'Select'
                break

            case 'branch':
                addGroup.branch = value
                addGroup.div = 'Select'
                break

            case 'div':
                addGroup.div = value
                break

            default:
                break

        }


        this.setState({ addGroup })
    }


    handleOnSaveClicked = () => {
        M.toast({ html: 'Saved. press "PUSH NOTICE" to send' })
    }

    //image upload callback for react draft js
    //this function is triggered whenever an image is added
    //It uploads the image to imgur and keeps the url in the editorState
    uploadImageCallBack = (file) => {
        console.log(file)
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.imgur.com/3/image');
                xhr.setRequestHeader('Authorization', 'Client-ID e4833e92ed0f378');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }

    // specify upload params and url for your files
    getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    // called every time a file's `status` changes
    handleChangeStatus = ({ meta, file }, status) => {
        if (status === 'done') {
            const files = this.state.files
            files.push(file)
            this.setState({ files })
        }

        if (status === 'removed') {
            const fileList = this.state.files
            const files = fileList.filter(f => {
                if (f.name !== file.name) return true
                return false
            })

            this.setState({ files })
        }

        return true

    }

    // receives array of files that are done uploading when submit button is clicked
    handleSubmit = (files, allFiles) => {
        console.log('allfiles', allFiles)
        files.map(f => console.log(f))
        allFiles.forEach(f => f.remove())
    }

    showRelevantToasts = () => {

        const { noticePushError, noticePushData } = this.props

        if (noticePushError) M.toast({ html: `Error Pusing ${noticePushData}` })
        else if (!noticePushError && noticePushData) M.toast({ html: `Succesfully Pushed ${noticePushData}` })
    }

    handleNoticePush = () => {
        let { classgroups, uid, profile } = this.props
        const { activeTab } = this.state

        //check which tab is active and start processing
        switch (activeTab) {
            case 0:
                //rich text

                //disable push button before processing
                this.setState({ isSubmitClickable: false })

                const editorState = this.state.editorState
                const rawDataInJson = convertToRaw(editorState.getCurrentContent())
                const rawDataInString = JSON.stringify(rawDataInJson)
                console.log(rawDataInString)
                this.props.createRichNotice({
                    group: classgroups[this.state.selectedClass].value,
                    uid: uid,
                    jsonString: rawDataInString,
                    profile: profile,
                    msgType: 'rich'
                }).then(() => {
                    // this.props.clearNoticeData()
                    this.showRelevantToasts()
                    this.setState({ isSubmitClickable: true, plainText: '' })
                })


                return

            case 1:
                //plain text
                const { plainText } = this.state
                this.props.createTextNotice({
                    group: classgroups[this.state.selectedClass].value,
                    uid: uid,
                    text: plainText,
                    profile: profile,
                    msgType: 'Text'
                }).then(() => {
                    // this.props.clearNoticeData()
                    this.showRelevantToasts()
                    this.setState({ isSubmitClickable: true, plainText: '' })
                })

                return

            case 2:
                //media
                const files = this.state.files
                const filesTobeRemoved = this.dropzone.current.files.map(f => f)
                if (files.length !== filesTobeRemoved.length)
                    return M.toast({ html: 'No files loaded. Please try in a moment' })


                //disable push button before processing
                this.setState({ isSubmitClickable: false })

                files.forEach(file => {
                    //create notice for each file
                    return this.props.createMediaNotice({
                        group: classgroups[this.state.selectedClass].value,
                        uid: uid,
                        file: file,
                        profile: profile,
                        msgType: 'media'
                    }).then(() => {
                        console.log('calling after promise returened')
                        this.showRelevantToasts()

                        const newFiles = this.state.files.filter(f => {
                            if (f.name !== file.name) return true
                            return false
                        })

                        const isSubmitClickable = newFiles.length === 0 ? true : false
                        this.setState({ files: newFiles, isSubmitClickable })
                    })
                })

                //remove all file from the file drop zone
                filesTobeRemoved.forEach(f => f.remove())


                return

            default:
                return
        }

    }


    //=================================================//
    //*******handlers*****///
    //==================================================//

    render() {
        //state comprehending
        const { classgroups } = this.props
        const { addGroup } = this.state

        const toolbarOptions = {
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { uploadCallback: this.uploadImageCallBack },
        }


        //***********components extracted for rendering ***************//

        //THE FOLLOWINF COMPONENTS WERE EXTRACTED TO KEEP NESTED MARKUP MINIMUM
        //SO AS TO INCREASE READABILITY

        //fab button for creating a new group
        //it is a trigger to the modal
        //see triggerRichTextModal below
        const fab = <Button floating waves="light" icon="add" className="red right" />

        //This is a trigger for modal: richText
        //it is just a button to trigger the modal
        const triggerRichTextModal =
            <div style={{ width: '100%', margin: '20% auto', textAlign: 'center' }} className="container">
                <Button className="hide-on-small-only">EDIT NOW</Button>
                <p className="hide-on-med-and-up">Not available for mobile devices</p>
            </div>

        //these are the actions displayed on the modal
        const editorModalActions =
            <div>
                <Button flat onClick={this.handleOnSaveClicked}>Save</Button>
                <Button flat modal="close">Close</Button>
            </div>

        const addGroupModalActions =
            <div>
                <Button className="indigo" modal="close" onClick={this.handleGroupCreation}>add</Button>
                <Button flat modal="close">close</Button>
            </div>

        //This defines the content inside the modal that is triggered by above fab button
        const addClassModalContent =
            <div className="section">
                <Select label="Select Year" onChange={(event) => this.handleGroupSelectChange('year', event)}>
                    {getYears().map(year => <option key={year} value={year} >{year}</option>)}
                </Select>

                {addGroup.year !== 'FE' &&
                    <Select label="Select Branch" onChange={(event) => this.handleGroupSelectChange('branch', event)}>
                        {getBranches().map(branch => <option key={branch} value={branch}>{branch}</option>)}
                    </Select>}

                {getDivs(addGroup.year, addGroup.branch) &&
                    <Select label="Select Division" onChange={(event) => this.handleGroupSelectChange('div', event)}>
                        {getDivs(addGroup.year, addGroup.branch).map(div => <option key={div} value={div} >{div}</option>)}
                    </Select>}
            </div>

        //
        const tabRichText =
            <Tab active={this.state.activeTab === 'tab_30'} title="Rich" className="grey lighten-4">
                <Modal
                    id="richTextModal"
                    fixedFooter
                    bottomSheet
                    header="Rich Text"
                    actions={editorModalActions}
                    trigger={triggerRichTextModal}>
                    <Editor
                        toolbar={toolbarOptions}
                        placeholder="Click here to start writing..."
                        onEditorStateChange={this.onEditorStateChange}
                        initialEditorState={this.state.editorState} />
                </Modal>
            </Tab>


        const tabPlainText =
            <Tab active={this.state.activeTab === 'tab_31'} title="Text" className="grey lighten-4" >
                <div className="section">
                    {<Textarea label="Start writing here..." s={12} m={12} l={12} xl={12} onChange={this.handlePlainTextChange} />}
                </div>
            </Tab>

        const tabMedia =
            <Tab active={this.state.activeTab === 'tab_32'} title="Media" className="grey lighten-4" >
                <Dropzone
                    ref={this.dropzone}
                    getUploadParams={this.getUploadParams}
                    onChangeStatus={this.handleChangeStatus}
                    onSubmit={this.handleSubmit}
                    accept="image/*,audio/*,video/*, text/*, application/*" />
            </Tab>

        //******************components extracted end****************************/

        return (
            <div className="container section">

                {/* Modal displays its target which is a floating add btn on the top */}
                <Modal
                    id="addGroupModal"
                    bottomSheet
                    fixedFooter
                    header="Create New Group"
                    container="body"
                    actions={addGroupModalActions}
                    trigger={fab}>
                    {addClassModalContent}
                </Modal>

                {/* Title for the page */}
                <h5>Create Notice</h5>

                {/* this card contains tabs */}
                <CardPanel>
                    <Select label="Select class" onChange={this.onSelectChange}>
                        {classgroups && classgroups.map(group => {
                            return (
                                <option
                                    id={group.key}
                                    key={group.key}
                                    value={group.value.groupName}>
                                    {group.value.groupName}
                                </option>)
                        })}
                    </Select>
                </CardPanel>

                {/* This card contains pages corresponding to tabs */}
                <CardPanel>
                    <p>Select Notice Type</p>
                    <Tabs className="tab-demo z-depth-1" onChange={this.handleTabChange} >
                        {tabRichText}
                        {tabPlainText}
                        {tabMedia}
                    </Tabs>
                </CardPanel>

                {/* Either button or a progress loader is displayed  */}
                {this.state.files.length === 0 || this.state.isSubmitClickable ?
                    (<Button onClick={this.handleNoticePush}>PUSH NOTICE</Button>) :
                    (<Preloader active flashing size='small' />)
                }

            </div >
        )

    }
}


const mapStateToProps = (state) => {
    const { classgroups } = state.firebase.profile
    return ({
        classgroups: classgroups ? Object.keys(classgroups).map(key => { return { key: key, value: classgroups[key] } }) : classgroups,
        uid: state.firebase.auth.uid,
        noticePushError: state.notice.noticePushError,
        noticePushData: state.notice.noticePushData,
        groupCreateError: state.group.groupCreateError,
        profile: state.firebase.profile
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        createTextNotice: (data) => dispatch(createTextNotice(data)),
        createMediaNotice: (data) => dispatch(createMediaNotice(data)),
        createRichNotice: (data) => dispatch(createRichNotice(data)),
        createGroup: (data) => dispatch(createGroup(data)),
        clearNoticeData: () => dispatch(clearNoticeData())
    })

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNotice)