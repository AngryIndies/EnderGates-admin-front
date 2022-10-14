

export const onSetSidebarTag = (type, tag) => async (dispatch) => {
    const form_type  = await type;

    dispatch({
        type: form_type,
        payload: tag,
    });    
}

export default {
    onSetSidebarTag,
}