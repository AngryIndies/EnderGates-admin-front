export const onSetSidebarTag = (type, name) => (dispatch) => {
    dispatch({
        type : type,
        payload : name
    });
}