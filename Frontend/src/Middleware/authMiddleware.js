import { toast } from "react-toastify";
import { getWishlist } from "../features/User/UserSlice";

const authMiddleware = (store) => (next) => (action) => {
    const state = store.getState();
    const isAuthenticated = state.auth.isAuthenticated;

    // List of actions that require authentication
    const protectedActions = [
        "auth/getWishlist/pending",
        "cart/getCart/pending",
        "cart/addToCart/pending",
        "products/addToWishlist/pending",
        "products/resetProductState",
        "products/addReview/pending",
    ];

    // If the action is a protected one and the user is not authenticated
    if (protectedActions.includes(action.type) && !isAuthenticated) {
        toast.error("You need to be logged in to perform this action!");
         window.location.href = "/login";
        return;
    }

    // Continue if authenticated or not a protected action
    return next(action);
};


export default authMiddleware;
