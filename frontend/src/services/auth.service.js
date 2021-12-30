import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

class AuthService {
  login(email, password) {
    return axios({
      method: "post",
      url: `${API_URL}/login`,
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      })
      .catch((error) => console.log("auth.service ", error));
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
