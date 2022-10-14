

export const onSetPlayerDexID = (type, data) => (dispatch) => {
    dispatch({
        type : type,
        payload : data,
    })
}

export default {
    onSetPlayerDexID,
}