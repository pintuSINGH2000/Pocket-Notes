import React, { useState } from "react";
import { Button, Modal } from "antd";
import style from '../assets/css/homepage.module.css'; 
import CreateGroup from "../component/CreateGroup";

const Homepage = () => {
  const [visible, setVisible] = useState();

  return (
    <div>
      <button
        className="btn btn-primary ms-2"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add
      </button>
      <Modal onCancel={() => setVisible(false)} footer={null} width={"740px"} open={visible} closable={false}>
        <CreateGroup visible={visible} setVisible={setVisible}/>
      </Modal>
    </div>
  );
};

export default Homepage;
