import axios from "axios";
import { base_url } from "../../utils/baseURL.js";

// Function to send a contact message
const sendContactMessage = async (contactData) => {
    try {
        const response = await axios.post(`${base_url}enquiry`, contactData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const contactService = {
    sendContactMessage,
};
