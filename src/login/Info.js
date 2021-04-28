const Info = ({ icon, color }) => {
  return (
    <div className="tick">
      <i className={icon} style={{ color: color }}></i>
    </div>
  );
};

export default Info;
