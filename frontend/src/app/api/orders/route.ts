import { NextApiRequest } from "next";

export async function POST(request: NextApiRequest) {
  try {
    const body = request.body;
    const req = new Request("http://localhost:3000/orders", {
      method: "POST",
      body: body,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...({ duplex: "half" } as any),
      headers: [["content-type", "application/json"]],
    });
    const res = await fetch(req);
    const data = await res.json();

    return Response.json(data);
  } catch {
    return { error: "Request failed" };
  }
}
