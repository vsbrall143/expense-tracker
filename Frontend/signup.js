async function signupForm(event) {
    event.preventDefault();
    console.log("Form submission started");

    const userDetails = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    try {
        const res = await axios.post(`http://localhost:2000/user/signup`, userDetails);
        console.log(res);
        alert("Signup successful!");
    } catch (error) {
        if (error.response && error.response.data) {
            // Display the error message from the server
            alert(error.response.data.message);
        } else {
            // Generic error message for unexpected errors
            alert("An error occurred during signup. Please try again.");
        }
        console.error("Error during signup:", error);
    }
}
