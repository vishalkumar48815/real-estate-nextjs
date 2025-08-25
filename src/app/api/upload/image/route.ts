import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export async function POST(req: Request) {

  try {
    let request = await req.json()
    const { file, name, type } = request as { file: string; name: string; type: string };
    const buffer = Buffer.from(file.split(",")[1], "base64");

    const blob = await put(`images/${Date.now()}-${name}`, buffer, {
      access: "public",
      contentType: type,
    });

    return NextResponse.json({data: { url: blob.url }}, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, {status: 500});
  }
}


export async function DELETE(req: Request) {
  try {
    const { url } = await req.json();
    await del(url);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}