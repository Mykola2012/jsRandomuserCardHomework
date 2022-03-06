"use strict";

const options = {
  results: 6,
  page: 1,
  seed: "random2022",
};

loadUsers(options);

function loadUsers(options) {
  fetch(
    `https://randomuser.me/api/?results=${options.results}&page=${options.page}&seed=${options.seed}`
  )
    .then((response) => response.json())
    .then(({ results }) => {
      console.log("data :>> ", results);
      renderUsers(results);
    })
    .catch((e) => {
      console.log("e :>> ", e);
    });
}

const [prevBtn, startBtn, nextBtn] = document.querySelectorAll("button");

prevBtn.addEventListener("click", prevBtnHandler);
startBtn.addEventListener("click", startBtnHandler);
nextBtn.addEventListener("click", nextBtnHandler);

function prevBtnHandler() {
  if (options.page > 1) {
    options.page -= 1;
    loadUsers(options);
  }
}

function startBtnHandler() {
  if (options.page > 1) {
    options.page = 1;
    loadUsers(options);
  }
}

function nextBtnHandler() {
  options.page += 1;
  loadUsers(options);
}

function renderUsers(users) {
  const usersList = document.querySelector(".users-list");

  const usersListItems = users.map((u) => createUserItem(u));

  usersList.replaceChildren(...usersListItems);
}

function createUserItem({
  name: { first: firstName, last: lastName },
  picture: { large: src },
  dob: { age },
  email,
  gender,
}) {
  const userListItem = document.createElement("li");
  userListItem.classList.add("user-list-item");

  if (`${gender}` === "male") {
    userListItem.classList.add("style-gender-male");
  } else if (`${gender}` === "female") {
    userListItem.classList.add("style-gender-female");
  } else {
    userListItem.classList.add("style-gender-not-selected");
  }

  userListItem.append(
    createUserImg(src, `${firstName} ${lastName}`),
    createUserMainInfo(`${firstName} ${lastName}`),
    createUserAge(`Age: ${age}`),
    createUserEmail(`${email}`)
  );

  return userListItem;
}

function createUserImg(src, alt) {
  const userImgEl = document.createElement("img");
  userImgEl.src = src;
  userImgEl.alt = alt;
  userImgEl.onerror = () => {
    userImgEl.src = "./img/defaultImg.png";
  };

  return userImgEl;
}

function createUserMainInfo(textContent) {
  const userMainInfoEl = document.createElement("p");
  userMainInfoEl.classList.add("main-info");
  userMainInfoEl.textContent = textContent;

  return userMainInfoEl;
}

function createUserAge(age) {
  const userAgeEl = document.createElement("p");
  userAgeEl.classList.add("user-age");
  userAgeEl.textContent = age;

  return userAgeEl;
}

function createUserEmail(email) {
  const userEmailEl = document.createElement("a");
  userEmailEl.classList.add("user-email");
  userEmailEl.setAttribute("href", "#");
  userEmailEl.textContent = email;

  return userEmailEl;
}
