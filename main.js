// Создайте contactbook на json-server.

// У каждого контакта должны быть следующие поля:
// 1. Name
// 2. Surname
// 3. Photo
// 4. Number
// 5. Email

// Вам необходимо реализовать CRUD.

const API = "http://localhost:8000/contactbook";

let nameBook = document.querySelector(".names");
let surnameBook = document.querySelector(".surname");
let emailBook = document.querySelector(".email");
let imgBook = document.querySelector(".img");
let contactBook = document.querySelector(".contact");
let submitBook = document.querySelector(".submit");
let formaList = document.querySelector(".formlist");
// console.log(nameBook, surnameBook, emailBook, imgBook, contactBook, submitBook);
let newBook = {};

function eventBook() {
  newBook = {
    name: nameBook.value,
    surname: surnameBook.value,
    email: emailBook.value,
    img: imgBook.value,
    contact: contactBook.value,
  };
}

// submitBook.addEventListener("input", (e) => {
//   newBook = { contactbook: e.target.value };
//   //   console.log(newBook);
// });

async function submit() {
  eventBook();
  try {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newBook),
    });
  } catch (error) {
    console.log(error);
  }
  nameBook.value = "";
  surnameBook.value = "";
  emailBook.value = "";
  imgBook.value = "";
  contactBook.value = "";

  getBook();
}

submitBook.addEventListener("click", submit);

async function getBook() {
  try {
    let res = await fetch(API);
    let book = await res.json();
    render(book);
  } catch (error) {
    console.log(error);
  }
}

function render(book) {
  formaList.innerHTML = "";
  book.forEach((item) => {
    formaList.innerHTML += `<div class="card border border-0" style="width: 5rem;">
    <div class="card-body width:1rem">
    <img src="${item.img}" class="card-img-top" alt="..."> Image
      <h5 class="card-title">Name:${item.name}</h5>
      <p class="card-title">Surname:${item.surname}</p>
      <p class="card-title">Email:${item.email}</p>
      <p class="card-title">Number${item.contact}</p>
      </div>
      <button  onclick="deleteBook(${item.id})"class='btn btn-primary  border  border-primary-subtle border-3 rounded-0'>delete</button>
      <button  onclick="editBook(${item.id})"class='btn btn-primary  border border-primary-subtle border-3 rounded-0' btn-edit' data-bs-toggle="modal" data-bs-target="#exampleModal">edit</button>
  </div>
   `;
  });
}

getBook();

async function deleteBook(id) {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    getBook();
  } catch (error) {
    console.log(error);
  }
}

let modalEdit = document.querySelector(".main-modal");
let btnCloseEdit = document.querySelector(".btn-closer");
let namesEdit = document.querySelector(".namesBook");
let surnameEdit = document.querySelector(".surnameBook");
let imgEdit = document.querySelector(".imgBook");
let emailEdit = document.querySelector(".emailBook");
let contactEdit = document.querySelector(".contactBook");
let editModal = document.querySelector("#exampleModal");
let savebtn = document.querySelector(".save-btn");
// console.log(
//   modalEdit,
//   btnCloseEdit,
//   namesEdit,
//   surnameEdit,
//   imgEdit,
//   emailEdit,
//   contactEdit,
//   btnSaveEdit
// );
let editedObj = {};
function inpEdit() {
  editedObj = {
    name: namesEdit.value,
    surname: surnameEdit.value,
    email: emailEdit.value,
    img: imgEdit.value,
    contact: contactEdit.value,
  };
}
async function editBook(id) {
  try {
    let res = await fetch(`${API}/${id}`);
    let objToEdit = await res.json();

    namesEdit.value = objToEdit.name;
    surnameEdit.value = objToEdit.surname;
    imgEdit.value = objToEdit.img;
    emailEdit.value = objToEdit.email;
    contactEdit.value = objToEdit.contact;

    savebtn.setAttribute("id", `${id}`);
    // surnameEdit.setAttribute("id", `${id}`);
    // imgEdit.setAttribute("id", `${id}`);
    // emailEdit.setAttribute("id", `${id}`);
    // contactEdit.setAttribute("id", `${id}`);
    // btnCloseEdit.setAttribute("id", `${id}`);
    // console.log(objToEdit);
  } catch (error) {
    console.log(error);
  }
}

savebtn.addEventListener("click", async (e) => {
  let id = e.target.id;
  inpEdit();
  console.log(editedObj);

  try {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(editedObj),
    });
  } catch (error) {
    console.log(error);
  }
  // console.log(e.target);
  // console.log(id);
  getBook();
  let modal = bootstrap.Modal.getInstance(editModal);
  modal.hide();
});

// async function editBook(id) {
//   try {
//     await fetch(`${API}/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json; charset=utf-8",
//       },
//       body: JSON.stringify(editedTask),
//     });
//     getBook();
//   } catch (error) {
//     console.log(error);
//   }
//   let editedTask = {
//     name: nameBook.value,
//     surname: surnameBook.value,
//     email: emailBook.value,
//     img: imgBook.value,
//     contact: contactBook.value,
//   };

//   modalEdit.style.display = "block";
//   namesEdit.value = names.id;
//   surnameEdit.value = surname.id;
//   imgEdit.value = img.id;
//   emailEdit.value = email.id;
//   contactEdit.value = contact.id;

//   namesEdit.setAttribute("id");
//   surnameEdit.setAttribute("id");
//   imgEdit.setAttribute("id");
//   emailEdit.setAttribute("id");
//   contactEdit.setAttribute("id");
//   btnSaveEdit.setAttribute("id");
// }
