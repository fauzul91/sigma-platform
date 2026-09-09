import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get("url");

    if (!videoUrl) {
      return NextResponse.json(
        { error: "Parameter URL wajib diisi" },
        { status: 400 }
      );
    }

    // 1. Extract Video ID from various YouTube URL formats
    const videoIdMatch = videoUrl.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) {
      return NextResponse.json(
        { error: "URL YouTube tidak valid atau Video ID tidak ditemukan" },
        { status: 400 }
      );
    }

    const canonicalUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // 2. Fetch OEmbed for Channel Name and Title
    let channel = "";
    let title = "";

    try {
      const oembedRes = await fetch(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(canonicalUrl)}&format=json`,
        { next: { revalidate: 3600 } }
      );
      if (oembedRes.ok) {
        const oembedData = await oembedRes.json();
        channel = oembedData.author_name || "";
        title = oembedData.title || "";
      }
    } catch {
      // Ignore oembed error and try fallback
    }

    // 3. Fetch Watch Page HTML to extract exact video duration
    let duration = "";

    try {
      const htmlRes = await fetch(canonicalUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        },
      });

      if (htmlRes.ok) {
        const html = await htmlRes.text();

        // Regex for lengthSeconds in ytInitialPlayerResponse
        const matchSec = html.match(/"lengthSeconds":"(\d+)"/);
        const matchApprox = html.match(/"approxDurationMs":"(\d+)"/);

        let totalSeconds: number | null = null;
        if (matchSec) {
          totalSeconds = parseInt(matchSec[1], 10);
        } else if (matchApprox) {
          totalSeconds = Math.round(parseInt(matchApprox[1], 10) / 1000);
        }

        if (totalSeconds !== null && !isNaN(totalSeconds)) {
          const hrs = Math.floor(totalSeconds / 3600);
          const mins = Math.floor((totalSeconds % 3600) / 60);
          const secs = totalSeconds % 60;

          if (hrs > 0) {
            duration = `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
          } else {
            duration = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
          }
        }

        // Fallback for channel name if oembed didn't provide it
        if (!channel) {
          const matchOwner = html.match(/"ownerChannelName":"([^"]+)"/);
          if (matchOwner) channel = matchOwner[1];
        }

        // Fallback for title if oembed didn't provide it
        if (!title) {
          const matchTitle = html.match(/<title>([^<]+)<\/title>/);
          if (matchTitle) {
            title = matchTitle[1].replace(" - YouTube", "").trim();
          }
        }
      }
    } catch {
      // Duration fallback
    }

    return NextResponse.json({
      success: true,
      videoId,
      channel: channel || "Channel YouTube",
      title,
      duration: duration || "03:00",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Gagal memproses URL YouTube" },
      { status: 500 }
    );
  }
}
