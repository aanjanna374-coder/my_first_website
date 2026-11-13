const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const responseMessage = document.getElementById("responseMessage");
        const submitButton = contactForm.querySelector("button[type='submit']");
        const originalLabel = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        responseMessage.textContent = "";

        try {
            const response = await fetch("http://localhost:5000/contacts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: this.name.value,
                    email: this.email.value,
                    message: this.message.value
                })
            });

            if (!response.ok) throw new Error("Request failed");
            responseMessage.textContent = "Message sent successfully!";
            responseMessage.style.color = "#0f766e";
            this.reset();
        } catch (error) {
            responseMessage.textContent = "Unable to send right now. Please try again.";
            responseMessage.style.color = "#c0392b";
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalLabel;
        }
    });
}

function reportSubmitted(event) {
    event.preventDefault();
    const message = document.getElementById("successMessage");
    message.textContent = "Report received. Thank you for helping your community.";
    message.style.display = "block";
    event.target.reset();
}

function saveIncident() {
    const type = document.getElementById("type").value.trim();
    const details = document.getElementById("details").value.trim();
    const message = document.getElementById("incidentMessage");

    if (!type || !details) {
        message.textContent = "Please add an incident type and details.";
        message.style.display = "block";
        message.style.background = "#fff3df";
        message.style.color = "#a35a00";
        return;
    }

    const card = document.createElement("article");
    card.className = "card icon-card";
    card.innerHTML = `<div class="icon">&#9888;</div><h3>${type}</h3><p>${details}</p>`;
    document.getElementById("incidentList").prepend(card);
    message.textContent = "Incident added to the community feed.";
    message.style.display = "block";
    message.style.background = "#eef8f6";
    message.style.color = "#0b5d57";
    document.getElementById("type").value = "";
    document.getElementById("details").value = "";
}
