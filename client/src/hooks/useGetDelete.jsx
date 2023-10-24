import { useEffect, useState } from "react"

const backendUrl = "http://localhost:3000/";

export const useGetDelete = (route) => {
  const [res, setRes] = useState();

  const handleGet = async () => {
    const response = await fetch(backendUrl + route);
    if(response.ok) {
      const responseJson = await response.json();
      setRes(responseJson);
    }
  }

  useEffect(() => {
    handleGet();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`${backendUrl + route}/${id}`, {
      method: "DELETE"
    });
    if(response.ok) {
      const responseJson = await response.json();
      alert(responseJson.message);
      handleGet();
    }
  }

  return {
    res,
    handleGet,
    handleDelete
  }
}