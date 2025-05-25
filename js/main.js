import { getAdjectives } from "./data.js";

let adjectives;
let sortDirection = "up";

function init() {
  adjectives = JSON.parse(getAdjectives());
  render();
  addSortEvents();
}

function render() {
  const container = document.getElementById("container");
  container.innerHTML = "";

  adjectives.sort((a, b) => {
    return sortDirection === "up" ? a.score - b.score : b.score - a.score;
  });

  adjectives.forEach(adj => {
    const scoreClass = adj.score >= 6 ? "good" : adj.score >= 4 ? "average" : "bad";

    container.innerHTML += `
      <div class="word-item">
        <span class="word-score ${scoreClass}">${adj.score}</span>
        <span>${adj.word}</span>
        <div class="vote-buttons">
          <button value="${adj.word}" class="upvote-button">👍</button>
          <button value="${adj.word}" class="downvote-button">👎</button>
        </div>
      </div>
    `;
  });

  addVoteEvents();
}

function addSortEvents() {
  document.getElementById("sort-up").addEventListener("click", () => {
    sortDirection = "up";
    document.getElementById("sort-up").classList.add("active");
    document.getElementById("sort-down").classList.remove("active");
    render();
  });

  document.getElementById("sort-down").addEventListener("click", () => {
    sortDirection = "down";
    document.getElementById("sort-down").classList.add("active");
    document.getElementById("sort-up").classList.remove("active");
    render();
  });
}

function addVoteEvents() {
  document.querySelectorAll(".upvote-button").forEach(button => {
    button.addEventListener("click", () => {
      upVote(button.value);
    });
  });

  document.querySelectorAll(".downvote-button").forEach(button => {
    button.addEventListener("click", () => {
      downVote(button.value);
    });
  });
}

function upVote(word) {
  updateScore(word, +0.1);
  render();
}

function downVote(word) {
  updateScore(word, -0.1);
  render();
}

function updateScore(word, scoreChange) {
  const foundIndex = adjectives.findIndex(item => item.word === word);
  if (foundIndex !== -1) {
    adjectives[foundIndex].score = Math.round((adjectives[foundIndex].score + scoreChange) * 100) / 100;
  }
}

init();
