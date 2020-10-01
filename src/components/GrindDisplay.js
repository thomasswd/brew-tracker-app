import React from 'react' 

const GrindDisplay = (props) => {

    console.log(props.grindSetting)

    return (
        <p>{props.grindSetting}</p>
    )
}

export default GrindDisplay