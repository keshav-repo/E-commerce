import app from "./app";
import http from "http";

const port = process.env.PORT || 8080;

const httpServer: http.Server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
