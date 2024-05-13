import axios from "axios";
import Cookies from 'js-cookie'

export async function getApiData({ endPoint }: { endPoint: any }) {
    try {
        let token:any = Cookies.get('token');
        // If token doesn't exist, attempt registration and login
        if (!token) {
            // Capture registration data from a form (example)
            const registerData = {
                name: 'John Please',
                email: 'please@email.com',
                password: 'password123',
                c_password: 'password123', // Confirmation password
            };

            // Register a new user
            const registerResponse = await axios.post(process.env.NEXT_PUBLIC_ENDPOINT_API + 'register', registerData);

            // Extract email and password from registration data
            const { email, password } = registerData;
            console.log("bismillah:,",registerResponse)
            // Login with the registered credentials
            const loginResponse = await axios.post(process.env.NEXT_PUBLIC_ENDPOINT_API + 'login', { email, password });

            // Obtain token from login response
            token = loginResponse.data.token;

            // Save token to cookie
            Cookies.set('token', token);
        }

        // Make request to protected route with token
        const response = await axios.get(process.env.NEXT_PUBLIC_ENDPOINT_API + endPoint, {
            withCredentials: true, // Send cookies along with the request
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error in API request:", error);
        throw error;
    }}

export async function postApiData({ endPoint, dataBody }: { endPoint: string; dataBody: any }) {
  try {
    const token = Cookies.get('token'); // Retrieve token from cookie
    const response = await axios.post(
        process.env.NEXT_PUBLIC_ENDPOINT_API + endPoint,
        dataBody,
        {
          headers: {
            'X-XSRF-TOKEN': Cookies.get('csrf_token'), // Include CSRF token from cookie
            Authorization: `Bearer ${token}`, // Include Bearer token retrieved from cookie
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // Enable sending cookies with the request
        }
    );
    return response.data;
  } catch (error) {
    // Handle error, such as logging or displaying error messages
    console.error('Error in API request:', error);
    throw error; // Rethrow error to be caught by the calling function
  }
}
