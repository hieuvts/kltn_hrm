import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-type": "application/json",
  },
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2M4YzYzMmE0ODM1NWEzZjgwNmNmNyIsImlhdCI6MTY0MDc5NTQwMiwiZXhwIjoxNjQwODgxODAyfQ.e8vl5sEqLYUQGtBrKIX0Puyh6bSFNqvFuyK4SOOpdKY`,
  },
});
