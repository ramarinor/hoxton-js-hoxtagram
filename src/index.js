const state = { images: [], comments: [] };

const imageContainer = document.querySelector(".image-container");

function getImages() {
	return fetch("http://localhost:3000/images").then((response) => response.json());
}
function getComments() {
	return fetch("http://localhost:3000/comments").then((response) => response.json());
}

getImages().then((imagesFromServer) => {
	state.images = imagesFromServer;
	console.log(imagesFromServer);
	renderImages();
});

function renderImages() {
	imageContainer.innerHTML = "";
	for (const image of state.images) {
		const imageCardEl = document.createElement("article");
		imageCardEl.setAttribute("class", "image-card");

		const titleEl = document.createElement("h2");
		titleEl.setAttribute("class", "title");
		titleEl.textContent = image.title;

		const imgEl = document.createElement("img");
		imgEl.src = image.image;
		imgEl.setAttribute("class", "image");

		const likesSection = document.createElement("div");
		likesSection.setAttribute("class", "likes-section");

		const likesEl = document.createElement("span");
		likesEl.setAttribute("class", "likes");
		likesEl.textContent = image.likes;

		const likeBtn = document.createElement("button");
		likeBtn.setAttribute("class", "like-button");
		likeBtn.innerText = "♥";

		likesSection.append(likesEl, likeBtn);

		const commentsList = document.createElement("ul");
		commentsList.setAttribute("class", "comments");
		getComments().then((commentsFromServer) => {
			state.comments = commentsFromServer;
			renderComments(commentsList, image.id);
		});

		imageCardEl.append(titleEl, imgEl, likesSection, commentsList);

		imageContainer.append(imageCardEl);
	}
}

function renderComments(commentsList, targetImageId) {
	for (const comment of state.comments.filter((comment) => comment.imageId === targetImageId)) {
		const liEl = document.createElement("li");
		liEl.textContent = comment.content;
		commentsList.append(liEl);
	}
}
