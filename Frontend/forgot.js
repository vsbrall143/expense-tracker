// document.getElementById('forgotForm').addEventListener('submit', forgot);

function forgot() {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("hldjflksdjkfkl")
    const email = document.getElementById('forgot_email').value;

    if (!email) {
        alert("Please enter a valid email address.");
        return;
    }

    // Make an API call to handle the forgot email functionality
    axios.post('http://localhost:2000/password/forgotpassword', { email })
        .then(response => {
            alert("An email has been sent to your address if it exists in our system.");
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while processing your request.");
        });
}
document.querySelector("form").addEventListener("submit", forgot);