import { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import style from "./homepage.module.css";
import CreateGroup from "../CreateGroup/CreateGroup";
import GroupList from "../GroupList/GroupList";
import emptyimg from "../../assets/images/emptynote.png";
import { MdLock } from "react-icons/md";
import Notebox from "../NoteBox/Notebox";
import { getFolders, searchApi } from "../../api/note";
import { IoMdSearch } from "react-icons/io";

const Homepage = () => {
  const [currentGroup, setCurrentGroup] = useState();
  const [group, setGroup] = useState([]);
  const [visible, setVisible] = useState();
  const [query, setQuery] = useState("");
  const [groupResults, setGroupResults] = useState([]);
  const [noteResults, setNoteResults] = useState([]);
  const noteRefs = useRef({});
  const debounceTimeout = useRef(null);
  const [searching, setSearching] = useState(false);
  const [searchNote,setSearchNote] = useState("");

  const handleSearch = async (searchQuery) => {
      setSearching(true);
      const res = await searchApi(searchQuery);
      setSearching(false);
      setGroupResults(res?.groups);
      setNoteResults(res?.notes);
    
  };

  const debouncedSearch = (searchQuery) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);
  };

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    } else {
      setGroupResults([]);
      setNoteResults([]);
    }
  }, [query]);

  const handleNoteClick = (note) => {
    const noteElement = noteRefs.current[note._id];
    const cgroup = group.filter((data)=>data._id===note.folder);
    setCurrentGroup(cgroup[0]);
    setSearchNote(note);
    setQuery("");
    if (noteElement) {
      noteElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const getGroup = async () => {
      const res = await getFolders();
      console.log(res);
      setGroup(res?.folders || []);
    };
    getGroup();
  }, []);
  return (
    <div className={`${style.container}`}>
      <div className={`${style.left} ${currentGroup && style.displaynone}`}>
        <div className={`${style.lefttitle}`}> <div className={`${style.title} roboto-500`}>Pocket Notes</div>
        <div className={style.searchContainer}>
          <div className={style.search}>
            <input
              id="search"
              type="search"
              placeholder="Search by group or notes"
              autoFocus
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={style.searchInput}
            />
            <IoMdSearch className={style.searchIcon} />
          </div>
          {query && (
            <div className={`${style.searchResult} roboto-400`}>
              {searching ? (
                <div>Searcing...</div>
              ) : (
                <>
                  {groupResults.length === 0 && noteResults.length === 0 ? (
                    <div>No Result found</div>
                  ) : (
                    <>
                      {groupResults?.length > 0 && (
                        <h2 className="text-center">Groups</h2>
                      )}
                      <ul>
                        {groupResults.map((group) => (
                          <li
                            key={group._id}
                            className={`${style.list} ellipsis cursor-pointer`}
                            onClick={() => setCurrentGroup(group)}
                          >
                            {group.name}
                          </li>
                        ))}
                      </ul>
                      {noteResults?.length > 0 && (
                        <h2 className="text-center">Notes</h2>
                      )}
                      <ul>
                        {noteResults.map((note) => (
                          <li
                            key={note._id}
                            ref={(el) => (noteRefs.current[note._id] = el)}
                            onClick={() => handleNoteClick(note)}
                            className={`${style.list} ellipsis cursor-pointer`}
                          >
                            {note.note}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        </div>
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

      <div
        className={`${style.right} ${
          !currentGroup && style.displaynone
        } roboto-500`}
      >
        {currentGroup ? (
          <Notebox
            currentGroup={currentGroup}
            setCurrentGroup={setCurrentGroup}
            searchNote={searchNote}
          />
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
        <CreateGroup
          setVisible={setVisible}
          group={group}
          setGroup={setGroup}
        />
      </Modal>
    </div>
  );
};

export default Homepage;
