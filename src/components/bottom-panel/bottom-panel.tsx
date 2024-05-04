import React, { FC, useCallback, useEffect } from 'react';

import styles from './bottom-panel.module.css';

import { CheckedImages, CheckedImageState, RemoveOptions } from '@/types/card.type';

type BottomPanelProps = {
  checkedImages: CheckedImages;
  onRemoveAllSelectedImages: (id?: number, options?: RemoveOptions) => void;
  listCount: number;
  onCheckAll: (cardState: CheckedImageState) => void;
};

const BottomPanel: FC<BottomPanelProps> = (props) => {
  const { checkedImages, onRemoveAllSelectedImages, onCheckAll, listCount } = props;
  const imageTotalCost = useCallback(() => {
    return Object.values(checkedImages).reduce<number>((total, cost) => total + cost, 0);
  }, [checkedImages]);

  const isAllCardChecked = Object.keys(checkedImages).length === listCount;

  useEffect(() => {
    const escEvent = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onRemoveAllSelectedImages(0, { reset: true });
      }
    };
    window.addEventListener('keydown', escEvent);
    return () => {
      window.removeEventListener('keydown', escEvent);
    };
  }, [onRemoveAllSelectedImages]);

  return (
    <div className={`mdl-shadow--2dp' ${styles.bottom_panel_wrapper}`}>
      <div className={styles.bottom_panel_content}>
        <div className={styles.bottom_panel__block_left}>
          <div
            onClick={() => onCheckAll({ options: { all: !isAllCardChecked } })}
            title="выбрать все"
          >
            {isAllCardChecked ? (
              <i className="material-icons">expand_circle_down</i>
            ) : (
              <i className="material-icons">do_not_disturb_on</i>
            )}
          </div>
          <div>
            Выбрано:
            <span className={styles.bottom_panel__total_chip}>
              {Object.values(checkedImages).length}
            </span>
            на сумму {imageTotalCost()} ₽
          </div>
        </div>
        <div
          className={styles.bottom_panel__block_center}
          onClick={() => onRemoveAllSelectedImages()}
        >
          <i className="material-icons" title="Удалить все выделенные">
            delete
          </i>
        </div>
        <div className={styles.bottom_panel__block_right}>нажмите esc что бы отменить</div>
      </div>
    </div>
  );
};

export default BottomPanel;
