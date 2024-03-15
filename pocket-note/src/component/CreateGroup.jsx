import  { useContext, useState } from "react";
import style from "../assets/css/creategroup.module.css";
import { GroupContext } from "../context/GroupContext";
import PropTypes from 'prop-types';

const CreateGroup = ({ setVisible }) => {
  const { group, updateGroup } = useContext(GroupContext);
  const [groupName, setGroupName] = useState("");
  const [groupcolor, setGroupColor] = useState("");
  const [groupNameErr, setGroupNameErr] = useState(null);
  const [groupColorErr, setGroupColorErr] = useState(null);

  const colorOptions = [
    "rgba(179, 139, 250, 1)",
    "rgba(255, 121, 242, 1)",
    "rgba(67, 230, 252, 1)",
    "rgba(241, 149, 118, 1)",
    "rgba(0, 71, 255, 1)",
    "rgba(102, 145, 255, 1)",
  ];

  const handleSubmit = () => {
    var isValid = true;
    if (groupName.trim().length === 0) {
      setGroupNameErr("Group name cannot be empty.");
      isValid = false;
    } else if(group.some((group) => group.name === groupName.trim())){
      setGroupNameErr(groupName+" is already Added");
      isValid=false;
    }else{
      setGroupNameErr(null);
    }
    if (groupcolor.trim().length === 0) {
      setGroupColorErr("Please select a color.");
      isValid = false;
    } else {
      setGroupColorErr(null);
    }
    if (!isValid) return;
    setVisible(false);
    group.push({ id:group.length+1,name: groupName, color: groupcolor,notes:[] })
    updateGroup(group);
    setGroupName("");
    setGroupColor("");
  };
  return (
    <div>
      <h3 className={style.title}>Create New Group</h3>
      <div
        style={{ display: "flex", alignItems: "center", padding: "10px 0px" }}
      >
        <div className={`${style.name} roboto-500`}>Group Name</div>
        <input
          type="text"
          id="group-name"
          name="group-name"
          placeholder="Enter group name"
          value={groupName}
          onChange={() => setGroupName(event.target.value)}
          required
          className={`${style.input} roboto-400`}
        />
      </div>
      {groupNameErr && <div className={`${style.grouperror} error dm-sans`}>{groupNameErr}</div>}
      <div className={style.colorinput}>
        <div className={`${style.name} roboto-500`}>Select a color</div>
        {colorOptions.map((color) => (
          <div
            key={color}
            onClick={() => {
              setGroupColor(color);
            }}
            style={{
              backgroundColor: color,
            }}
            className={`${style.coloroption} ${
              groupcolor === color ? style.increasesize : style.normalsize
            }`}
          />
        ))}
      </div>
      {groupColorErr && <div className={`${style.grouperror} error dm-sans`}>{groupColorErr}</div>}
      <button
        type="submit"
        className={`${style.submit} roboto-400`}
        onClick={handleSubmit}
      >
        Create
      </button>
    </div>
  );
};

CreateGroup.propTypes = {
  setVisible: PropTypes.func,
};

export default CreateGroup;
