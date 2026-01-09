import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { verifyAuthToken } from "@/lib/auth";

function isValidEmail(email: string) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}

export async function GET(request: NextRequest) {
  try {
    const payload = verifyAuthToken(request);
    if (!payload) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findById(payload.userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const userData = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      phone: (user as any).phone,
      timezone: (user as any).timezone,
      createdAt: user.createdAt,
    };

    return NextResponse.json({ success: true, data: { user: userData } }, { status: 200 });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json({ success: false, message: "Failed to load profile" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const payload = verifyAuthToken(request);
    if (!payload) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
    }

    await dbConnect();

    const setUpdates: Record<string, unknown> = {};
    const unsetUpdates: Record<string, unknown> = {};

    if (typeof (body as any).fullName === "string") {
      const fullName = (body as any).fullName.trim();
      if (!fullName) {
        return NextResponse.json({ success: false, message: "Full name cannot be empty" }, { status: 400 });
      }
      setUpdates.fullName = fullName.slice(0, 100);
    }

    if (typeof (body as any).phone === "string") {
      setUpdates.phone = (body as any).phone.trim().slice(0, 30);
    }

    if (typeof (body as any).timezone === "string") {
      setUpdates.timezone = (body as any).timezone.trim().slice(0, 50);
    }

    if ((body as any).avatar === null || (body as any).avatar === "") {
      unsetUpdates.avatar = "";
    } else if (typeof (body as any).avatar === "string") {
      setUpdates.avatar = (body as any).avatar;
    }

    if (typeof (body as any).email === "string") {
      const email = (body as any).email.toLowerCase().trim();
      if (!isValidEmail(email)) {
        return NextResponse.json({ success: false, message: "Please provide a valid email" }, { status: 400 });
      }

      const existingUser = await User.findOne({ email, _id: { $ne: payload.userId } });
      if (existingUser) {
        return NextResponse.json({ success: false, message: "Email already in use" }, { status: 409 });
      }

      setUpdates.email = email;
    }

    const updateQuery: Record<string, unknown> = {};
    if (Object.keys(setUpdates).length > 0) updateQuery.$set = setUpdates;
    if (Object.keys(unsetUpdates).length > 0) updateQuery.$unset = unsetUpdates;

    if (Object.keys(updateQuery).length === 0) {
      return NextResponse.json({ success: false, message: "No updates provided" }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(payload.userId, updateQuery, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const userData = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      phone: (user as any).phone,
      timezone: (user as any).timezone,
      createdAt: user.createdAt,
    };

    return NextResponse.json(
      { success: true, message: "Profile updated", data: { user: userData, token: "" } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ success: false, message: "Failed to update profile" }, { status: 500 });
  }
}
