import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Create unique filename
    const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");

    // Check environment - usually we can write to public folder in dev/VPS
    // In serverless/Vercel this won't persist, but for this portfolio context (VPS/Local) it works.
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Ensure dir exists (simple fs check or just try write)
    // For simplicity/safety, let's assume public/uploads needs to exist
    // await mkdir(uploadDir, { recursive: true });

    await writeFile(path.join(uploadDir, filename), buffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
