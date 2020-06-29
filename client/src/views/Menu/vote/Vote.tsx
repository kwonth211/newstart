import Checkbox from "@material-ui/core/Checkbox"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import { makeStyles } from "@material-ui/core/styles"
import React, { useState, useEffect, useContext, useRef, MutableRefObject, RefObject, useCallback } from "react"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import ButtonBase from "@material-ui/core/ButtonBase"
import { IMovie } from "../../../interface/IMovie"
import MoreIcon from "@material-ui/icons/MoreVert"
import { IconButton } from "@material-ui/core"
import "./vote.css"
import { AllMovieState } from "../../../atoms"
import { useRecoilValue, useRecoilState } from "recoil"
import useReactRouter from "use-react-router"
import { useQuery, useLazyQuery } from "@apollo/react-hooks"
import gql from "./../../../graphql/query"

import Paper from "@material-ui/core/Paper"
import Divider from "@material-ui/core/Divider"
import SearchIcon from "@material-ui/icons/Search"
import { useStyles } from "./style"
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />
const blackStar = require("./../../../media/blackStar.png")

export default function VoteComponent() {
  const classes = useStyles()

  const { history, location, match } = useReactRouter()
  // const allMovieList = useRecoilValue<IMovie[]>(AllMovieState)
  const [movieList, setMovieList] = useState<IMovie[]>([])
  const [getMovieAll, { called, loading, data }] = useLazyQuery(gql.GETMOVIEALL)

  useEffect(() => {
    getMovieAll()
    if (data?.getMovieAll) {
      // allMovieList = data.getMovieAll
      setMovieList(data.getMovieAll.slice(0, 10))
      // setAllMovie(data.getMovieAll)
    }
  }, [data])

  const setMovieListCallback = useCallback(
    (param) => {
      return setMovieList(param)
    },
    [movieList]
  )

  // const setMovieListCallback = (param) => {
  //   debugger
  //   setMovieList(param)
  // }

  const searchDetail = () => {}
  const movieDetail = (e) => {
    const tagName = e.target.tagName
    if (tagName !== "IMG") {
      if (tagName === "svg") {
        // popup? 나옴
      } else {
        //페이지 이동

        history.push({ pathname: "/movieDetail", search: "?query=" + encodeURI(e.currentTarget.innerText.split("\n")[0]) })
      }
    }
  }

  console.log(movieList)

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}

        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <div style={{ marginLeft: "130px" }}>
              <Typography component="h5" variant="h5" color="textPrimary" gutterBottom>
                권태훈 님 , 인생영화를 검색 또는 태그해주세요
              </Typography>
            </div>
            {/* <Typography variant="h6" color="textSecondary" paragraph>
                최종 선택 1개의 영화가 투표권수 1개 입니다.
              </Typography> */}
            <div className={classes.heroButtons}>
              <Grid container spacing={8} justify="flex-start">
                <Grid item>
                  <CheckboxesTags callback={setMovieListCallback} />
                </Grid>
                {/* <Grid item>
                  <div className={"count"}></div>
                </Grid> */}
              </Grid>
            </div>
          </Container>
        </div>
        {/* <Container className={classes.cardGrid}  maxWidth="sm"> */}
        <Container className={classes.cardGrid}>
          {movieList.map((iter: IMovie, i) => (
            <Grid key={i} onClick={movieDetail} className={classes.carMapContainer} container spacing={3}>
              <Grid item>
                <ButtonBase onClick={searchDetail} className={classes.image}>
                  <img className={classes.img} alt="noImage" src={iter?.imgUrl?.indexOf("https://") === -1 ? "https://" + iter.imgUrl : iter.imgUrl} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} md container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {iter.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {iter.genre.map((v, idx) => (idx === iter.genre.length - 1 ? v : v + " | "))}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {iter.year}년 개봉
                    </Typography>
                    <Typography variant="body2" color="textSecondary"></Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ cursor: "pointer" }}>
                      득표수 : {iter.votes}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item className={classes.star}>
                  <Typography variant="subtitle2" style={{ cursor: "pointer" }}>
                    <img className={classes.starImage} alt="noImage" src={blackStar} />
                  </Typography>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <Typography variant="subtitle2" style={{ cursor: "pointer" }}>
                    <IconButton
                      aria-label="show more"
                      // aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      // onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MoreIcon />
                    </IconButton>
                    {/* </ButtonBase> */}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Container>
      </main>
      {/* Footer */}
      {/* <footer className={classes.footer}>
        <Copyright />
      </footer> */}
      {/* End footer */}
    </React.Fragment>
  )
}

export const CheckboxesTags: React.FunctionComponent<{
  callback: Function
}> = ({ callback }) => {
  const allMovieList = useRecoilValue<IMovie[]>(AllMovieState)

  const [hashTagList, setHashTagList] = useState<IMovie[]>([])

  let [selectList, setSelectList] = useState<IMovie[]>([]) //

  const [textField, setTextField] = useState("")
  const classes = useStyles()

  let autoCompleteRef = React.useRef<any | null>(null)

  return (
    <Autocomplete
      multiple
      ref={(e: RefObject<any>) => {
        autoCompleteRef.current = e
      }}
      id="checkboxes-tags-demo"
      options={hashTagList}
      onClose={(e) => {}}
      onChange={(_, v) => {
        console.log(v)
        callback(v)
      }}
      filterSelectedOptions
      filterOptions={(r) => {
        return r
      }}
      getOptionLabel={(option) => {
        // return option.name
        // if (typeof option == "object") {
        return option.name.replace(/\s/gi, "")
        // } else {
        // return hashTagList[0] ? hashTagList[0].name : ""
        // }
      }}
      renderOption={(option, { selected }) => {
        return <React.Fragment>{option.name}</React.Fragment>
      }}
      style={{ width: "650px", marginLeft: "30px" }}
      renderInput={(params) => {
        return (
          <Paper className={classes.root}>
            <TextField
              {...params}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
              style={{ textDecoration: "none" }}
              className={classes.input}
              onKeyDown={(e) => {
                if (e.keyCode == 13) {
                  if (autoCompleteRef?.current?.ariaExpanded == "false") {
                    //검색 도움창이 닫혀있을때
                    console.log(selectList)
                    debugger
                    callback(selectList)
                  } else {
                    // setSelectList([hashTagList[0]])
                  }
                }
              }}
              onChange={(e) => {
                setTextField(e.target.value)
                if (e.target.value) {
                  const filterData = allMovieList.filter((iter) => {
                    if (iter.name.indexOf(e.target.value.replace(/\s/gi, "")) !== -1 || iter.name.replace(/\s/gi, "").indexOf(e.target.value) !== -1 || iter.name.indexOf(e.target.value) !== -1 || iter.name.replace(/\s/gi, "").indexOf(e.target.value.replace(/\s/gi, "")) !== -1) {
                      return iter
                    }
                  })

                  setHashTagList(filterData)
                }
              }}
            />

            <Divider className={classes.divider} orientation="vertical" />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon
                onClick={(e) => {
                  callback(selectList)
                }}
              />
            </IconButton>
          </Paper>
        )
      }}
    />
  )
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}
