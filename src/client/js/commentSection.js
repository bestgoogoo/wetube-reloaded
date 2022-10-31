const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const comment = document.querySelector(".video__comment");
const deleteCommentBtn = document.getElementById("deleteCommentBtn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("id", "deleteCommentBtn");
  const btnIcon = document.createElement("i");
  btnIcon.className = "fas fa-circle-xmark";
  deleteBtn.appendChild(btnIcon);
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(deleteBtn);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  const textarea = form.querySelector("textarea");
  event.preventDefault();
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text == "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
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
  const commentId = comment.dataset.id;
  const { status } = await fetch(`/api/videos/${commentId}/comment`, {
    method: "DELETE",
  });
  if (status === 200) {
    comment.remove(commentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteCommentBtn) {
  deleteCommentBtn.addEventListener("click", handleDeleteComment);
}
