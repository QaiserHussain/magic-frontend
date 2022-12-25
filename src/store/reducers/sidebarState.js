import { OPEN, CLOSE } from '../constants/constants';
const initialState = "open"

const changeSidebarState = (state = initialState, action) => {
    switch (action.type) {
        case OPEN: return state === "close" ? action.payload : 'close';
        case CLOSE: return state === "open" ? action.payload : 'open';

        default:
            return state;
    }
}

export default changeSidebarState;