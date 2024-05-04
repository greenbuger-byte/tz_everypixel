import React, { FC } from 'react';

import styles from './checkbox.module.css';

type CheckboxProps = {
  name: string;
  checked: boolean;
  onCheck: () => void;
};
const Checkbox: FC<CheckboxProps> = (props) => {
  const { name, checked, onCheck } = props;
  const CHECKBOX_ID = `checkbox_${name}`;
  return (
    <div>
      <label
        htmlFor={CHECKBOX_ID}
        className={`${styles.checkbox__label} ${checked && styles.checkbox__label__checked}`}
      >
        {checked && <i className="material-icons">check</i>}
      </label>
      <input
        id={CHECKBOX_ID}
        type="checkbox"
        className={styles.checkbox}
        onChange={onCheck}
        checked={checked}
      />
    </div>
  );
};

export default Checkbox;
