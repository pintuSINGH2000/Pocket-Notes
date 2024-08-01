import style from './grouplist.module.css'; 
import PropTypes from 'prop-types';

const GroupList = ({group,currentGroup,setCurrentGroup}) => {
    const words = group.name.split(' ');
    var name= words[0][0];
    if(words.length>1){
        name+=words[1][0];
    }

  return (
    <div className={style.container} onClick={()=>setCurrentGroup(group)} style={{backgroundColor:group===currentGroup? "rgba(47, 47, 47, 0.17)":""}}>
        <div style={{backgroundColor:group.color}} className={`${style.profile} roboto-500`}>{name}</div>
        <div className={`${style.name} roboto-500`}>{group.name}</div>
    </div>
  )
}
GroupList.propTypes = {
  currentGroup: PropTypes.object,
  setCurrentGroup: PropTypes.func,
  group: PropTypes.object,
};

export default GroupList