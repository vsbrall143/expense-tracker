// Get DOM elements
const dayElement = document.querySelector(".date .day");
const monthElement = document.querySelector(".date .month");
const yearElement = document.querySelector(".date .year");
const weekdayElement = document.querySelector(".date .weekday");
const formatdate = document.querySelector(".date .whole-date");
const form = document.getElementById('exampleForm');

// Add event listener for form submission
 
window.onload = function() {
  isPremium();
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
 
    const token= localStorage.getItem('token');
    axios.post("http://localhost:2000/user/add-user", userDetails,{headers:{"Authorization" : token}})
    .then((res) => {
      console.log(res);
      // Display the updated users list
      // displayUsers();
    })
    .catch((err) => console.log(err));

    document.getElementById('inputValue1').value = '';
    document.getElementById('inputValue2').value = '';

    

    const listItem = document.createElement("li");

    // Create a <div> element with a class name
    const div = document.createElement("div");
    div.id = "cont";
    div.textContent = `date: ${userDetails.day} ${userDetails.month} ${userDetails.year}`;
    const div2 = document.createElement("div");
    div2.textContent = ` credit: ${userDetails.credit}, debit: ${userDetails.debit}, description: ${userDetails.description}`;
    div2.className = "container mt-5>";
    div2.appendChild(div);
    listItem.appendChild(div2);

    // Append the <li> to the userexpense element
    document.getElementById('userexpense').appendChild(listItem);
});




  
function handleOnTap() {                             // this function opens the calender to take input when input calender is tapped in all pages
 
  document.getElementById('dateInput').focus();

}
 



async function handleMonthChange() {
  document.getElementById('month-list').innerHTML = '';
  const token= localStorage.getItem('token');
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
    const response = await axios.get(`http://localhost:2000/user/get-expenses/${month}/${year}` ,{headers:{"Authorization" : token}});
    const MonthList = document.getElementById('month-list');

 
    let credit = 0;  
    let debit = 0;
    response.data.users.forEach((expense) => {
      credit += Number(expense.credit) || 0; // Convert credit to a number, default to 0 if undefined/null
      debit += Number(expense.debit) || 0; // Convert debit to a number, default to 0 if undefined/null
    });
    let total = credit - debit;
 
    document.getElementById("amount").innerHTML=total;

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
  const token= localStorage.getItem('token');
  const selectedDate = new Date(dateInput.value);
  var year = selectedDate.getFullYear();

  // Check for invalid date and handle it (optional)
  if (isNaN(year)) {
    year = 2024; // Use default year
  }

  yearElement.textContent = year;

  try {
    const response = await axios.get(`http://localhost:2000/user/get-expenses/${year}`,{headers:{"Authorization" : token}});
    const YearList = document.getElementById('year-list');

    let credit = 0;  
    let debit = 0;
    response.data.users.forEach((expense) => {
      credit += Number(expense.credit) || 0; // Convert credit to a number, default to 0 if undefined/null
      debit += Number(expense.debit) || 0; // Convert debit to a number, default to 0 if undefined/null
    });
    let total = credit - debit;
    document.getElementById("amount").innerHTML=total;

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
  document.getElementById('userexpense').innerHTML = '';
  // Extract date components
  var day = selectedDate.getDate();
  var month = selectedDate.toLocaleString("default", { month: "long" });
  var year = selectedDate.getFullYear();
  const weekday = selectedDate.toLocaleString("default", { weekday: "long" });

  // Check for invalid date and handle it (optional)
  if (isNaN(year)) {
    day = 16;
    month = "February";
    year = 2024; // Use default values
  }

  dayElement.textContent = day;
  monthElement.textContent = `${month},`;
  yearElement.textContent = year;
  weekdayElement.textContent = weekday;
  month=monthElement.textContent;

  try {
    const token= localStorage.getItem('token');
    const response = await axios.get(`http://localhost:2000/user/get-expense/${day}/${month}/${year}`,{headers:{"Authorization" : token}});
    
    const expenses = response.data.expenses; // Assumes the API response contains an array of expenses
    const userexpense = document.getElementById("userexpense");
    expensesTillDay = response.data.expensesTillDay;
 
    userexpense.innerHTML = "";
    let credit = 0;
    let debit = 0;
    // Ensure credit and debit are treated as numbers
    expensesTillDay.forEach((expense) => {
      credit += Number(expense.credit) || 0; // Convert credit to a number, default to 0 if undefined/null
      debit += Number(expense.debit) || 0; // Convert debit to a number, default to 0 if undefined/null
    });
    let total = credit - debit;
    // console.log(total);
    // console.log("hello")
    document.getElementById("amount").innerHTML=total;
    // Loop through each expense and create a list item
    expenses.forEach((user) => {
      // Create a list item
      const listItem = document.createElement("li");

      // Create a <div> element with a class name
      const div = document.createElement("div");
      div.id = "cont";
      div.textContent = `date: ${user.day} ${user.month} ${user.year}`;
      const div2 = document.createElement("div");
      div2.textContent = ` credit: ${user.credit}, debit: ${user.debit}, description: ${user.description}`;
      div2.className = "container mt-5>";
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
document.getElementById('rzp-button1').onclick = async function (e) {
 
  try {
  
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.get(`http://localhost:2000/purchase/premiummembership`, {headers: { "Authorization": token }});

      console.log(response);

      var options = {
          "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
          "order_id": response.data.order.id, // For one-time payment
          "handler": async function (response) {
              try {
                  await axios.post(`http://localhost:2000/purchase/updatetransactionstatus`, {
                      order_id: options.order_id,
                      payment_id: response.razorpay_payment_id,
                  }, { headers: { "Authorization": token } });

                  alert('You are a Premium User Now');
                  localStorage.setItem('token',res.data.token)
                  document.getElementById("rzp-button1").style.display = "none";
                  document.getElementById("button-holder").style.display = "block";

              } catch (error) {
                  console.error("Error updating transaction status:", error);
                  alert('Transaction Failed. Please try againnnnn.');
              }
          },
          "theme": {
              "color": "#3399cc"
          }
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
      e.preventDefault();

  } catch (error) {
      console.error("Error during payment process:", error);
      alert('Something went wrong. Please try again.');
  }
};


async function isPremium() {

  const token = localStorage.getItem('token');
  const response = await axios.get(`http://localhost:2000/purchase/isPremium`, {headers: { "Authorization": token }});
 
  console.log(response.data.isPremium);
  if(response.data.isPremium){
    document.getElementById("rzp-button1").style.display = "none";
    document.getElementById("button-holder").style.display = "block";
  }else{
    document.getElementById("rzp-button1").style.display = "block";
  }

}


async function leaderboard() {

  const token = localStorage.getItem('token');
  const response = await axios.get(`http://localhost:2000/purchase/leaderboard`, {headers: { "Authorization": token }});
 
  console.log(response.data);

  const leaderboard = response.data.leaderboard;
  const leaderboardList = document.getElementById('leaderboardScore');

  // Clear any existing content in the list
  leaderboardList.innerHTML = '';

  // Add each user as a list item
  leaderboard.forEach(user => {
      const listItem = document.createElement('li');
      listItem.textContent = `${user.username}  -  ${user.email} - Total Expenses: ₹${user.total}`;
      leaderboardList.appendChild(listItem);
  });
}


