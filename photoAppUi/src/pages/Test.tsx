import React, { useState } from 'react';
import axios from 'axios';
import useAxios from '../hook/useAxios';

function Test() {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await useAxios.get('/auth/refresh');
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type='submit' disabled={loading}>
        Upload
      </button>
    </form>
  );
}

export default Test;
