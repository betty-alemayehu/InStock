import "./InputField.scss";

// future props to add potentially: { label, name }

function InputField() {
  return (
    <div className="input-field">
      <label className="input-label">
        InputField component
        {/* //to do convert label, id, name to variable - potentially also className */}
      </label>
      <input type="text" id="name" name="name" className="input-control" />
    </div>
  );
}

export default InputField;
