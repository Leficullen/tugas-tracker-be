function apiKeyMiddleware(req, res, next) {
  console.log("Incoming API KEY:", req.headers["x-api-key"]);
  console.log("Backend API KEY:", process.env.API_KEY);

  const key = req.headers["x-api-key"];

  if (!key || key !== process.env.API_KEY) {
    console.log("API KEY INVALID");
    return res.status(401).json({ error: "Invalid API Key" });
  }

  console.log("API KEY VALID");
  next();
}

module.exports = apiKeyMiddleware;
