import { useLazyQuery } from "@apollo/client";

import HistoryIcon from "@/src/assets/icons/historyIcon.svg";
import SearchIcon from "@/src/assets/icons/searchIcon.svg";
import CloseIcon from "@/src/assets/icons/x.svg";
import { BARCODES_TITLE_ID_QUERY } from "@/src/lib/query/getBarcodesTitleAndId";

import SearchList from "../../SearchList/SearchList";
import css from "./SearchView.module.scss";

const SearchView = ({
  setIsSearchPanelVisible,
  searchInput,
  setSearchInput,
  handleInput,
  search,
  searchHistory,
  handleHistoryItemClick,
  handleDeleteHistoryItem,
  autoCompleteVisible,
  setAutoCompleteVisible,
}) => {
  const [getBarcodesTitles, { data }] = useLazyQuery(BARCODES_TITLE_ID_QUERY);

  return (
    <div className={css.mobileSearch}>
      <div className={css.mobileSearchWrapper}>
        <div className={css.mobileSearchPanel}>
          <input
            className={css.searchInput}
            type="text"
            placeholder="TANDA"
            value={searchInput}
            onChange={(e) => {
              handleInput(e);
              if (e.target.value.length > 0) {
                getBarcodesTitles({ variables: { search: e.target.value } });
              }
              setAutoCompleteVisible(true);
            }}
            onKeyDown={search}
          />
          {searchInput.length > 0 && (
            <button onClick={() => setSearchInput("")} className={css.searchInputBtn}>
              <CloseIcon />
            </button>
          )}
        </div>
        <div className={css.cancelWrapper}>
          <button className={css.cancelBtn} onClick={() => setIsSearchPanelVisible(false)}>
            Отмена
          </button>
        </div>
      </div>

      {searchHistory.length > 0 && searchInput.length === 0 && (
        <SearchList
          items={searchHistory}
          handleItemClick={handleHistoryItemClick}
          handleDeleteItem={handleDeleteHistoryItem}
          icon={<HistoryIcon />}
          type={"history"}
        />
      )}

      {autoCompleteVisible && data && data?.barcodes.length > 0 && searchInput.length > 0 && (
        <SearchList
          items={data.barcodes}
          handleItemClick={handleHistoryItemClick}
          icon={<SearchIcon />}
          type="autoComplete"
        />
      )}
    </div>
  );
};

export default SearchView;
