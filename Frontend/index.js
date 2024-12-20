// Get DOM elements
const dayElement = document.querySelector(".date .day");
const monthElement = document.querySelector(".date .month");
const yearElement = document.querySelector(".date .year");
const weekdayElement = document.querySelector(".date .weekday");
const formatdate = document.querySelector(".date .whole-date");
const form = document.getElementById('exampleForm');

// Add event listener for form submission
 
window.onload = function() {
  handleMonthChange();
  handleYearChange();
  handleDateChange() 
}



 
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(form); // Collect form data
    const inputType = formData.get('inputType'); // Get selected radio button value
    const inputValue1 = formData.get('inputValue1'); // Get input field value
    const inputValue2 = formData.get('inputValue2'); // Get input field value
    // const date = document.getElementsByClassName('whole-date')[0].innerText;  // Get input field value
    const day = document.getElementsByClassName('day')[0].innerText;
    const month = document.getElementsByClassName('month')[0].innerText;
    const year = document.getElementsByClassName('year')[0].innerText;
    var credit=0;
    var debit=0;
    if(inputType==='credit'){

      credit = inputValue1;
      console.log(credit);
    }
    else{

      debit = inputValue1;
      console.log(debit);
    }
    const userDetails = {
 
      day: day,
      month: month,
      year: year,
      credit: credit,
      debit: debit,
      description: inputValue2
    };
    console.log(userDetails);
 

    axios.post("http://localhost:2000/user/add-user", userDetails)
    .then((res) => {
      console.log(res);
      // Display the updated users list
      // displayUsers();
    })
    .catch((err) => console.log(err));

    document.getElementById('inputValue1').value = '';
    document.getElementById('inputValue2').value = '';
});




  
function handleOnTap() {                             // this function opens the calender to take input when input calender is tapped in all pages
 
  document.getElementById('dateInput').focus();

}
 



async function handleMonthChange() {
  document.getElementById('month-list').innerHTML = '';

  const selectedDate = new Date(dateInput.value);
  var month = selectedDate.toLocaleString("default", { month: "long" });
  var year = selectedDate.getFullYear();

  // Check for invalid date and handle it (optional)
  if (isNaN(year)) {
    month = "February";
    year = 2024; // Use default year
  }

  yearElement.textContent = year;
  monthElement.textContent = `${month},`;
  month=monthElement.textContent;

  try {
    const response = await axios.get(`http://localhost:2000/user/get-expenses/${month}/${year}`);
    const MonthList = document.getElementById('month-list');

    for (let i = 0; i < response.data.users.length; i++) {
      const user = response.data.users[i];

      // Create list item and populate content
      const listItem = document.createElement('li');
      const div = document.createElement('div');
      div.id = "cont";
      div.textContent = `date: ${user.day} ${user.month} ${user.year}`;
      const div2 = document.createElement('div');
      div2.textContent = ` credit: ${user.credit}, debit: ${user.debit}, description: ${user.description}`;
      div2.className = 'container mt-5>';
      div2.appendChild(div);
      listItem.appendChild(div2);

      // Append to the month list
      MonthList.appendChild(listItem);
    }
  } catch (err) {
    console.error(err); // Handle errors from the API call
  }
}
 
  


async function handleYearChange() {
  document.getElementById('year-list').innerHTML = '';

  const selectedDate = new Date(dateInput.value);
  var year = selectedDate.getFullYear();

  // Check for invalid date and handle it (optional)
  if (isNaN(year)) {
    year = 2024; // Use default year
  }

  yearElement.textContent = year;

  try {
    const response = await axios.get(`http://localhost:2000/user/get-expenses/${year}`);
    const YearList = document.getElementById('year-list');

    for (let i = 0; i < response.data.users.length; i++) {
      const user = response.data.users[i];

      // Create list item and populate content
      const listItem = document.createElement('li');
      const div = document.createElement('div');
      div.id = "cont";
      div.textContent = `date: ${user.day} ${user.month}`;
      const div2 = document.createElement('div');
      div2.textContent = ` credit: ${user.credit}, debit: ${user.debit}, description: ${user.description}`;
      div2.className = 'container mt-5>';
      div2.appendChild(div);
      listItem.appendChild(div2);

      // Append to the year list
      YearList.appendChild(listItem);
    }
  } catch (err) {
    console.error(err); // Handle errors from the API call
  }
}
 
 

async function handleDateChange() {
  const selectedDate = new Date(dateInput.value);

  // Extract date components
  var day = selectedDate.getDate();
  var month = selectedDate.toLocaleString("default", { month: "long" });
  var year = selectedDate.getFullYear();
  const weekday = selectedDate.toLocaleString("default", { weekday: "long" });

  // Check for invalid date and handle it (optional)
  if (isNaN(month)) {
    day = 16;
    month = "February";
    year = 2024; // Use default values
  }

  dayElement.textContent = day.toString().padStart(2, "0");
  monthElement.textContent = `${month},`;
  yearElement.textContent = year;
  weekdayElement.textContent = weekday;
  month=monthElement.textContent;

  try {
    const response = await axios.get(`http://localhost:2000/user/get-expense/${day}/${month}/${year}`);
    const expenses = response.data.expenses; // Assumes the API response contains an array of expenses
    const userexpense = document.getElementById('userexpense');

    // Clear previous content
    userexpense.innerHTML = '';

    // Loop through each expense and create a list item
    expenses.forEach((user) => {
      // Create a list item
      const listItem = document.createElement('li');

      // Create a <div> element with a class name
      const div = document.createElement('div');
      div.id = "cont";
      div.textContent = `date: ${user.day} ${user.month} ${user.year}`;
      const div2 = document.createElement('div');
      div2.textContent = ` credit: ${user.credit}, debit: ${user.debit}, description: ${user.description}`;
      div2.className = 'container mt-5>';
      div2.appendChild(div);
      listItem.appendChild(div2);

      // Append the <li> to the userexpense element
      userexpense.appendChild(listItem);
    });
  } catch (err) {
    console.error(err); // Handle errors from the API call
  }
}


//------------------------------------------------------------------------------------------------------------------

// Add functionality to navigate dates months years

function handleDateNavigation(days) {
  adjustDate(days);
}

function handleMonthNavigation(months) {
  adjustMonth(months);
}

function handleYearNavigation(years) {
  adjustYear(years);
}

function adjustDate(days) {
  const currentDate = new Date(dateInput.value || new Date());
  currentDate.setDate(currentDate.getDate() + days);
  dateInput.value = currentDate.toISOString().split("T")[0]; // Set the input value
  dateInput.dispatchEvent(new Event("change")); // Trigger the change event
}

function adjustMonth(months) {
  const currentDate = new Date(dateInput.value || new Date());
  currentDate.setMonth(currentDate.getMonth() + months);
  dateInput.value = currentDate.toISOString().split("T")[0]; // Set the input value
  dateInput.dispatchEvent(new Event("change")); // Trigger the change event
}

function adjustYear(years) {
  const currentDate = new Date(dateInput.value || new Date());
  currentDate.setFullYear(currentDate.getFullYear() + years);
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