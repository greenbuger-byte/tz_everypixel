import React, { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import styles from './card.module.css';

import loadingImage from '@/assets/img/preload.gif';
import imageNotFoundImage from '@/assets/img/notFound.png';
import type { CheckedImageState, DemoCardWithId } from '@/types/card.type';
import { Checkbox } from '@/components';
import { DEFAULT_PRICE } from '@/App';

type CardProps = {
  card: DemoCardWithId;
  checked: boolean;
  onRemoveCard: (id: number) => void;
  onCheckCard: (imageChecked: CheckedImageState) => void;
};

const Card: FC<CardProps> = (props) => {
  const { card, onCheckCard, checked, onRemoveCard } = props;
  const [currentImage, setCurrentImage] = useState<string>(loadingImage);
  const styleCard = {
    backgroundImage: `url('${currentImage}')`,
  };
  useEffect(() => {
    //TODO: Сделал простую проверку на доступность картинки (кривовато, но функцию выполняет)
    const img = new Image();
    img.src = card.sample_url;
    img
      .decode()
      .then(() => {
        setCurrentImage(img.src);
      })
      .catch((encodingError) => {
        console.log('error', encodingError);
        setCurrentImage(imageNotFoundImage);
      });
  }, [card.sample_url]);

  function checkedHandler() {
    onCheckCard({ cardCheck: { id: card.id, price: DEFAULT_PRICE } });
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      className={`mdl-card mdl-shadow--2dp ${styles.card__container}`}
    >
      <div className={styles.card__image_wrapper} style={styleCard}>
        <div className={styles.card__image_wrapper__covered}>
          <div className={styles.card__view_icon}>
            <i className="material-icons">visibility</i>
          </div>
        </div>
      </div>
      <div className={`mdl-card__actions ${styles.card__filename}`} title={card.name}>
        <span className="demo-card-image__filename truncate">{card.name}</span>
      </div>
      <div className={styles.card__remove_wrapper} onClick={onRemoveCard.bind(null, card.id)}>
        <i className="material-icons">delete</i>
      </div>
      <div className={`${styles.card__selector} ${checked && styles.card__selector__selected}`}>
        <Checkbox name={card.name} onCheck={checkedHandler} checked={checked} />
      </div>
    </motion.div>
  );
};

export default Card;
