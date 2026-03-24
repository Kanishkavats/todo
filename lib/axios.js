// // lib/axios.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: "/api",
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     if (error.response.status === 401) {
//       const refreshToken = localStorage.getItem("refreshToken");

//       const res = await axios.post("/api/auth/refresh", {
//         refreshToken,
//       });

//       localStorage.setItem("accessToken", res.data.accessToken);

//       error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
//       return axios(error.config);
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

// lib/axios.js
import axios from "axios";

const api = axios.create({ baseURL: "/api" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;

    // Check if status is 401 and we haven't already retried this request
    if (err.response && err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post("/api/auth/refresh", { refreshToken });

        localStorage.setItem("accessToken", res.data.accessToken);

        originalConfig.headers.Authorization = `Bearer ${res.data.accessToken}`;
        // Use the updated config to retry the original request
        return api(originalConfig);
      } catch (_error) {
        // If refreshing token fails, log user out
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(_error);
      }
    }
    return Promise.reject(err);
  }
);

export default api;