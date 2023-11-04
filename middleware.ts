import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createClient(request);
    const session = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: ["/resume"],
};
