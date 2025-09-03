import { useEventStore } from "@/app/store/eventStore";
import { creatorId } from "@/app/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const events = useEventStore.getState().events;
  return NextResponse.json(events);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, date, location, category } = body;

    // Validate required fields
    if (!title || !description || !date || !location || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Add event to store
    useEventStore.getState().addEvent(body, creatorId);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
