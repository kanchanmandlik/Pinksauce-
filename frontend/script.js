async function loadComments() {

    const response =
        await fetch("http://localhost:3000/comments");

    const comments =
        await response.json();

    const container =
        document.getElementById("comments");

    container.innerHTML = "";

    comments.forEach(c => {

        container.innerHTML += `
            <div>
                <strong>${c.username || "Anonymous"}</strong>
                <p>${c.comment}</p>
                <hr>
            </div>
        `;
    });
}

async function submitComment() {

    const username =
        document.getElementById("username").value;

    const comment =
        document.getElementById("comment").value;

    if (!comment.trim()) {
        alert("Comment cannot be empty");
        return;
    }

    await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            comment
        })
    });

    document.getElementById("comment").value = "";

    loadComments();
}

loadComments();