# TrackOrder
# Order Management System

## Overview

The Order Management System is a web application that allows users to submit, edit, and delete orders for various food items. The application categorizes orders into three types: Desi, Chinese, and Italiano. It provides a user-friendly interface for managing orders and utilizes a RESTful API for data storage.

## Features

- **Add Orders**: Users can submit new orders by providing the item name, price, and type of cuisine.
- **Edit Orders**: Users can edit existing orders, including changing the item details and the type of cuisine. The order will automatically move to the appropriate category list based on the selected type.
- **Delete Orders**: Users can delete orders from the list, which will also remove them from the backend storage.
- **Responsive Design**: The application is designed to be responsive, ensuring a good user experience on both desktop and mobile devices.
- **Data Persistence**: Orders are stored using a RESTful API, ensuring that data persists even after refreshing the page.
- **Local Storage**: The application utilizes local storage to temporarily store order details for quick access.

## Technologies Used

- **HTML**: For structuring the web application.
- **CSS**: For styling the application, using Tailwind CSS for responsive design.
- **JavaScript**: For client-side logic and interaction.
- **Axios**: For making HTTP requests to the RESTful API.
- **RESTful API**: CRUD operations are performed using the [CrudCrud](https://crudcrud.com/) API for data storage.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, etc.)
- Internet connection (for accessing the API)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/order-management-system.git
   cd order-management-system
   ```

2. **Open the `index.html` file** in your web browser.

### Usage

1. **Adding an Order**:
   - Fill in the item name, price, and select the type of cuisine from the dropdown.
   - Click the "Submit" button to add the order to the appropriate list.

2. **Editing an Order**:
   - Click the edit button (✎) next to the order you want to modify.
   - Update the item details and select a new type of cuisine if needed.
   - Click the "Submit" button to save the changes.

3. **Deleting an Order**:
   - Click the delete button (X) next to the order you want to remove.

4. **Viewing Orders**:
   - Orders are displayed in categorized lists based on their type (Desi, Chinese, Italiano).

## API Endpoints

- **Create Order**: `POST https://crudcrud.com/api/990b6100fc2e45ac8f823e5481105060/myData`
- **Read Orders**: `GET https://crudcrud.com/api/990b6100fc2e45ac8f823e5481105060/myData`
- **Update Order**: `PUT https://crudcrud.com/api/990b6100fc2e45ac8f823e5481105060/myData/{id}`
- **Delete Order**: `DELETE https://crudcrud.com/api/990b6100fc2e45ac8f823e5481105060/myData/{id}`

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the Apache-2.0 License - see the [Apache-2.0](LICENSE) file for details.

## Acknowledgments

- Thanks to [CrudCrud](https://crudcrud.com/) for providing a simple API for data storage.
- Thanks to the open-source community for the tools and libraries used in this project.

