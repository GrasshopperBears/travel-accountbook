import React from 'react';
import { connect } from 'react-redux';
import { modifyCategory, deleteCategory } from '@stores/actions';
import { Modal, Form, Input, Button, Divider, Empty, List } from 'antd';

const ModifyCategoryRow = ({ category, onModify, onDelete, modifyCategory, deleteCategory }) => {
  return <p>{category.title}</p>;
};

export default connect(null, { modifyCategory, deleteCategory })(ModifyCategoryRow);
