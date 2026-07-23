const form = document.getElementById("contact-form");

const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email")

const contactList = document.getElementById("contact-list")
const searchInput = document.getElementById("search")


const contacts = [];

let editingContactId = null;

searchInput.addEventListener("input", () => {
    displayContacts();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (editingContactId === null) {
        const contact = {
            id: Date.now(),
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            phone: phoneInput.value,
            email: emailInput.value
        };

        contacts.push(contact);

    } else {

        const contact = contacts.find(
            contact => contact.id === editingContactId
        );
        contact.firstName = firstNameInput.value;
        contact.lastName = lastNameInput.value;
        contact.phone = phoneInput.value;
        contact.email = emailInput.value;

        editingContactId = null;
    }

    displayContacts();
    form.reset();
});

function displayContacts() {
    contactList.innerHTML = "";

    const search = searchInput.value.toLowerCase();

    const filteredContacts = contacts.filter(contact =>
        contact.firstName.toLowerCase().includes(search) || contact.lastName.toLowerCase().includes(search));

    filteredContacts.forEach((contact) => {

        const card = document.createElement("div");
        card.className = "contact";

        card.dataset.id = contact.id;

        const name = document.createElement("h3");
        name.textContent = contact.firstName + " " + contact.lastName;

        const phone = document.createElement("p");
        phone.textContent = contact.phone;

        const email = document.createElement("p");
        email.textContent = contact.email;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        const editButton = document.createElement("button");
        editButton.className = "edit-btn";
        editButton.textContent = "Edit";

        card.appendChild(name);
        card.appendChild(phone);
        card.appendChild(email);
        card.appendChild(deleteButton);
        card.appendChild(editButton);

        contactList.appendChild(card);

    });
}
contactList.addEventListener("click", (event) => {
    const card = event.target.closest(".contact");

    if (!card) {
        return;
    }

    const id = Number(card.dataset.id);

    if (event.target.closest(".delete-btn")) {
        const index = contacts.findIndex(
            contact => contact.id === id
        );

        if (index !== -1) {
            contact.splice(index, 1);
            displayContacts();
        }
    }

    if (event.target.closest(".edit-btn")) {
        const contact = contacts.find(
            contact => contact.id === id
        );

        firstNameInput.value = contact.firstName;
        lastNameInput.value = contact.lastName;
        phoneInput.value = contact.phone;
        emailInput.value = contact.email;
        editingContactId = contact.id;
    }
});


