import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Grid, makeStyles, Typography, TextField } from "@material-ui/core";
import { Entities, SearchEntity } from "./types";
import Search from "./search";
import { useRouter } from "next/router";
import InfiniteScrolling from "./infinite-scroll";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(0,0,0,0.5)",
    overflow: "hidden",
  },
  header: {
    height: "60px",
    //   width: "100%",
    backgroundColor: "rgba(255,255,255,0.8)",
    margin: "10px",
    padding: "10px",
  },
}));

export default function Index() {
  const styles = useStyles();
  const router = useRouter();
  const [films, setFilms] = useState<SearchEntity[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [query, setQuery] = useState("");

  const fetchData = async (query: string, page: number) => {
    console.log("Search");
    setQuery(query);
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=b9bd48a6&s={${query}}&page=${page}`
    );
    const data: Entities = await response.json();
    console.log(data);
    if (data.Response === "False") {
      setHasMore(false);
      return;
    }
    const responseData = [...films, ...(data.Search || [])];
    setFilms(responseData || []);
    setPage(page);
    setHasMore(true);
  };

  const updateQuery = async (query: string) => {
    fetchData(query, 1).then();
    setPage(1);
  };

  useEffect(() => {
    fetchData("Avengers", 1).then();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Search onChange={updateQuery} value={"Avengers"} />
      </div>
      {/* <InfiniteScrolling
        hasMore={hasMore}
        loadItems={async (page) => {
          await fetchData(query, page);
        }}
      >
        <Grid
          container
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            //   height: "100%",
            height: "calc(100vh - 100px)",
            flex: 1,
            overflow: "auto",
          }}
        >
          {films.map((_film) => (
            <Grid
              item
              md={3}
              sm={4}
              xs={12}
              style={{ padding: "20px" }}
              onClick={() => router.push(`/details/${_film.imdbID}`)}
            >
              <div style={{ backgroundColor: "rgba(0,0,0,0.6)", width: "80%" }}>
                <img
                  src={
                    _film.Poster && _film.Poster !== "N/A"
                      ? _film.Poster
                      : "https://m.media-amazon.com/images/M/MV5BODMzMWJlMzAtNGNlZi00NzdiLTgxNTctYTdkYTA4NjcwNTBkXkEyXkFqcGdeQXVyMjQwOTYxODQ@._V1_SX300.jpg"
                  }
                  // layout={"fill"}
                  style={{ height: "300px", maxHeight: "300px", width: "100%" }}
                />
                <Typography
                  style={{ color: "white", margin: "20px 10px 10px 10px" }}
                >
                  {_film.Title}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </InfiniteScrolling> */}
      <InfiniteScrolling
        hasMore={hasMore}
        loadItems={async (page) => {
          await fetchData(query, page);
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {films.map((_film) => (
            <div
              style={{ padding: "20px", width: "300px" }}
              onClick={() => router.push(`/details/${_film.imdbID}`)}
            >
              <div style={{ backgroundColor: "rgba(0,0,0,0.6)", width: "80%" }}>
                <img
                  src={
                    _film.Poster && _film.Poster !== "N/A"
                      ? _film.Poster
                      : "https://m.media-amazon.com/images/M/MV5BODMzMWJlMzAtNGNlZi00NzdiLTgxNTctYTdkYTA4NjcwNTBkXkEyXkFqcGdeQXVyMjQwOTYxODQ@._V1_SX300.jpg"
                  }
                  // layout={"fill"}
                  style={{ height: "300px", maxHeight: "300px", width: "100%" }}
                />
                <Typography
                  style={{ color: "white", margin: "20px 10px 10px 10px" }}
                >
                  {_film.Title}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScrolling>
    </div>
  );
}
