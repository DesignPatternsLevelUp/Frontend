

export const isAuthenticated = async () => {
  const accessToken = sessionStorage.getItem('accessToken');
  if (accessToken){
    let response = await fetch(`https://stockexchange.auth.eu-west-1.amazoncognito.com/oauth2/userInfo`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    return response.status == 200

  }else{
    return false
  }

}

export const setAccessToken = async (code:any, navigate:any) => {
  if (!await isAuthenticated() && code) {
    sessionStorage.setItem('accessToken', code);
    navigate('/company');
  } else{
  console.log('failed to set access token');
  navigate('') ;
  }
}

export const getUserDetails = async () =>{

  const accessToken = sessionStorage.getItem('accessToken');
  if (await isAuthenticated() ){
    let response = await fetch(`https://stockexchange.auth.eu-west-1.amazoncognito.com/oauth2/userInfo`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    return response.json()

  }else{
    return {
      message: 'user is not authenticated'
    }
  }

}