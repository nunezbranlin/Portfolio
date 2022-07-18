var listItemCounter = 0; // use to keep count of items

/** This function will be run when the submit button is pressed
    Function: Take the text which is entered in the input box and
    add it to the todo list UL.
    If the input box is empty it will instead show the error message
    by changing the hidden attribute from true to false.
    At the start of the function it will hide the error message.
**/
function submit_button() {
  var error_display = document.getElementById("error-message"); // Grab the element which holds the error message
  error_display.hidden = true; // make the error message hidden again by changing the value to true
  var source_text = document.getElementById("item-text"); // grab the text input element
  var to_do_list = document.getElementById("to-do-items"); // grab the todo list UL
  var new_item = document.createElement("li"); // Create a new LI which will later be used to add items to the todo list
  if (source_text.value != "") {
    // Check if the value in the input field is empty
    new_item.id = "list-item-" + listItemCounter++;
    var deleteButton =
      '<span class="clear">&nbsp;<a href="#" onClick="delete_item(\'' +
      new_item.id +
      "')\">X</a></span>"; // This will add a delete button to the todo list item
    //new_item.appendChild(document.createTextNode(source_text.value)); // grab the value from the text input and create a text node in the LI we created earlier
    new_item.innerHTML =
      '<span class="text"><a href="#" onClick="toggle_strike(\'' +
      new_item.id +
      "')\">" +
      source_text.value +
      "</a></span>"; // This will add the text to the item as well as add the ability to strike through the item on the list
    new_item.innerHTML += deleteButton; // Add the delete button on to the todo list item
    to_do_list.appendChild(new_item); // add the LI we created and add it to the todo list UL
    source_text.value = ""; // Set the input text box to empty
  } else {
    error_display.hidden = false; // if the input field was empty show the error message
  }
  Save();
}

function delete_item(id) {
  // this will remove an item from the list
  document.getElementById(id).remove();
  Save();
}
                             
function toggle_strike(id) {
  // This will toggle a strike through on a todo list item
  if (document.getElementById(id).classList.contains("strike")) {
    document.getElementById(id).classList.remove("strike"); // Remove the strike to the todo list item
  } else {
    document.getElementById(id).classList.add("strike"); // Add the strike to the todo list item
  }
  Save();
}

var to_do_list = document.getElementById("to-do-items");

function Save() {
  localStorage.setItem("data", to_do_list.innerHTML);
  if (to_do_list.innerHTML == "") {
    localStorage.setItem("count", 0);
  } else {
    localStorage.setItem("count", listItemCounter);
  }
}
function load() {
  if (localStorage.getItem("count") > 0) {
    listItemCounter = localStorage.getItem("count");
    to_do_list.innerHTML = localStorage.getItem("data");
  }
}
load();
