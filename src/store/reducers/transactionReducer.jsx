export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [
                    ...state.transactions,
                    state.newTransaction
                ],
            }
        default:
            return state
    }
}