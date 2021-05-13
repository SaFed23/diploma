export const AUTH = {
  headers: {
    Authorization: localStorage.getItem('token'),
  }
}

export const SET_AUTH = (token) => {
  AUTH.headers.Authorization = token;
}