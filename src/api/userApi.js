import axios from "axios";

const API_URL =
  "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json";

// Get all users
export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

// Get user by ID
export const fetchUserById = async (id) => {
  try {
    const response = await axios.get(API_URL);
    const user = response.data.find((user) => user.id === Number(id));
    return user;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};
