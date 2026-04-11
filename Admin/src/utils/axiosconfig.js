const getAdminUserFromLocalStorage = () => {
  try {
    return localStorage.getItem("adminUser")
      ? JSON.parse(localStorage.getItem("adminUser"))
      : null;
  } catch {
    return null;
  }
};

const getAdminToken = () => {
  const adminUser = getAdminUserFromLocalStorage();
  return adminUser?.token || localStorage.getItem("adminToken") || "";
};

export const config = {
  get headers() {
    const token = getAdminToken();

    return {
      Authorization: token ? `Bearer ${token}` : "",
      Accept: "application/json",
    };
  },
  withCredentials: true,
};
