// 1. Authenticate user and get a bearer token
async function authenticateUser(username, password) {
    const authEndpoint = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp';
    // const credentials = {
    //     login_id: 'test@sunbasedata.com',
    //     password: 'Test@123'
    // };

    const credentials = {
        login_id: username,
        password: password
    };

    try {
        const response = await fetch(authEndpoint, {
            method: 'POST',
            body: JSON.stringify(credentials)
        });

        if (response.status === 200) {
            const data = await response.json();
            const bearerToken = data.access_token; // Extract the bearer token
            console.log('Bearer token:', bearerToken);
            return bearerToken;
        } else {
            console.error('Authentication failed');
            return null;
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        return null;
    }
}

// 2. Create a new customer
async function createCustomer(bearerToken, customerData) {
    const createCustomerEndpoint = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';

    try {
        const response = await fetch(createCustomerEndpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        });

        if (response.status === 201) {
            console.log('Customer created successfully');
        } else if (response.status === 400) {
            console.error('First Name or Last Name is missing');
        } else {
            console.error('Failed to create customer');
        }
    } catch (error) {
        console.error('Error creating customer:', error);
    }
}

// 3. Get customer list
async function getCustomerList(bearerToken) {
    const getCustomerListEndpoint = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list';

    try {
        const response = await fetch(getCustomerListEndpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            }
        });

        if (response.status === 200) {
            const customerList = await response.json();
            console.log('Customer list:', customerList);
        } else {
            console.error('Failed to retrieve customer list');
        }
    } catch (error) {
        console.error('Error getting customer list:', error);
    }
}

// Function to delete a customer
async function deleteCustomer(bearerToken, uuid) {
    const deleteCustomerUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
    const deleteData = {
      cmd: 'delete',
      uuid: uuid,
    };
  
    const response = await fetch(deleteCustomerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(deleteData),
    });
  
    if (response.ok) {
      console.log('Customer deleted successfully');
    } else {
      console.error('Failed to delete customer:', response.status);
    }
  }
  
  // Function to update a customer
  async function updateCustomer(bearerToken, uuid, updateData) {
    const updateCustomerUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
  
    const response = await fetch(updateCustomerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(updateData),
    });
  
    if (response.ok) {
      console.log('Customer updated successfully');
    } else {
      console.error('Failed to update customer:', response.status);
    }
  }
