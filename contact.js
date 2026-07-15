const form = document.getElementById("contact-form");

const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email")

const contactList = document.getElementById("contact-list")
const searchInput = document.getElementById("search")


const contacts = [];

searchInput.addEventListener("input", function () {
    displayContacts();
});

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

    const search = searchInput.value.toLowerCase();

    const filterContacts = contacts.filter(contact =>
        contact.firstName.toLowerCase().includes(search) || contact.lastName.toLowerCase().includes(search));

    filterContacts.forEach((contact) => {

        const card = document.createElement("div");
        card.className = "contact";

        const name = document.createElement("h3");
        name.textContent = contact.firstName + " " + contact.lastName;

        const phone = document.createElement("p");
        phone.textContent = contact.phone;

        const email = document.createElement("p");
        email.textContent = contact.email;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {

            const index = contacts.indexOf(contact);
            contacts.splice(index, 1);
            displayContacts();
        });

        card.appendChild(name);
        card.appendChild(phone);
        card.appendChild(email);
        card.appendChild(deleteButton);

        contactList.appendChild(card);

    });
}


