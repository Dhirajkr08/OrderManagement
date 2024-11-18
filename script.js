document.addEventListener("DOMContentLoaded", loadData);

const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

async function handleSubmit(e) {
    e.preventDefault();

    try {
        // Create orderDetails object correctly
        let orderDetails = {
            item: document.getElementById('item').value,
            price: parseFloat(document.getElementById('price').value), // Ensure price is a number
            option: document.getElementById('options').value,
        };

        let list; // This is the list where items will be displayed
        switch (orderDetails.option) {
            case 'desi':
                list = document.getElementById('option1order');
                break;
            case 'chinese':
                list = document.getElementById('option2order');
                break;
            case 'italiano':
                list = document.getElementById('option3order');
                break;
            default:
                console.error('Error: selecting wrong option');
                return;
        }

        if (!list) {
            console.error('List not found');
            return;
        }

        // Check if all fields are filled
        if (orderDetails.item && !isNaN(orderDetails.price) && orderDetails.option) {
            // Store data using axios with await
            const res = await axios.post('https://crudcrud.com/api/990b6100fc2e45ac8f823e5481105060/myData', orderDetails);
            console.log('Data successfully submitted', res.data);
            const userId = res.data._id;

            // Store data in local storage
            localStorage.setItem(userId, JSON.stringify(orderDetails));

            // Display data on UI
            DisplayData(list, orderDetails, userId);
            
            // Clear input fields after submission
            document.getElementById('item').value = '';
            document.getElementById('price').value = '';
            document.getElementById('options').value = '';
        } else {
            console.error('Error in posting: All fields are required and price must be a valid number.');
        }
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

async function DisplayData(list, orderDetails, userId) {
    try {
        // Create a new list item
        let listItem = document.createElement('li');
        listItem.className = "bg-pink-100 shadow-lg p-4 rounded-lg text-black list-item"; // Add list-item class
        listItem.innerHTML = `
            <div class="flex-grow">🍽 : ${orderDetails.item}, ₹ : ${orderDetails.price}<br>${orderDetails.option}</div>
            <div>
                <button type="button" class="edit text-white bg-green-300 p-2 rounded-lg">✎</button>
                <button type="button" class="del bg-red-500 rounded-lg p-2 ml-1">X</button>
            </div>
        `;

        // Append the new list item to the appropriate list
        list.appendChild(listItem);

        // Add event listeners for the delete and edit buttons
        listItem.querySelector('.del').addEventListener('click', () => deleteItem(userId, listItem));
        listItem.querySelector('.edit').addEventListener('click', () => editFunction(userId, orderDetails, listItem));
    } catch (err) {
        console.log('Something went wrong in display Data', err);
    }
}

async function editFunction(userId, orderDetails, listItem) {
    try {
        // Populate the form with the current values for editing
        document.getElementById("item").value = orderDetails.item;
        document.getElementById('price').value = orderDetails.price;
        document.getElementById('options').value = orderDetails.option;

        const submitBtn = document.getElementById("submit");
        submitBtn.removeEventListener('click', handleSubmit); // Remove the original submit handler

        submitBtn.addEventListener("click", async function editExpenseDetails(e) {
            e.preventDefault();
            const editOrderDetails = {
                item: document.getElementById("item").value,
                price: parseFloat(document.getElementById("price").value),
                option: document.getElementById("options").value,
            };

            if (editOrderDetails.item && !isNaN(editOrderDetails.price) && editOrderDetails.option) {
                let res = await axios.put(`https://crudcrud.com/api/990b6100fc2e45ac8f823e5481105060/myData/${userId}`, editOrderDetails);
                console.log(res.data);

                // Remove the item from the current list
                listItem.remove();

                // Determine the correct list based on the new option
                let newList;
                switch (editOrderDetails.option) {
                    case 'desi':
                        newList = document.getElementById('option1order');
                        break;
                    case 'chinese':
                        newList = document.getElementById('option2order');
                        break;
                    case 'italiano':
                        newList = document.getElementById('option3order');
                        break;
                    default:
                        console.error('Error: selecting wrong option');
                        return;
                }

                // Create a new list item
                let newListItem = document.createElement('li');
                newListItem.className = "bg-pink-100 shadow-lg p-4 rounded-lg text-black list-item"; // Add list-item class
                newListItem.innerHTML = `
                    <div class="flex-grow">🍽 : ${editOrderDetails.item}, ₹ : ${editOrderDetails.price}<br>${editOrderDetails.option}</div>
                    <div>
                        <button type="button" class="edit text-white bg-green-300 p-2 rounded-lg">✎</button>
                        <button type="button" class="del bg-red-500 rounded-lg p-2 ml-1">X</button>
                    </div>
                `;

                // Append the new list item to the appropriate list
                newList.appendChild(newListItem);

                // Update local storage
                localStorage.setItem(userId, JSON.stringify(editOrderDetails));

                // Clear the input fields after editing
                document.getElementById("item").value = '';
                document.getElementById('price').value = '';
                document.getElementById('options').value = '';

                // Re-add event listeners for the new buttons
                newListItem.querySelector('.del').addEventListener('click', () => deleteItem(userId, newListItem));
                newListItem.querySelector('.edit').addEventListener('click', () => editFunction(userId, editOrderDetails, newListItem));

                submitBtn.removeEventListener('click', editExpenseDetails); // Remove the edit handler
                submitBtn.addEventListener("click", handleSubmit); // Re-add the original submit handler
            } else {
                console.log("Error in edit: All fields are required and price must be a valid number.");
            }
        });
    } catch (err) {
        console.log(err);
    }
}

async function deleteItem(userId, listItem) {
    try {
        await axios.delete(`https://crudcrud.com/api/990b6100fc2e45ac8f823e5481105060/myData/${userId}`);
        listItem.remove(); // Remove the list item from the UI
    } catch (err) {
        console.error('Error deleting item:', err);
    }
}

async function loadData() {
    try {
        const res = await axios.get('https://crudcrud.com/api/990b6100fc2e45ac8f823e5481105060/myData');
        res.data.forEach(order => {
            const orderDetails = {
                item: order.item,
                price: order.price,
                option: order.option
            };
            // Determine the correct list based on the option
            let list;
            switch (orderDetails.option) {
                case 'desi':
                    list = document.getElementById('option1order');
                    break;
                case 'chinese':
                    list = document.getElementById('option2order');
                    break;
                case 'italiano':
                    list = document.getElementById('option3order');
                    break;
                default:
                    console.error('Error: selecting wrong option');
                    return;
            }
            // Display the data
            DisplayData(list, orderDetails, order._id);
        });
    } catch (err) {
        console.error('Error loading data:', err);
    }
}