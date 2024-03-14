import React, { useContext, useState } from "react";
import { Button, Modal } from "antd";
import style from "../assets/css/homepage.module.css";
import CreateGroup from "../component/CreateGroup";
import { GroupContext } from "../context/GroupContext";
import GroupList from "../component/GroupList";
import emptyimg from "../assets/images/emptynote.png";
import { MdLock } from "react-icons/md";
import Notebox from "../component/Notebox";

const Homepage = () => {
  const { group, updateGroup } = useContext(GroupContext);
  const [currentGroup, setCurrentGroup] = useState();
  const [visible, setVisible] = useState();

  return (
    <div className={`${style.container}`}>
          <div className={`${style.left} ${currentGroup&&style.displaynone}`}>
        <div className={`${style.lefttitle} roboto-500`}>Pocket Notes</div>
        <button
          className={`${style.addbtn} roboto-500`}
          onClick={() => {
            setVisible(true);
          }}
        >
          +
        </button>
        <div className={`${style.grouplist}`}>
          {group.length > 0 &&
            group.map((group, index) => (
              <GroupList
                key={index}
                group={group}
                currentGroup={currentGroup}
                setCurrentGroup={setCurrentGroup}
              />
            ))}
        </div>
      </div>

      <div className={`${style.right} ${!currentGroup&&style.displaynone} roboto-500`}>
        {currentGroup ? (
          <Notebox currentGroup={currentGroup} group={group} updateGroup={updateGroup} setCurrentGroup={setCurrentGroup}/>
        ) : (
          <div className={`${style.emptystate}`}>
            <img src={emptyimg} alt="initial note message" />
            <div className={`${style.righttitle} roboto-700`}>Pocket Notes</div>
            <div className={`${style.rightmessage} roboto-500`}>
              Send and receive messages without keeping your phone online. Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone
            </div>
            <div className={`${style.footer} roboto-400`}>
              <MdLock /> end-to-end encrypted
            </div>
          </div>
        )}
      </div>

      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        width={"740px"}
        open={visible}
        closable={false}
      >
        <CreateGroup visible={visible} setVisible={setVisible} />
      </Modal>
    </div>
  );
};

export default Homepage;
