/* Chatbot */

const chatToggle = document.getElementById("chat-toggle");
const chatWindow = document.getElementById("chat-window");
const input = document.getElementById("user-input");
const msgDiv = document.getElementById("messages");

/* Toggle Chat */
chatToggle.addEventListener("click", function(){
    chatWindow.style.display =
    chatWindow.style.display === "flex" ? "none" : "flex";
});

/* Send Message */
input.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        const userMessage = input.value;

        if(userMessage.trim() === "") return;

        msgDiv.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;

        setTimeout(() => {

            msgDiv.innerHTML += `<p><strong>Bot:</strong> Thanks for the message! I'm a simple GitHub bot. You can connect me to AI later!</p>`;

            msgDiv.scrollTop = msgDiv.scrollHeight;

        },1000);

        input.value = "";
    }

});