import React, { useEffect, useState } from 'react';

import { BottomPanel, Card, SimplePagination } from '@/components';
import cardsList from '@/mock/data.json';
import { CheckedImages, CheckedImageState, DemoCardWithId, RemoveOptions } from '@/types/card.type';

//TODO: стоисомость хардкод в шаблоне есть, в json нет
export const DEFAULT_PRICE = 500;

function App() {
  const [imageData, changeImageData] = useState<Array<DemoCardWithId>>([]);
  const [checkedList, updateCheckedList] = useState<CheckedImages>({});
  const [currentPage, changeCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    changeImageData(cardsList.map((card, id) => ({ ...card, id })));
  }, []);

  function imageCheckFillHandler(checkedState: CheckedImageState) {
    const { options, cardCheck } = checkedState;
    if (options) {
      let checkResult = { ...checkedList };
      if (options.all)
        imageData.forEach((card) => {
          checkResult[card.id] = DEFAULT_PRICE;
        });
      else checkResult = {};
      updateCheckedList(checkResult);
      return;
    }
    if (!cardCheck) return;
    const currentCheckedList = { ...checkedList };
    if (Object.prototype.hasOwnProperty.call(currentCheckedList, String(cardCheck.id))) {
      delete currentCheckedList[String(cardCheck.id)];
      updateCheckedList(currentCheckedList);
    } else {
      updateCheckedList((prevState) => ({ ...prevState, [cardCheck.id]: cardCheck.price }));
    }
  }

  function removeImageHandler(id?: number, options?: RemoveOptions) {
    if (options?.reset) {
      updateCheckedList({});
      return;
    }
    let removeTarget: CheckedImages = {};
    if (typeof id === 'number') {
      removeTarget = { [id]: 0 };
      updateCheckedList((prevState) => {
        delete prevState?.[id];
        return Object.entries(prevState).reduce<CheckedImages>((totalList, [index, cost]) => {
          if (id <= Number(index)) {
            totalList[Number(index) - 1] = cost;
          } else {
            totalList[String(index)] = cost;
          }
          return totalList;
        }, {});
      });
    } else {
      removeTarget = { ...checkedList };
      updateCheckedList({});
    }
    changeImageData((prevState) => {
      return prevState.filter((demoCard) => removeTarget?.[demoCard.id] === undefined);
    });
  }

  return (
    <main className="mdl-layout__container">
      <div className="page-content">
        <h6 className="mdl-typography--caption title">{imageData.length} ИЗОБРАЖЕНИЙ</h6>
        <div className="mdl-grid mdl-grid--no-spacing">
          {imageData
            .slice(currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
            .map((card) => (
              <div
                key={card.id}
                className="mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet"
                style={{
                  padding: '14px',
                }}
              >
                <Card
                  checked={Boolean(checkedList[card.id])}
                  onRemoveCard={removeImageHandler}
                  onCheckCard={imageCheckFillHandler}
                  card={card}
                />
              </div>
            ))}
          <SimplePagination
            page={currentPage}
            onChangePage={changeCurrentPage}
            total={imageData.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </div>
      </div>
      <BottomPanel
        checkedImages={checkedList}
        listCount={imageData.length}
        onCheckAll={imageCheckFillHandler}
        onRemoveAllSelectedImages={removeImageHandler}
      />
    </main>
  );
}

export default App;
