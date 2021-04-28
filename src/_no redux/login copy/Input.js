const Input = ({
  id,
  className,
  type,
  value,
  placeholder,
  handleChange,
  handleBlur,
  children,
}) => {
  return (
    <label htmlFor={id}>
      <input
        className={className}
        id={id}
        type={type}
        value={value}
        placeholder={placeholder + "..."}
        onChange={(event) => handleChange(event)}
        onBlur={(event) => handleBlur(event)}
      />
      <div className="notice">{children}</div>
    </label>
  );
};

export default Input;
