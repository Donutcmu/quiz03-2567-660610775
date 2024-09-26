import { DB, originalDB, readDB, User, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";


export const GET = async () => {
  
  readDB();
  //const roomlist=[];
  //const roomnamelist = [];
  //for(const roomidd of (<Room>DB).roomId){
  //  roomlist.push(roomidd);
  //}
  //for(const roomnamee of (<Room>DB).roomName){
  //roomnamelist.push(roomnamee);
  //}
  return NextResponse.json({
    ok: true,
    rooms:originalDB.rooms,
    totalRooms:originalDB.rooms.length,
  });
};

export const POST = async (request: NextRequest) => {
  const payload = checkToken();
   if(!payload){
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }
  
  const {role} = <User>payload;
  const body = await request.json();
  const {roomName} =body;
  readDB();
  if (role === "ADMIN"||role==="SUPER_ADMIN") {
    return NextResponse.json({
      ok: true,
      // Type casting to "Database"
      enrollments: (<User>DB).role,
    });
  }
  for(const roomnamee of originalDB.rooms){
    if(roomnamee.roomName===roomName){
      return NextResponse.json(
          {
            ok: false,
            message: `Room ${"replace this with room name"} already exists`,
          },
          { status: 400 }
        );
    }
  }
  
   

  const roomId = nanoid();

  //call writeDB after modifying Database
  originalDB.rooms.push(roomName)
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${roomName} has been created`,
  });
};
