import React from 'react';
import MainLayout from '@layouts/MainLayout';
import CategoryChart from '@components/category-stat/CategoryChart';

const CategoryPage = () => {
  return (
    <MainLayout>
      <CategoryChart />
    </MainLayout>
  );
};

export default CategoryPage;
