import * as React from "react";
import { PublicClientApplication } from '@azure/msal-browser';
import Cookies from 'js-cookie';
import "./Hello.css";
import '../../../../styles/tailwind.css';

const getaccessToken = async () => {
  const msalConfig = {
    auth: {
      clientId: 'e396fcaa-6806-4753-9fca-b69e3e38fe1b',
      authority: 'https://login.microsoftonline.com/3c90a2ff-691c-483a-8e94-fbca1b7d4edf',
    },
  };
  const pca = new PublicClientApplication(msalConfig);

  const request = {
    scopes: ["User.Read", "Sites.ReadWrite.All"]
  };

  try {
    let accessToken = Cookies.get('accessToken');
    console.log(accessToken);

    if (!accessToken) {
      const response = await pca.loginPopup(request);
      console.log(response);
      accessToken = response.accessToken;
      const expirationTime = new Date(response.expiresOn);
      Cookies.set('accessToken', accessToken, { expires: expirationTime });
    }
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error; // Re-throw to handle in the calling function
  }
}

const Hello = (props) => {
  const [data, setData] = React.useState([]);

  const getlist = async () => {
    console.log("You have clicked login");

    try {
      let accessToken = await getaccessToken();
      console.log(accessToken);

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const graphResponse = await fetch("https://graph.microsoft.com/v1.0/sites/xrmlabs.sharepoint.com,ab7af37d-d7b0-4048-a10a-4265b37ae978,310d0329-87da-41d7-8aff-8972808b2167/lists/f0e7d4ea-90b2-43b0-9cd4-2269178b5b0a/items?expand=fields", requestOptions);

      if (!graphResponse.ok) {
        throw new Error(`HTTP error! Status: ${graphResponse.status}`);
      }

      const result = await graphResponse.json();
      console.log("Graph API Response:", result);
      console.log(result.value);
      setData(result.value);

    } catch (error) {
      console.error('Error authenticating or fetching data:', error);
    }
  };

  const create = async ()=>{
    console.log('you have clicked create');
    try {

      let accessToken = await getaccessToken();
      console.log(accessToken);

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          fields: {
       
            Title: "Priyank 1223",
            Location: "New Location",
            Activities: "New Activities",
            Rating: 5
          }
        })
      };

      const graphresponse = await fetch('https://graph.microsoft.com/v1.0/sites/xrmlabs.sharepoint.com,ab7af37d-d7b0-4048-a10a-4265b37ae978,310d0329-87da-41d7-8aff-8972808b2167/lists/f0e7d4ea-90b2-43b0-9cd4-2269178b5b0a/items',requestOptions)
      if(graphresponse.ok){
        alert(`Item Created with ID ${graphresponse.id}`)
      }

    } catch (error) {
      
    }
  }

  const update = async (ID)=>{
    console.log('you have clicked create');
    try {

      let accessToken = await getaccessToken();
      console.log(accessToken);

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: JSON.stringify({
          
       
            Title: "SharePoint KT Session",
           
          
        })
      };

      const graphresponse = await fetch(`https://graph.microsoft.com/v1.0/sites/xrmlabs.sharepoint.com,ab7af37d-d7b0-4048-a10a-4265b37ae978,310d0329-87da-41d7-8aff-8972808b2167/lists/f0e7d4ea-90b2-43b0-9cd4-2269178b5b0a/items/${ID}/fields`,requestOptions)
      if(graphresponse.ok){
        alert(`Item Updated with ID ${ID}`)
      }

    } catch (error) {
      
    }
  }

  const Delete = async (ID)=>{
    const accessToken = getaccessToken();

    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    const graphResponse = await fetch(`https://graph.microsoft.com/v1.0/sites/xrmlabs.sharepoint.com,ab7af37d-d7b0-4048-a10a-4265b37ae978,310d0329-87da-41d7-8aff-8972808b2167/lists/f0e7d4ea-90b2-43b0-9cd4-2269178b5b0a/items/${ID}`, requestOptions);

    if(graphResponse.ok){
      alert(`Item with ID ${ID} is deleted successfully`);
    }
    } catch (error) {
      console.log(error)
    }
  } 

  return (
    <>
      <div className="flex flex-row justify-around w-full mb-4">
        <button className='bg-red-700 rounded-md p-2 text-white' onClick={() => getlist()}>
          Get List
        </button>
        <button className='bg-blue-700 rounded-md p-2 text-white' onClick={()=>create()}>
          Create
        </button>
        <button className='bg-yellow-300 rounded-md p-2 text-white' onClick={()=>Delete(142)}>
          Delete
        </button> 
        <button className='bg-slate-400 rounded-md p-2 text-white' onClick={()=>update(142)}>
          Update
        </button>
      </div>

      {data.length > 0 && (
        <div className="table-container">
          <h1 className="text-xl font-bold mb-4">Graph API List Items</h1>
          <table className="min-w-full bg-sky-950 border border-black">
            <thead className=" border-y-2 border-black">
              <tr className="w-full bg-sky-950 border-b border-gray-300">
                <th className="py-2 px-4 border-r">Title</th>
                <th className="py-2 px-4 border-r">Location</th>
                <th className="py-2 px-4 border-r">Activities</th>
                <th className="py-2 px-4 border-r">Rating</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-black border-b">{item.fields.Title}</td>
                  <td className="py-2 px-4 border-black border-b">{item.fields.Location}</td>
                  <td className="py-2 px-4 border-black border-b">{item.fields.Activities}</td>
                  <td className="py-2 px-4 border-black border-b">{item.fields.Rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Hello;
