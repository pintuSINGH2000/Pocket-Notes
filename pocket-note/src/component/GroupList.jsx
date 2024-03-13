import React from 'react';
import style from '../assets/css/grouplist.module.css'; 

const GroupList = ({group}) => {
    const words = group.name.split(' ');
    var name= words[0][0];
    if(words.length>1){
        name+=words[1][0];
    }

  return (
    <div className={style.container}>
        <div style={{backgroundColor:group.color}} className={`${style.profile} roboto-500`}>{name}</div>
        <div className={`${style.name} roboto-500`}>{group.name}</div>
    </div>
  )
}

export default GroupList