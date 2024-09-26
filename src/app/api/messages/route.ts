import {  originalDB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
//import { headers } from "next/headers";

export const GET = async (request: NextRequest) => {
  const roomId = request.nextUrl.searchParams.get("roomId");
  readDB();
  const foundRoom = originalDB.rooms.find((r)=>r.roomId===roomId);
  if(!foundRoom){
    return NextResponse.json(
     {
       ok: false,
       message: `Room is not found`,
     },
     { status: 404 }
   );
  }
  const roommessagelist = [];
  for(const rm of originalDB.messages){
    if(rm.roomId===roomId){
      roommessagelist.push(rm);
    }
  }
  return NextResponse.json(
    {
      ok:true,
      messages:roommessagelist,
    }
  )
   
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const {roomId} =body;
  readDB();
  const foundRoomId = originalDB.rooms.find((r)=>r.roomId===roomId);
  if(!foundRoomId){
     return NextResponse.json(
     {
      ok: false,
      message: `Room is not found`,
    },
    { status: 404 }
   );
  }
  
  const messageId = nanoid();

  writeDB();

  return NextResponse.json({
    ok: true,
    messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async () => {
  //const payload = checkToken();

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: "Invalid token",
  //   },
  //   { status: 401 }
  // );

  readDB();

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: "Message is not found",
  //   },
  //   { status: 404 }
  // );

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
