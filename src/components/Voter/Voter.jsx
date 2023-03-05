import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ToolTip from "../ToolTip";
import Alternative from "./Alternative";
import VoterType from "./VoterType";

const Voter = (props) => {
  const { id, voterUpdate } = props;
  const [type, setType] = useState(0);
  const [preference, setPreference] = useState([]);
  const dragItemStart = useRef();
  const dragItemHover = useRef();
  const userTypeInfo = `Choose type - 0 for 'Lazy' or 1 for 'Active'`;

  const onTypeChangeHandler = (e) => {
    setType(e.target.value);
    voterUpdate(id, "type", e.target.value);
  };

  const preferenceChangeHandler = () => {
    const currentPref = [...preference];
    const val = currentPref.splice(dragItemStart.current, 1);
    currentPref.splice(dragItemHover.current, 0, val[0]);
    dragItemStart.current = null;
    dragItemHover.current = null;
    console.log('after change: ', currentPref)
    setPreference(currentPref);
    voterUpdate(id, "alters_pref", currentPref);
  };

  useEffect(() => {
    voterUpdate(id, "alters_pref", props.preference);
    setPreference(props.preference)
  }, [props.preference])

  return (
    <VoterContainer>
      <UserTypeWrapper>
        <VoterType type={type} onTypeChangeHandler={onTypeChangeHandler} />
        <ToolTip info={userTypeInfo} />
      </UserTypeWrapper>
      {preference.map((e, i) => (
        <Alternative key={i} onDragStartHandler={() => dragItemStart.current = i} onDragEnterHandler={() => dragItemHover.current = i} onDragEndHandler={preferenceChangeHandler} value={e} />
      ))}
    </VoterContainer>
  );
};

const VoterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
`;

const UserTypeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export default Voter;