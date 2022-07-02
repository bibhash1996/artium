import { useEffect, useRef, useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Dialog,
  TextField,
  Icon,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBar: {
      width: "100%",
      height: "60px",
    },
    dialog: {
      borderRadius: "3px",
      position: "absolute",
      top: 50,
    },
    dialogContent: {
      backgroundColor: "white",
      minHeight: "200px",
      maxHeight: "500px",
      overflow: "auto",
    },
    search: {
      fontSize: "22px",
      borderRadius: "3px",
      width: "100%",
      height: "100%",
      backgroundColor: "transparent",
      paddingRight: "10px",
    },
    searchIcon: {
      fontSize: "24px",
      color: "rgba(0,0,0,0.4)",
      marginLeft: "16px",
      marginRight: "8px",
      // opacity: 0.67,
    },
    searchContainer: {
      height: "60px",
      display: "flex",
      alignItems: "center",
      borderBottom: `1px solid rgba(0,0,0,0.4)`,
    },
    inputRoot: {
      width: "100%",
      display: "flex",
      height: "100%",
      justifyContent: "center",
    },
    option: {
      width: "100%",
      paddingLeft: "20px",
      paddingRight: "20px",
      marginTop: "6px",
      marginBottom: "6px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      cursor: "pointer",
    },
  })
);

export default function Search(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  const classes = useStyles();
  const [focused, setFocused] = useState(false);
  const [input, setInput] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    setInput(props.value);
  }, []);

  return (
    <TextField
      ref={ref}
      autoFocus
      value={input}
      placeholder={"Search movie"}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        // props.onChange(input);
      }}
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          setFocused(false);
          props.onChange(input);
          if (ref.current) (ref.current as any).blur();
        }
      }}
      InputProps={{
        disableUnderline: true,
        className: classes.search,
        // startAdornment: (

        // ),
      }}
      classes={{
        root: classes.inputRoot,
      }}
      onChange={(e) => {
        // props.onChange(e.target.value);
        setInput(e.target.value);
      }}
    />
  );
}
