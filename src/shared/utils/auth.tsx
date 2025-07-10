export const checkIfAuthenticationIsRequired = () => {
    const currentUser = localStorage?.getItem("user") && typeof(localStorage.getItem("user")) === "string"
        ? JSON.parse(localStorage.getItem("user") as string)
        : null;

    if (new Date(currentUser?.stsTokenManager?.expirationTime) < new Date()) {
        localStorage.clear();
        document.location.reload();
    }
}