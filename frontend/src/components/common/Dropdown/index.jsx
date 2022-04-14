import PropTypes from "prop-types";
import Select from "react-select";

import styles from "./Dropdown.module.scss";

function DropDown({ labelValue, id, options, setValue, value, loading }) {
  function handleChange(event) {
    setValue(event);
  }
  return (
    <div className={styles.dropDownRootContainer}>
      <p>{labelValue}</p>
      <Select
        onChange={(event) => handleChange(event)}
        options={options}
        value={value}
        isLoading={loading}
        placeholder={labelValue}
      />
    </div>
  );
}

DropDown.propTypes = {
  labelValue: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    }),
  ).isRequired,
  setValue: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default DropDown;
