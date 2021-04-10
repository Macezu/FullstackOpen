const reducer = (state = "",action) => {
    console.log("state now: ", state)
    switch (action.type) {
        case "NEWFILTER":
            return state = action.data
        case "CLEAR":
            return state = ""
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

export const clearFilter = () => {
    return { type: "CLEAR"}
}

export default reducer