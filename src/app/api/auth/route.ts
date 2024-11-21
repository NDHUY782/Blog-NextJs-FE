export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res.payload?.tokens?.access_token;
  if (!sessionToken) {
    return Response.json(
      { message: "Không nhận được session token" },
      {
        status: 400,
      }
    );
  }
  //   const res = await fetch('https://data.mongodb-api.com/...', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'API-Key': process.env.DATA_API_KEY,
  //     },
  //   })
  //   const data = await res.json()
  return Response.json(res.payload, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken}; Path=/;  httpOnly`,
    },
  });
}
