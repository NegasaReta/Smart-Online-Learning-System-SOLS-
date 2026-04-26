import { Request, Response } from "express";
import { getUserById } from "./me.service";

export async function getMeController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const authUser = (req as any).auth;

    if (!authUser || !authUser.userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: No valid session found",
      });
      return;
    }

    const user = await getUserById(authUser.userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in getMeController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}