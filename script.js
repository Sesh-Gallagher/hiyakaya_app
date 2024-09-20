let bookingDetails = {};

document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            showConfirmationPopup();
        }
    });
});

function validateForm() {
    // Add validation logic here
    // Return true if all fields are filled, false otherwise
    return true;
}

function showConfirmationPopup() {
    const confirmed = confirm("Are you sure you want to book this ticket? Please confirm your booking details.");
    
    if (confirmed) {
        // Collect booking details
        bookingDetails = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            amount: calculateAmount() // Implement this function to calculate the total amount
        };
        
        // Initiate Paystack payment
        initiatePaystackPayment();
    }
}

function initiatePaystackPayment() {
    let handler = PaystackPop.setup({
        key: 'YOUR_PAYSTACK_PUBLIC_KEY', // Replace with your actual Paystack public key
        email: bookingDetails.email,
        amount: bookingDetails.amount * 100, // Paystack expects amount in kobo
        currency: 'NGN', // or your preferred currency
        ref: 'TRN'+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference
        callback: function(response) {
            // This function is called when the payment is successful
            alert('Payment complete! Reference: ' + response.reference);
            document.getElementById('bookingForm').submit();
        },
        onClose: function() {
            alert('Transaction was not completed, window closed.');
        }
    });
    handler.openIframe();
}

function calculateAmount() {
    // Implement logic to calculate the total amount based on selected options
    // This is a placeholder function
    return 5000; // Example: 5000 NGN
}
function fetchCustomerData() {
    // Fetch customer data from the server and populate the table
    // This is a placeholder and should be replaced with actual API call
    const customerData = [
        { id: 1, fullName: 'John Doe', phoneNumber: '1234567890', idNumber: 'ID123456' },
        { id: 2, fullName: 'Jane Smith', phoneNumber: '0987654321', idNumber: 'ID789012' }
    ];

    const tableBody = document.getElementById('customerTable');
    tableBody.innerHTML = '';

    customerData.forEach(customer => {
        const row = `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.fullName}</td>
                <td>${customer.phoneNumber}</td>
                <td>${customer.idNumber}</td>
                <td>
                    <button class="btn btn-sm btn-info">Edit</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function addCustomer() {
    // Implement add customer functionality
    console.log('Add customer');
}

function editCustomer() {
    // Implement edit customer functionality
    console.log('Edit customer');
}

function deleteCustomer() {
    // Implement delete customer functionality
    console.log('Delete customer');
}