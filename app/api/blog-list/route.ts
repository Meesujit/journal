import { NextResponse } from "next/server";
import { getSortedPostsData } from "@/lib/blog";

export const runtime = 'edge';

export async function GET() {
  try {
    const posts = await getSortedPostsData();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
