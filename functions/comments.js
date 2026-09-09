export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    const postId = url.searchParams.get("post");

    if (!postId) {
        return Response.json(
            { error: "Missing post parameter" },
            { status: 400 }
        );
    }

    const { results } = await context.env.DB
        .prepare(`
            SELECT
                id,
                parent_id,
                name,
                body,
                created_at
            FROM comments
            WHERE post_id = ?
              AND approved = 1
            ORDER BY created_at ASC
        `)
        .bind(postId)
        .all();

    return Response.json(results);
}

export async function onRequestPost(context) {
    try {
        const data = await context.request.json();

        const postId = String(data.post_id || "").trim();
        const name = String(data.name || "").trim();
        const body = String(data.body || "").trim();
        const email = String(data.email || "").trim();
        const parentId = data.parent_id || null;

        if (!postId || !name || !body) {
            return Response.json(
                { error: "Name and comment are required." },
                { status: 400 }
            );
        }

        if (name.length > 100) {
            return Response.json(
                { error: "Name is too long." },
                { status: 400 }
            );
        }

        if (body.length > 5000) {
            return Response.json(
                { error: "Comment is too long." },
                { status: 400 }
            );
        }

        const result = await context.env.DB
            .prepare(`
                INSERT INTO comments
                (post_id, parent_id, name, email, body, created_at, approved)
                VALUES (?, ?, ?, ?, ?, ?, 1)
            `)
            .bind(
                postId,
                parentId,
                name,
                email || null,
                body,
                Date.now()
            )
            .run();

        return Response.json({
            success: true,
            id: result.meta.last_row_id
        });

    } catch (error) {
        return Response.json(
            { error: "Unable to post comment." },
            { status: 500 }
        );
    }
}
