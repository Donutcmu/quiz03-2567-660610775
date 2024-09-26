import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Punnatat Ngirnngam",
    studentId: "660610775",
  });
};
