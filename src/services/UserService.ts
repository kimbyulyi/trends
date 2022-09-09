import db from "../lib/db.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

interface AUthParams {
  username: string;
  password: string;
}

class UserService {
  private static instance: UserService;
  public static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async register({ username, password }: AUthParams) {
    const exists = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (exists) {
      throw new Error("User Already exists");
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = db.user.create({
      data: {
        username,
        passwordHash: hash,
      },
    });
    return user;
  }

  login() {
    return "logged in!";
  }
}

export default UserService;
