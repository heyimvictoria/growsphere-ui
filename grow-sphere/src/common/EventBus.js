const eventBus = {
    // Registers a callback to listen for custom events of a specific type on the document.
    on(event, callback) {
        // Adds an event listener that triggers the callback, passing the event's detail property
        document.addEventListener(event, (e) => callback(e.detail));
    },

    // Triggers a custom event with specified data attached to it.
    dispatch(event, data) {
        // Dispatches a new custom event with a specified name and details
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },

    // Removes a previously registered event listener.
    remove(event, callback) {
        // Removes the event listener from the document
        document.removeEventListener(event, callback);
    },
};

export default eventBus;
