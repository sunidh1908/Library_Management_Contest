const bookNameElement = document.getElementById('book-name');
const issueToElement = document.getElementById("issue-to");
const btnElement = document.getElementById('btn');
const tableBody = document.querySelector("tbody");
const books = [
];

function handleEdit(event) {
   const buttonElement  = event.target;
   console.log(buttonElement);
    const id = buttonElement.id;

   if (buttonElement.textContent === 'Edit') {
    event.target.textContent = "Save";
    const parentElement = buttonElement.parentElement;

    parentElement.removeChild(parentElement.firstChild);

    const input = document.createElement("input");
    input.id = 'status-inp';
    input.value = books[id - 1].status;
    parentElement.insertBefore(input, event.target);
   } 
   else{
      const statusElement = document.getElementById('status-inp');
      books[id - 1].status = statusElement.value;
      renderBooksInsideTable();
   }

}
function createTableRow (data, tableBody, bookId) {

    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.textContent = bookId;

    const bookNameTd = document.createElement("td");
    bookNameTd.textContent = data.name;

     const issueToTd = document.createElement("td");
     issueToTd.textContent = data.issuedTo;


    const issuedAtTd = document.createElement("td");
    issuedAtTd.textContent = data.issuedAt;

    const statusTd = document.createElement("td");
    statusTd.classList.add('flex');

    const button = document.createElement('button');
    const span = document.createElement('span');

    span.textContent = data.status;
    const className = data.status === "not returned" ? "red" : "green";
    span.classList.add(className);

    button.textContent = 'Edit';
    button.id = bookId;
    button.addEventListener("click", handleEdit);

    statusTd.appendChild(span);
    statusTd.appendChild(button);

    tr.appendChild(idTd);
    tr.appendChild(bookNameTd);
    tr.appendChild(issueToTd);
    tr.appendChild(issuedAtTd);
    tr.appendChild(statusTd);

    tableBody.appendChild(tr);
}

function renderBooksInsideTable() {

    tableBody.innerHTML = "";

   books.map(function (book, index) {

    createTableRow(book, tableBody,index+1);
   })
}

function handleFormSubmit () {

    const bookName = bookNameElement.value;
    bookNameElement.value = "";

    const issuedTo = issueToElement.value;
    issueToElement.value = "";

    if(bookName && issuedTo) {
        const book = {
          name: bookName,
          issuedTo: issuedTo,
          issuedAt: new Date().toUTCString().substring(0,12),
          status: "not returned",
        };

        books.push(book);
        renderBooksInsideTable();
    }
    else {
        alert("You are trying to enter empty details");
    }
    
}

btnElement.addEventListener('click', handleFormSubmit);