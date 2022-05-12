import React from "react";

type ButtonType = {
    name: string,
    callBack: () => void
}

function Button (props: ButtonType) {

    function onClickHandler () {
        props.callBack()
    }
    return(
        <button onClick={onClickHandler}>{props.name}</button>
    )
}

export default Button