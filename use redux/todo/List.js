import Item from "./Item";
const List = ({
  list,
}) => {

  return (
    <div className="todo__form">
      {list.map((item) => (
        <Item
          key={item.id}
          title={item.title}
          id={item.id}
          isChecked={item.completed}
          isUpdate={item.isUpdate}
        />
      ))}
    </div>
  );
};

export default List;
