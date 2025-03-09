export const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (error) {
        return undefined;
    }
}

export const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (error) {
        console.error('Failed to save state to localStorage:', error);
    }
}