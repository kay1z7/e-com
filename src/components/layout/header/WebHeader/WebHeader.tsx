import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import BasketIcon from "@/src/assets/icons/basketIcon.svg";
import CallIcon from "@/src/assets/icons/call.svg";
import HistoryIcon from "@/src/assets/icons/historyIcon.svg";
import LogoIcon from "@/src/assets/icons/logoIcon.svg";
import SearchIcon from "@/src/assets/icons/searchIcon.svg";
import UserIcon from "@/src/assets/icons/userIcon.svg";
import CloseIcon from "@/src/assets/icons/x.svg";
import Button from "@/src/components/base/Button/Button";
import SignUp from "@/src/components/signUp/SignUp";
import { useCart } from "@/src/Context/cartContext";
import { searchInputVar, selectInputVar } from "@/src/lib/apolloClient";
import { BARCODES_TITLE_ID_QUERY } from "@/src/lib/query/getBarcodesTitleAndId";

import SearchList from "../SearchList/SearchList";
import css from "./WebHeader.module.scss";

const WebHeader = ({
  getBasket,
  isLoggedIn,
  setIsLoggedIn,
  autoCompleteVisible,
  setAutoCompleteVisible,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [count, setCount] = useState();
  const { cartItems } = useCart();
  const [searchInput, setSearchInput] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isVisible, setVisible] = useState(false);
  const [dropdownListVisible, setDropDownListVisible] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const historyListRef = useRef<HTMLUListElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const [isFocused, setFocused] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        historyListRef.current &&
        !historyListRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (focusRef.current && !focusRef.current.contains(event.target as Node)) {
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("key");
    setIsLoggedIn(!!token);
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      router.push("/profile");
    } else {
      setIsSignUpModalOpen(true);
    }
  };

  useEffect(() => {
    setCount(cartItems.length);
    getBasket(cartItems.length);
  }, [cartItems]);
  const handleLogout = () => {
    localStorage.removeItem("key");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/");
  };

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
      setVisible(false);
      setAutoCompleteVisible(false);
    }
  };

  const handleListItemClick = (item: string, type: string = "history") => {
    if (!searchHistory.includes(item) && type === "autoComplete") {
      const updatedHistory = [item, ...searchHistory];

      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
    selectInputVar("");
    localStorage.removeItem("selectValue");
    setSearchInput(item);
    searchInputVar(item);
    setVisible(false);
    setAutoCompleteVisible(false);
    if (pathname !== "/search") {
      router.push("/search");
    }
  };

  const handleDeleteListItem = (index: number) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleCartClick = () => {
    router.push("/basket");
  };
  const [getBarcodesTitles, { data }] = useLazyQuery(BARCODES_TITLE_ID_QUERY);
  return (
    <>
      <div className={css.header_wrapper}>
        <Button
          className={css.header_block_logo}
          leftIcon={<LogoIcon />}
          variant="icon"
          onClick={() => {
            router.push("/");
            setSearchInput("");
            localStorage.removeItem("inputValue");
            localStorage.removeItem("selectValue");
          }}
        />
        <div
          ref={focusRef}
          onClick={() => setFocused(true)}
          className={`${css.header_search} ${isFocused ? css.header_search__focus : ""}`}
        >
          <SearchIcon />
          <input
            onClick={() => {
              setVisible(true);
            }}
            ref={searchInputRef}
            onKeyDown={search}
            onChange={(e) => {
              handleInput(e);
              if (e.target.value.length > 0) {
                getBarcodesTitles({ variables: { search: e.target.value } });
              }
              setAutoCompleteVisible(true);
              setVisible(false);
            }}
            value={searchInput}
            type="text"
            placeholder="TANDA"
            className={css.header_search_input}
          />
          {searchInput.length > 0 && (
            <button onClick={() => setSearchInput("")} className={css.search_clear_btn}>
              <CloseIcon />
            </button>
          )}
          {isVisible && isClient && searchHistory.length > 0 && searchInput.length === 0 && (
            <SearchList
              listRef={historyListRef}
              items={searchHistory}
              handleItemClick={handleListItemClick}
              handleDeleteItem={handleDeleteListItem}
              type="history"
              icon={<HistoryIcon />}
            />
          )}
          {autoCompleteVisible && data && data?.barcodes.length > 0 && searchInput.length > 0 && (
            <SearchList
              listRef={historyListRef}
              items={data?.barcodes}
              handleItemClick={handleListItemClick}
              type="autoComplete"
              icon={<SearchIcon />}
            />
          )}
        </div>
        <div className={css.header_blocks}>
          <Button
            className={css.header_blocks_button}
            leftIcon={<CallIcon />}
            text="Позвонить"
            variant="icon"
            onClick={() => {
              window.location.href = "tel:+996708773883";
            }}
          />
          <Button
            className={css.header_blocks_button}
            leftIcon={<BasketIcon />}
            text="Корзина"
            variant="icon"
            onClick={handleCartClick}
          >
            {!!count && <span>{count}</span>}
          </Button>
          <div
            onMouseOver={() => {
              setDropDownListVisible(true);
            }}
            onMouseOut={() => {
              setDropDownListVisible(false);
            }}
            className={css.dropdown_wrapper}
          >
            <Button
              className={css.header_blocks_button}
              leftIcon={<UserIcon />}
              text={isLoggedIn ? "Профиль" : "Войти"}
              variant="icon"
              onClick={handleAuthClick}
            />
            {isLoggedIn && dropdownListVisible && (
              <ul className={css.dropdown_list}>
                <li
                  onClick={() => {
                    setDropDownListVisible(false);
                  }}
                >
                  <Link href="/profile">Личный кабинет</Link>
                </li>
                <li onClick={handleLogout}>
                  <span className={css.logout}>Выйти</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {isSignUpModalOpen && <SignUp onClose={() => setIsSignUpModalOpen(false)} />}
    </>
  );
};

export default WebHeader;
