let comments = [];
let commentName = document.getElementById('comment-name');
let commentBody = document.getElementById('comment-body');
let button = document.getElementById('comment-add');
loadComments();

document.getElementById('comment-add').onclick = function () {
  event.preventDefault();

  let comment = {
    name: commentName.value,
    body: commentBody.value,
    time: Math.floor(Date.now() / 1000),
  }

  commentName.value = '';
  commentBody.value = '';
  disabledButton(false);
  comments.push(comment);

  saveComments();
  let commentField = document.getElementById('comment-container');
  commentField.innerHTML += showComment(comment);
}

function saveComments() {
  localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
  if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
  showComments();
}

function showComment(item) {
  let out = `<div class="card">`;
  out += `<div class="card-body">
  <p>${item.body}</p>
  <div class="mini-row d-flex align-items-center">
  <h5 class="card-subtitle col">${timeConverter(item.time)}</h5>
  <h4 class="card-title text-right col">${item.name}</h4>
  </div></div>`;
  return out;
}

function showComments() {
  let commentField = document.getElementById('comment-container');
  comments.forEach(function (item) {
    commentField.innerHTML += showComment(item);
  });
}

function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);
  let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let time = `${date}.${month}.${year}, ${hour}:${min}`;
  return time;
}

// let button = document.querySelector('.submit-button');


function checkInput() {
  disabledButton(commentName.value.trim() !== "" && commentBody.value.trim() !== "")
}

function disabledButton(isDisabled) {
  if (isDisabled) {
    button.style.backgroundColor = 'red'
    button.style.borderColor = 'red';
    button.style.color = 'white';
    button.disabled = false;
  } else {
    button.style.backgroundColor = 'white'
    button.style.borderColor = '#343a40';
    button.style.color = '#343a40';
    button.disabled = true;
  }
}