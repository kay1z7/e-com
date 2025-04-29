import { useRouter } from "next/navigation";

import { CloseButtonByIndex } from "@/src/components/closeButton/CloseButtonByIndex";

import css from "./SearchList.module.scss";

interface SearchListProps {
  listRef?: React.RefObject<HTMLUListElement> | null;
  items: (string | { id: string; title: string })[];
  handleItemClick: (title: string, type: string) => void;
  handleDeleteItem?: (index: number) => void;
  icon: React.ReactNode;
  type: string;
}

const SearchList = ({
  listRef = null,
  items,
  handleItemClick,
  handleDeleteItem,
  icon,
  type,
}: SearchListProps) => {
  const router = useRouter();

  return (
    <ul ref={listRef && listRef} className={css.history_list}>
      {items.map((item, index) => {
        const title = typeof item === "string" ? item : item.title;
        return (
          <li key={typeof item === "string" ? index : item.id}>
            <div
              onClick={() => {
                handleItemClick(title, type);
                router.push(`?${title.toString()}`, { scroll: false });
              }}
              className={css.history_wrapper}
            >
              <div>{icon}</div>
              <span>{title}</span>
            </div>
            {handleDeleteItem && <CloseButtonByIndex handle={handleDeleteItem} index={index} />}
          </li>
        );
      })}
    </ul>
  );
};

export default SearchList;
