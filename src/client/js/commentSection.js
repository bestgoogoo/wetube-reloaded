const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const comment = document.getElementById("comment");
const deleteCommentBtn = document.querySelector("#comment button");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.setAttribute("id", "comment");
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const btn = document.createElement("button");
  // btn.addEventListener("click", handleDeleteComment);
  const btnIcon = document.createElement("i");
  btnIcon.className = "fas fa-circle-xmark";
  btn.appendChild(btnIcon);
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(btn);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  const textarea = form.querySelector("textarea");
  event.preventDefault();
  const text = textarea.value;
  const { id } = videoContainer.dataset;
  if (text == "") {
    return;
  }
  const response = await fetch(`/api/videos/${id}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
  textarea.value = "";
};

const handleDeleteComment = async () => {
  const { id } = comment.dataset;
  const response = await fetch(`/api/videos/${id}/comment`, {
    method: "DELETE",
  });
  if (response.status === 200) {
    comment.remove(id);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteCommentBtn) {
  deleteCommentBtn.addEventListener("click", handleDeleteComment);
}
