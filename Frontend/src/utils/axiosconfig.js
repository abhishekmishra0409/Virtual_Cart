const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const config = {
    headers: {
        Authorization: `Bearer ${
            getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
        Accept: "application/json",
    },
};

export default config;