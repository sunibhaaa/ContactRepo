const form = document.getElementById("contact-form");

const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email")

const contactList = document.getElementById("contact-list")
const searchInput = document.getElementById("search")


const contacts = [];

searchInput.addEventListener("input", () => {
    displayContacts();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();



    const contact = {
        id: Date.now(),
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        phone: phoneInput.value,
        email: emailInput.value
    };

    console.log(contact);

    contacts.push(contact);
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

        card.appendChild(name);
        card.appendChild(phone);
        card.appendChild(email);
        card.appendChild(deleteButton);

        contactList.appendChild(card);

    });
}
contactList.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".delete-btn");

    if (!deleteButton) {
        return;
    }

    const card = deleteButton.closest(".contact");
    const id = Number(card.dataset.id);
    const index = contacts.findIndex(contact => contact.id === id);

    if (index !== -1) {
        contacts.splice(index, 1);
        displayContacts();
    }
})


