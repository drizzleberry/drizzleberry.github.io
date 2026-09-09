export async function onRequestGet(context) {
  return Response.json({
    envExists: !!context.env,
    dbExists: !!context.env?.DB,
    envKeys: Object.keys(context.env || {})
  });
}
//test1
