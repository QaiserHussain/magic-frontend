const initialState = ""

const fetchDetail = (state = initialState, {type,payload}) => {
    switch (type) {
        case "FETCH": return payload;
        default:
            return state;
    }
}
export default fetchDetail;