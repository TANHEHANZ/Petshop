import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const backendUrl = "https://petshop-backend-coral.vercel.app/";

export const useGetDelete = (route) => {
  const [res, setRes] = useState();

  const handleGet = async () => {
    const response = await fetch(backendUrl + route);
    if (response.ok) {
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
    if (response.ok) {
      const responseJson = await response.json();
      toast.success(responseJson.message);
      handleGet();
    }
  }

  return {
    res,
    handleGet,
    handleDelete
  }
}