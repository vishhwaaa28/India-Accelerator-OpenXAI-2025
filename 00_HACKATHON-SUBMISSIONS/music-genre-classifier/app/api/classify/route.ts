// app/api/classify/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { summary, filename } = await req.json();

    if (!summary) {
      return NextResponse.json(
        { ok: false, error: "Missing summary" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
    const model = process.env.OLLAMA_MODEL || "llama3.1";

    const system =
      `You are a strict JSON music-genre classifier.\n\n` +
      `You will receive audio features computed from a track. Decide the genre from this shortlist: ` +
      `rock, pop, hip hop, jazz, classical, electronic, metal, country, folk, blues, reggae, r&b/soul, latin, bhangra, bollywood/filmi, indian classical, devotional, lo-fi, other. ` +
      `Return a single JSON object with EXACTLY these keys: ` +
      `{"genre": string, "subgenres": string[], "confidence": number, "mood": string[], "keyFactors": string[], "reasoning": string}. ` +
      `- "confidence" is 0..1. ` +
      `- Keep "reasoning" to <= 3 short sentences.`;

    const user = {
      filename,
      features: summary,
    };

    const prompt = `${system}\n\nINPUT:\n${JSON.stringify(user)}`;

    const payload = {
      model,
      prompt,
      stream: false,
      // Enforce valid JSON response
      format: "json" as const,
      options: {
        temperature: 0.1,
        num_ctx: 8192,
      },
    };

    const r = await fetch(`${baseUrl}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const errTxt = await r.text();
      throw new Error(`Ollama error ${r.status}: ${errTxt}`);
    }

    const data = await r.json(); // { response: string, ... }

    let parsed: any = null;
    try {
      parsed = JSON.parse(data.response);
    } catch {
      // In rare cases the model may emit non-JSON; return raw for debugging.
      parsed = { raw: data.response };
    }

    return NextResponse.json({ ok: true, result: parsed });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
