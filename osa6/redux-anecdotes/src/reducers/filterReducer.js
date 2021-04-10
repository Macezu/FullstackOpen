const reducer = (state = "",action) => {
    switch (action.type) {
        case "NEWFILTER":
            return state = action.data
        default:
            return state
    }
}

export const createFilter = (content) => {
    return {
        type : "NEWFILTER",
        data : {content}
    }
}


export default reducer