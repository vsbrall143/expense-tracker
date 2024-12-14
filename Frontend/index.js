// Get DOM elements
const dayElement = document.querySelector(".date .day");
const monthElement = document.querySelector(".date .month");
const yearElement = document.querySelector(".date .year");
const weekdayElement = document.querySelector(".date .weekday");
const formatdate = document.querySelector(".date .whole-date");
const form = document.getElementById('exampleForm');

// Add event listener for form submission
 
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(form); // Collect form data
    const inputType = formData.get('inputType'); // Get selected radio button value
    const inputValue1 = formData.get('inputValue1'); // Get input field value
    const inputValue2 = formData.get('inputValue2'); // Get input field value
    const date = document.getElementsByClassName('whole-date')[0].innerText;  // Get input field value

    const userDetails = {
      date: date,
      type:inputType,
      amount:inputValue1,
      description: inputValue2
    };
    console.log(userDetails);
 

    axios.post("http://localhost:2000/user/add-user", userDetails)
    .then((res) => {
      console.log(res);
      // Display the updated users list
      displayUsers();
    })
    .catch((err) => console.log(err));

    document.getElementById('inputValue1').value = '';
    document.getElementById('inputValue2').value = '';
});

 
// Function to display users on the page
function displayUsers() {
  // Get the user list element (ul) from the DOM
  const userList = document.getElementById('user-list');

  // Clear the existing list to avoid duplication
  userList.innerHTML = '';

  axios.get("http://localhost:2000/user/get-expenses")
    .then((res) => {
 
      for (let i = 0; i < res.data.allUsers.length; i++) {
        const user = res.data.allUsers[i];
        console.log(user);
        
        // Create a list item for each user
        const listItem = document.createElement('li');

        // Create a <div> element with a class name
        const div = document.createElement('div');
        div.className = 'container mt-5>'; // Replace 'your-class-name' with your desired class name
        div.textContent = `date: ${user.id}, type: ${user.type}, amount: ${user.amount}, description: ${user.description}`;
        
        // Append the <div> to the <li>
        listItem.appendChild(div);
        
        // Append the <li> to the userList
        userList.appendChild(listItem);
      }
    })
    .catch((err) => console.log(err));
}

// Initialize the users list display when the page loads
window.onload = displayUsers;
// displayUsers();


// dateInput.addEventListener('input', function() {
//   const selectedDate = dateInput.value;
//   console.log('Date input changed to:', selectedDate);
 
 
//     axios.post("http://localhost:2000/user/add-user", selectedDate)
//       .then((res) => {
//         console.log(res);
//         // Display the updated users list
//         displayUsers();
//       })
//       .catch((err) => console.log(err));
// });

// Add click event listener to the date container
 function handleDateInput() {
    // Programmatically trigger the date input's click event
 
    document.getElementById('dateInput').focus();
    // document.getElementById('dateInput').style="opacity: 1%";
}
// Update the container date when a new date is selected
dateInput.addEventListener("change", () => {
  const selectedDate = new Date(dateInput.value);

  const formattedDate = selectedDate.toLocaleString("default", {
    // weekday: "long", // Full weekday name
    day: "2-digit",  // Day in two-digit format
    month: "2-digit",   // Full month name
    year: "numeric", // Full year
  });

  const numericDate = parseInt(formattedDate.replace(/\//g, ''), 10);
  
  // Extract date components
  const day = selectedDate.getDate();
  const month = selectedDate.toLocaleString("default", { month: "long" });
  const year = selectedDate.getFullYear();
  const weekday = selectedDate.toLocaleString("default", { weekday: "long" });

  // Update container

  formatdate.textContent=numericDate;
  dayElement.textContent = day.toString().padStart(2, "0");
  monthElement.textContent = `${month},`;
  yearElement.textContent = year;
  weekdayElement.textContent = weekday;

 

  axios.get(`http://localhost:2000/user/get-expense/${numericDate}`)
    .then((res) => {
       
        const expense = res.data.expense;
        const userexpense = document.getElementById('userexpense');
        userexpense.innerHTML = '';
        // Create a list item for each user
        const listItem = document.createElement('li');

        // Create a <div> element with a class name
        const div = document.createElement('div');
        div.className = 'container mt-5>'; // Replace 'your-class-name' with your desired class name
        div.textContent = `date: ${expense.id}, type: ${expense.type}, amount: ${expense.amount}, description: ${expense.description}`;
    
        // Append the <div> to the <li>
        listItem.appendChild(div);
        // Append the <li> to the userList
        userexpense.appendChild(listItem);
    })
    .catch((err) => console.log(err));
});

// Optional: Add functionality to navigate dates
const prevDateBtn = document.getElementById("prevDate");
const nextDateBtn = document.getElementById("nextDate");

prevDateBtn.addEventListener("click", () => {
  adjustDate(-1);
});

nextDateBtn.addEventListener("click", () => {
  adjustDate(1);
});

function adjustDate(days) {
  const currentDate = new Date(dateInput.value || new Date());
  currentDate.setDate(currentDate.getDate() + days);
  dateInput.value = currentDate.toISOString().split("T")[0]; // Set the input value
  dateInput.dispatchEvent(new Event("change")); // Trigger the change event
}



 
 //-----------------------------------------------------------------------------------------------------------------------

 // Get elements
 const addButton = document.getElementById('addButton');
 const popupForm = document.getElementById('popupForm');
 const closePopup = document.getElementById('closePopup');

 // Open popup
 addButton.addEventListener('click', () => {
   popupForm.style.display = 'flex';
 });

 // Close popup
 closePopup.addEventListener('click', () => {
   popupForm.style.display = 'none';
 });

 // Close popup when clicking outside the form
 popupForm.addEventListener('click', (event) => {
   if (event.target === popupForm) {
     popupForm.style.display = 'none';
   }
 });


//-----------------------------------------------------------------------------------------------------------------------