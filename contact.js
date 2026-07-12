const form = document.getElementById("contact-form");

const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email")

const contactList = document.getElementById("contact-list")


const contacts = [];

form.addEventListener("submit", function (event) {
    event.preventDefault();



    const contact = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        phone: phoneInput.value,
        email: emailInput.value
    };

    console.log("Total counts:" + contacts.length);

    contacts.push(contact);
    displayContacts();
    form.reset();
});

function displayContacts() {
    contactList.innerHTML = "";

    for (let i = 0; i < contacts.length; i++) {

        const card = document.createElement("div");
        card.className = "contact";

        const name = document.createElement("h3");
        name.textContent = contacts[i].firstName + " " + contacts[i].lastName;

        const phone = document.createElement("p");
        phone.textContent = contacts[i].phone;

        const email = document.createElement("p");
        email.textContent = contacts[i].email;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            contacts.splice(i, 1);
            displayContacts();
        });

        card.appendChild(name);
        card.appendChild(phone);
        card.appendChild(email);
        card.appendChild(deleteButton);

        contactList.appendChild(card);
    }
}


