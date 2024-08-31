const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserInfo = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/users/user`, {
        method: 'GET',
        credentials: 'include', // Ensure cookies are included in the request
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return { error: "Not valid", success: false, ok: false };
    }
  };
  


  export const verifyPassword = async (password: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/users/user/verify-password`, {
        method: 'POST',
        credentials: 'include', // Ensure cookies are included in the request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
  
     return response
    } catch (error) {
      console.error('Error verifying password:', error);
      return { error: "Not valid", success: false, ok: false };
    }
  };
  
  export const updateUser = async (username: string, newPassword: string, mobileNumber: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/users/user/update-user`, {
        method: 'POST',
        credentials: 'include', // Ensure cookies are included in the request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, newPassword, mobileNumber }),
      });
  
      return response;
    } catch (error) {
      console.error('Error updating user:', error);
      return { error: "Not valid", success: false, ok: false };
    }
  };
  
  export const addUser = async (username: string, password: string,mobileNumber:string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/users/user/add-user`, {
        method: 'POST',
        credentials: 'include', // Ensure cookies are included in the request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password ,mobileNumber}),
      });
  
      
  
      
      return response;
    } catch (error) {
      console.error('Error adding user:', error);
      return { error: "Not valid", success: false, ok: false };
    }
  };
  
  export const getAllUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/users`, {
        method: 'GET',
        credentials: 'include', // Ensure cookies are included in the request
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
  
      const data =await response.json()
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return { error: "Not valid", success: false, ok: false };
    }
  };
  

export const logOut=async()=>{
    try {
        const response = await fetch(`${API_URL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include', // Ensure cookies are included in the request
          });
          return response
    } catch (error) {
        return {error:"not vaild",success:false,ok:false,}
    }
}

export const DeleteUser = async (userId:string) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/users/user?userId=${userId}`, {
      method: 'DELETE',

      credentials: 'include', // Ensure cookies are included in the request
      headers: {
        'Content-Type': 'application/json',
      },
     
    });

    

    
    return response;
  } catch (error) {
    console.error('Error adding user:', error);
    return { error: "Not valid", success: false, ok: false };
  }
};