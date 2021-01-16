import React, { useEffect, useState } from 'react';
import MainLayout from '@layouts/MainLayout';
import service from '@services/payment';

const TotalPage = () => {
  const [page, setPage] = useState(0);

  useEffect(() => {}, []);

  return <MainLayout>total page</MainLayout>;
};

export default TotalPage;
