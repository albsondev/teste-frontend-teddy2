import { useCallback, useEffect, useMemo, useState } from "react";
import "./numbered-pager.style.css";

interface NumberedPagerProps {
  pages: number;
}

interface PagesSelectProps {
  page: number | string;
  isSelected: boolean;
}

export function NumberedPager({ pages }: NumberedPagerProps) {
  const [inlinePages, setInlinePages] = useState<PagesSelectProps[]>([]);
  const [selectedPage, setSelectedPage] = useState(1);

  const numberedPages = useMemo(() => {
    let newArr: number[] = [];
    for (let index = pages; index > 0; index--) {
      newArr.push(index);
    }
    return newArr.reverse();
  }, [pages]);

  const pagerHandler = (page: string | number, type: boolean) => {
    if (typeof page === "string") {
      if (type === true) {
        if (
          inlinePages.filter((e) => e.page !== page).length !==
          inlinePages.length - 1
        ) {
          setSelectedPage((old) => old + 2);
        } else {
          setSelectedPage(
            // @ts-ignore
            inlinePages[inlinePages.findIndex((e) => e.page === page) - 1]
              .page + 1
          );
        }
      } else {
        if (
          inlinePages.filter((e) => e.page !== page).length !==
          inlinePages.length - 1
        ) {
          setSelectedPage((old) => old - 2);
        } else {
          setSelectedPage(
            // @ts-ignore
            inlinePages[inlinePages.findIndex((e) => e.page === page) + 1]
              .page - 1
          );
        }
      }
    } else {
      setSelectedPage(page);
    }
  };

  useEffect(() => {
    setInlinePages(
      numberedPages
        .slice(0, 5)
        .map((page: string | number, index) => {
          if (index === 0) {
            return {
              page,
              isSelected: true,
            };
          } else {
            return {
              page,
              isSelected: false,
            };
          }
        })
        .concat([
          {
            page: "...",
            isSelected: true,
          },
          {
            page: numberedPages[numberedPages.length - 1],
            isSelected: false,
          },
        ])
    );
  }, [pages]);

  useEffect(() => {
    if (inlinePages.length === 0) return;
    if (selectedPage >= 6 && selectedPage < pages - 3) {
      setInlinePages([
        {
          page: 1,
          isSelected: false,
        },
        {
          page: "...",
          isSelected: false,
        },
        {
          page: selectedPage - 1,
          isSelected: false,
        },
        {
          page: selectedPage,
          isSelected: true,
        },
        {
          page: selectedPage + 1,
          isSelected: false,
        },
        {
          page: "...",
          isSelected: true,
        },
        {
          page: pages,
          isSelected: false,
        },
      ]);
    }
    if (selectedPage >= pages - 3) {
      setInlinePages([
        {
          page: 1,
          isSelected: false,
        },
        {
          page: "...",
          isSelected: false,
        },
        {
          page: pages - 4,
          isSelected: selectedPage === pages - 4,
        },
        {
          page: pages - 3,
          isSelected: selectedPage === pages - 3,
        },
        {
          page: pages - 2,
          isSelected: selectedPage === pages - 2,
        },
        {
          page: pages - 1,
          isSelected: selectedPage === pages - 1,
        },
        {
          page: pages,
          isSelected: selectedPage === pages,
        },
      ]);
    }
    if (selectedPage <= 5) {
      setInlinePages([
        {
          page: 1,
          isSelected: selectedPage === 1,
        },
        {
          page: 2,
          isSelected: selectedPage === 2,
        },
        {
          page: 3,
          isSelected: selectedPage === 3,
        },
        {
          page: 4,
          isSelected: selectedPage === 4,
        },
        {
          page: 5,
          isSelected: selectedPage === 5,
        },
        {
          page: "...",
          isSelected: true,
        },
        {
          page: pages,
          isSelected: false,
        },
      ]);
    }
  }, [selectedPage]);

  return (
    <div className="pager_wrapper">
      {inlinePages.map(({ page, isSelected }, index) => (
        <div
          key={`pager_page_${index}`}
          className={`pager_item ${
            typeof page === "number" && page === selectedPage ? "selected" : ""
          }`}
          onClick={() => pagerHandler(page, isSelected)}
        >
          {page}
        </div>
      ))}
    </div>
  );
}
