import apiClient from "../../utils/axiosconfig.js";

// Function to send a contact message
const sendContactMessage = async (contactData) => {
    try {
        const response = await apiClient.post("enquiry", contactData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const contactService = {
    sendContactMessage,
};
