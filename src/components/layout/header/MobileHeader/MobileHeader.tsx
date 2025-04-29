import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import MobileBottomNav from "@/src/components/MobileBottomNav/MobileBottomNav";
import { searchInputVar, selectInputVar } from "@/src/lib/apolloClient";

import HeaderView from "./HeaderView/HeaderView";
import css from "./MobileHeader.module.scss";
import SearchView from "./SearchView/SearchView";

const MobileHeader = ({
  basket,
  isLoggedIn,
  setIsLoggedIn,
  autoCompleteVisible,
  setAutoCompleteVisible,
}) => {
  const [isVisibleCategories, setIsVisibleCategories] = useState(false);
  const [isSearchPanelVisible, setIsSearchPanelVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchParams = useSearchParams();

  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    // Загружаем историю поиска из localStorage только на клиенте
    const storedHistory = localStorage.getItem("searchHistory");
    const input = searchParams.get("search");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
    if (input) {
      setSearchInput(input);
      searchInputVar(input);
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value;

    setSearchInput(target);
  };

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/search?${params.toString()}`, { scroll: false });
  };

  const search = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchInput.length === 0) return;

    if (e.key === "Enter") {
      localStorage.removeItem("selectValue");
      updateSearchParams("search", searchInput);
      if (!searchHistory.includes(searchInput)) {
        const updatedHistory = [searchInput, ...searchHistory];

        setSearchHistory(updatedHistory);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      }
      selectInputVar("");
      searchInputVar(searchInput);
      setIsSearchPanelVisible(false);
    }
  };

  const handleHistoryItemClick = (item: string, type: string = "history") => {
    if (!searchHistory.includes(item) && type === "autoComplete") {
      const updatedHistory = [item, ...searchHistory];

      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
    selectInputVar("");
    localStorage.removeItem("selectValue");
    setSearchInput(item);
    searchInputVar(item);
    setIsSearchPanelVisible(false);
    if (path !== "/search") {
      router.push("/search");
    }
  };

  const handleDeleteHistoryItem = (index: number) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleCartClick = () => {
    router.push("/basket");
    setIsVisibleCategories(false);
  };

  useEffect(() => {
    setIsSearchPanelVisible(false);
  }, [path]);

  return (
    <>
      <div className={css.header_mobile}>
        {!isSearchPanelVisible ? (
          <HeaderView
            router={router}
            setIsSearchPanelVisible={setIsSearchPanelVisible}
            setIsVisibleCategories={setIsVisibleCategories}
            isVisibleCategories={isVisibleCategories}
            setIsLoggedIn={setIsLoggedIn}
          />
        ) : (
          <SearchView
            search={search}
            setSearchInput={setSearchInput}
            handleInput={handleInput}
            setIsSearchPanelVisible={setIsSearchPanelVisible}
            searchInput={searchInput}
            searchHistory={searchHistory}
            handleHistoryItemClick={handleHistoryItemClick}
            handleDeleteHistoryItem={handleDeleteHistoryItem}
            autoCompleteVisible={autoCompleteVisible}
            setAutoCompleteVisible={setAutoCompleteVisible}
          />
        )}
      </div>
      <MobileBottomNav
        router={router}
        basket={basket}
        handleCartClick={handleCartClick}
        setIsVisibleCategories={setIsVisibleCategories}
        isVisibleCategories={isVisibleCategories}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
};

export default MobileHeader;
