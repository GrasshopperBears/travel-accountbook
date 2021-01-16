import { SET_CATEGORIES, ADD_CATEGORY, MODIFY_CATEGORY, DELETE_CATEGORY } from '../actionTypes';

const initialState = {
  init: false,
  categories: [],
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      const { categories } = action.payload;
      return { init: true, categories };
    case ADD_CATEGORY:
      const { newCategory } = action.payload;
      return { ...state, categories: [newCategory, ...state.categories] };
    case MODIFY_CATEGORY:
      const { id, title } = action.payload;
      return {
        ...state,
        categories: state.categories.reduce((acc, category) => {
          if (category.id === id) acc.push({ ...category, title });
          else acc.push(category);
          return acc;
        }, []),
      };
    case DELETE_CATEGORY:
      const { categoryId: deletedCategoryId } = action.payload;
      return {
        ...state,
        categories: state.categories.reduce((acc, category) => {
          if (category.id !== deletedCategoryId) acc.push(category);
          else acc.push({ ...category, deleted: true });
          return acc;
        }, []),
      };
    default:
      return state;
  }
};

export default categories;
