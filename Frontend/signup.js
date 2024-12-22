async function signupForm(event) {

    event.preventDefault();
    console.log("hellollkll")
    const userDetails = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    try {
        const res = await axios.post(`http://localhost:2000/user/signup`, userDetails);
        console.log(res);
        alert("Signup successful!");
    } catch (err) {
        console.error(err);
        alert("An error occurred during signup.");
    }
}



// async function signupForm(event) {

//     event.preventDefault();
//     console.log("hellollkll")
//     const userDetails = {
//         username: document.getElementById("username").value,
//         email: document.getElementById("email").value,
//         password: document.getElementById("password").value,
//     };
//     year=2024;

//     console.log(userDetails);
//     try {
//         const res = await axios.get(`http://localhost:2000/user/signup`,userDetails)
//         console.log(res);
//         alert("Signup successful!");
//     } catch (err) {
//         console.error(err);
//         alert("errr");
//     }
// }
