import { useRef } from "react";

const Add = ({ additems, setAddItems, addItem }) => {
  const inputRef = useRef();

  const handleFocus = () => {
    addItem();
    inputRef.current.focus();
  }

  return (
    <form action="" onSubmit={addItem}>
      <div className="AddRoot">
        <input
          type="text"
          className="add"
          value={additems}
          ref={inputRef}
          placeholder="enter item to add"
          onChange={(e) => setAddItems(e.target.value)}
          autoFocus
        />
        <button type="button" className="addbtn" onClick={handleFocus}>
          Add
        </button>
      </div>
    </form>
  );
}
export default Add;
