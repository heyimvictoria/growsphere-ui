// Define and export a function called authHeader
export default function authHeader() {
    // Retrieve the 'user' item from the local storage, which is expected to be a string in JSON format
    const user = JSON.parse(localStorage.getItem('user'));

    // Check if the user object exists and if it has an accessToken property
    if (user && user.accessToken) {
        // If both conditions are met, return an object with the Authorization header
        // The Authorization header uses the 'Bearer' schema followed by the user's accessToken
        return { Authorization: 'Bearer ' + user.accessToken }; // This header format is typically used with Spring Boot back-ends
    } else {
        // If the user data is not available or the accessToken is missing, return an empty object
        // An empty object implies no headers to be added for the request
        return {};
    }
}
