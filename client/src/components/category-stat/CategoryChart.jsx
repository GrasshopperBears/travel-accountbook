import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ResponsivePie } from '@nivo/pie';
import service from '@services/category-stat';

const CategoryChart = () => {
  const { selectedTrip } = useSelector((state) => state.trips);
  const { categories } = useSelector((state) => state.categories);
  const [categoryStat, setCategoryStat] = useState([]);

  const fetchStat = async () => {
    const response = await service.getCategoryStat(selectedTrip.id);
    if (response) {
      const stats = response.reduce((acc, val, idx) => {
        const { amount_per_category: amount } = val;
        if (idx >= MAX_STAT_IN_CHART) {
          const last = acc.pop();
          acc.push(last + amount);
        } else acc.push(amount);
        return acc;
      }, []);
      setCategoryStat(
        response.reduce((acc, val, idx) => {
          if (idx === MAX_STAT_IN_CHART) acc.push({ categoryName: '기타', amount_per_category: stats[idx] });
          else if (idx < MAX_STAT_IN_CHART) {
            const categorySearch = categories.find((category) => category.id === val.category_id);
            acc.push({
              ...val,
              categoryName: categorySearch ? categorySearch.title : '미분류',
            });
          }
          return acc;
        }, []),
      );
    }
  };

  useEffect(() => {
    if (selectedTrip) fetchStat();
  }, [selectedTrip]);

  return (
    <ResponsivePie
      data={categoryStat}
      id='categoryName'
      value='amount_per_category'
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.3}
      colors={{ scheme: 'nivo' }}
      sliceLabel={(d) => `${d.value.toLocaleString()}`}
      theme={{ fontSize: '1rem' }}
    />
  );
};

const MAX_STAT_IN_CHART = 6;

export default CategoryChart;
