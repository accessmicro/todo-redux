import Item from "./Item";
const List = ({
  list,
  handleDelete,
  onChangeChecked,
  target,
  onHandleDbl,
  onHandleUpdate,
  onHandleEnterInput,
  onHandleBlur,
}) => {
  return (
    <div className="todo__form">
      {list.map((item) => (
        <Item
          key={item.id}
          title={item.title}
          handleDelete={(event) => handleDelete(event)}
          id={item.id}
          onChecked={item.completed}
          onChangeChecked={onChangeChecked}
          isUpdate={item.isUpdate}
          target={target}
          handleDbl={onHandleDbl}
          handleUpdate={onHandleUpdate}
          handleEnter={onHandleEnterInput}
          handleBlur={onHandleBlur}
        />
      ))}
    </div>
  );
};

export default List;
