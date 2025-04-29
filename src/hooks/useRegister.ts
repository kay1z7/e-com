import { useState } from "react";

import { register } from "@/src/api/api";

const useRegister = async (number) => {
  const [response, setResponse] = useState([]);

  const request = await register(number);
  setResponse(request?.data);

  return response;
};

export default useRegister;
