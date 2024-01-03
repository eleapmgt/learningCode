// INSTRUCTIONS - PLEASE READ!!
// Here are some challenges. Solve them from top to bottom

// Ex 1. Read what's written in the email input
//       Make the function getEmail() return it
const getEmail = () => {
  return document.getElementById("email").value;
}

// Ex 2. Change the content of the email input by writing your own email address
const emailInput = document.getElementById("email");
emailInput.value = "elea.pimouguet@gmail.com";

// Ex 3. Replace the email hint (next to the input) with 'This is my email now'
//       The text should be emphasized using a <strong> tag
const emailHint = document.getElementById("email-hint");
emailHint.innerHTML = "<strong>This is my email now</strong>";

// Ex 4. Add the .blue CSS class to the th elements
document.querySelectorAll("th").forEach((element) => {
  element.classList.add("blue");
});

// Ex 5. Count the number of table body rows there are
//       Make the function teamCount() return it
const teamCount = () => {
  // TODO: return the number of teams
  return document.querySelectorAll("tbody tr").length;
};

// Ex 6. Say there is a 15th team added to the table.
//       Add a row at the bottom, this new team should have zero points.
const tbody = document.querySelector(".table tbody");
tbody.insertAdjacentElement("beforeend", "<tr><td>15</td><td>Le Wagon</td><td>0</td></tr>");

// Ex 7. Write some code to sum all points given to all teams
//       Make the function summarizePoints() return it
const summarizePoints = () => {
  // TODO: return the sum
  let sum = 0;
  document.querySelectorAll("tbody tr td:last-child").forEach((element) => {
    sum += Number.parseInt(element.innerText, 10);
  });
  return sum;
};

// Ex 8. Change the background color of all `<th>` cells to #DDF4FF
document.querySelectorAll("th").forEach((element) => {
  element.style.backgroundColor = "#DDF4FF";
});

// Ex 9. Remove the "Email:" label from the DOM
document.querySelector("label").remove();
