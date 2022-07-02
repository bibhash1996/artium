import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from "@material-ui/core";

type InfiniteScrollPaginationProps = {
  children?: React.ReactNode;
  hasMore: boolean;
  loadItems: (page: number) => Promise<void>;
};

export default function InfiniteScrollPagination(
  props: InfiniteScrollPaginationProps
) {
  return (
    <div
      style={{
        maxHeight: "100vh",
        height: "100%",
        width: "100%",
        overflow: "auto",
      }}
    >
      <InfiniteScroll
        pageStart={0}
        loadMore={props.loadItems}
        hasMore={props.hasMore}
        useWindow={false}
        loader={
          <div
            key={"Key"}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "16px",
              backgroundColor: "transparent",
            }}
          >
            <CircularProgress size={"24px"} />
          </div>
        }
      >
        {props.children}
      </InfiniteScroll>
    </div>
  );
}
