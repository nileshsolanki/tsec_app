import React from 'react'


const PageNotFound = () => {

    const divStyle = {
        paddingTop: '25%',
        paddingLeft: '50%',
        width: '100%',
        height: '88%',
        background: `url("${process.env.PUBLIC_URL}/page_notfound.png") no-repeat`,
        backgroundSize: '70% auto',
        backgroundPosition: 'center'
    }

    return (
        <div style={divStyle}>
            <h3 className="grey-text">404</h3>
            <p className="flow-text grey-text text-lighten-1">Uh Oh! We don't serve that</p>
        </div>
    )
}

export default PageNotFound