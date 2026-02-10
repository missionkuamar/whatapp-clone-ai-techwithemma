import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { loginService, registerService } from "../services/user.service";
import { clearJwtAuthCookie, setjwtAuthCookie } from "../utils/cookie";
import { HTTPSTATUS } from "../config/http.config";


export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse(req.body);

    const user = await registerService(body);
    const userId = user._id.toString();

    setjwtAuthCookie({ res, userId });

    return res.status(HTTPSTATUS.CREATED).json({
      message: "User registered successfully",
      user,
    });
  }
);


export const loginUser = asyncHandler(
  async (req: Request, res: Response) => {
    const body = loginSchema.parse(req.body);
    const user = await loginService(body);
    const userId = user._id.toString();
    setjwtAuthCookie({ res, userId });

    return res.status(HTTPSTATUS.CREATED).json({
      message: "User registered successfully",
      user,
    });
  }
);

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  clearJwtAuthCookie(res);

  return res
    .status(HTTPSTATUS.OK)
    .json({ message: "Logged out successfully" });
});
