export const add = (data) => ({
  type: 'ADD',
  data,
});

export const loadAll = (data) => ({
  type: 'LOAD_ALL',
  data: [...data],
});

export const removeAll = () => ({
  type: 'REMOVE_ALL',
});
