import { Typography, makeStyles, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Movie } from "./types";

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
    display: "flex",
    alignItems: "center",
  },
  subheading: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 10px 10px 10px",
  },
}));

function SubHeading(props: { heading: string; value: string }) {
  const styles = useStyles();

  return (
    <div className={styles.subheading}>
      <Typography style={{ color: "yellow" }}>{props.heading}</Typography>
      <Typography style={{ color: "white" }}>{props.value}</Typography>
    </div>
  );
}

export default function Details() {
  const router = useRouter();
  const styles = useStyles();

  const [movie, setMovie] = useState<Movie | null>(null);

  const fetchData = async () => {
    console.log("Search");
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=b9bd48a6&i=${router.query.id}`
    );
    const data: Movie = await response.json();
    console.log(data);
    setMovie(data);
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  return (
    <div className={styles.root}>
      {movie && (
        <>
          <div className={styles.header}>
            <Typography>Details</Typography>
          </div>
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
              padding: 10,
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              style={{ position: "relative", height: "600px" }}
            >
              <img
                src={
                  movie.Poster && movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://m.media-amazon.com/images/M/MV5BODMzMWJlMzAtNGNlZi00NzdiLTgxNTctYTdkYTA4NjcwNTBkXkEyXkFqcGdeQXVyMjQwOTYxODQ@._V1_SX300.jpg"
                }
                // layout={"fill"}
                style={{ height: "600px", maxHeight: "600px", width: "100%" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: "60px",
                  backgroundColor: "rgba(0,0,0,0.8)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography style={{ color: "white", fontSize: "20px" }}>
                  {movie.Title}
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <SubHeading heading="Genre" value={movie.Genre} />
              <SubHeading heading="Running Time" value={movie.Runtime} />
              <SubHeading heading="IMDB Rating" value={movie.imdbRating} />
              <SubHeading heading="Plot" value={movie.Plot} />
              <SubHeading heading="Actors" value={movie.Actors} />
              <SubHeading heading="Writers" value={movie.Writer} />
              <SubHeading heading="Awards" value={movie.Awards} />
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}
