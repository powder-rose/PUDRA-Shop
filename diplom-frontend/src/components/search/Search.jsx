import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../actions";
import { selectSearch } from "../../selectors";
import { useNavigate } from "react-router-dom";

const SearchContainer = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const value = useSelector(selectSearch);

  const handleChange = (value) => {
    dispatch(setSearch(value));
  };

  return (
    <div className={className}>
      <input
        className="search-input"
        type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate("/catalog");
          }
        }}
        placeholder="Поиск"
      />
    </div>
  );
};

export const Search = styled(SearchContainer)`
  display: flex;
  width: 100%;
  height: 30px;
  align-items: center;
  position: absolute;
  top: 100px;
  left: 400px;
  z-index: 9;

  .search-input {
    background: transparent;
    display: flex;
    min-width: 250px;
    margin-left: 330px;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 30px;
    border: none;
    border-bottom: 2px solid rgb(255, 67, 68);
    &:focus {
      outline: none;
    }
  }
`;
