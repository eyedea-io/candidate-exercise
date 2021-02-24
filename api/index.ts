import express, { Response } from "express";
import cors from "cors";
import crypto from "crypto";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

const SECRET_KEY = "XYZABC123";

interface SessionUser {
  id: number;
  email: string;
}

interface RegisteredUser extends SessionUser {
  passwordHash: string;
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

const users: RegisteredUser[] = [];

const sendError = (code: number, res: Response<any>, msg?: string) => {
  res.statusCode = code;
  let baseMessage = "";
  if (code === 400) {
    baseMessage = "Bad request";
  } else if (code === 404) {
    baseMessage = "Not exists";
  } else if (code === 401) {
    baseMessage = "Unauthorized";
  } else {
    baseMessage = "Server error";
  }

  if (msg) {
    baseMessage += `: ${msg}`;
  }

  res.send(baseMessage);
};

app.post("/register", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendError(400, res);
  }

  if (users.find((u) => u.email === email)) {
    return sendError(400, res, "already exists");
  }

  users.push({
    email: email,
    passwordHash: crypto.createHash("md5").update(password).digest("hex"),
    id: users.length + 1,
  });

  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify({ message: "OK" }));
});

app.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  const passwordHash = crypto.createHash("md5").update(password).digest("hex");

  const foundUser = users.find(
    (u) => u.email === email && u.passwordHash === passwordHash
  );

  if (!foundUser) {
    return sendError(401, res);
  }

  const { passwordHash: passwordHashDiscarded, ...sanitizedUser } = foundUser;

  const token = jwt.sign(sanitizedUser, SECRET_KEY);

  res.setHeader("content-type", "application/json");
  res.send(
    JSON.stringify({
      token,
    })
  );
});

app.get("/secret-data", async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = (authHeader as string).match(/Bearer (.+)/)?.[1];
  if (!token) {
    return sendError(401, res);
  }
  try {
    jwt.verify(token, SECRET_KEY, {});
  } catch {
    return sendError(401, res);
  }

  const user = jwt.decode(token) as SessionUser;

  if (!user || !users.find((u) => u.email === user.email)) {
    return sendError(401, res);
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  res.setHeader("content-type", "application/json");
  res.send(
    JSON.stringify({
      secretInfo: `This is secret info for ${user.email}`,
    })
  );
});

app.listen(4000, () => {
  console.log("API is on!");
});
