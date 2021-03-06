import React from "react"
import { Theme, makeStyles, createStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { Link } from "react-router-dom"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { purple } from "@material-ui/core/colors"
import Button from "@material-ui/core/Button"

// import icon from "../media/icons1.png";
let vsIcon = require("./../../../media/vs.jpg")
let analysis = require("./../../../media/analysis.jpg")
let review = require("../.././../media/board.jpg")
let vote = require("./../../../media/vote.png")

const images = [
  // {
  //   url: vote,
  //   title: "투표하러 가기",
  //   width: "23%",
  //   route: "/vote",
  //   text: (
  //     <div>
  //       <h4>
  //         본인만의 인생 영화를
  //         <br /> 투표하고 공유하세요!
  //       </h4>
  //     </div>
  //   ),
  // },
  {
    url: vsIcon,
    title: "영화 대 영화",
    width: "23%",
    route: "/vs",
    text: (
      <div>
        <h4>
          장르별 영화 월드컵을 <br /> 진행해보세요!
        </h4>
      </div>
    ),
  },
  {
    url: analysis,
    title: "통계 보러가기",
    width: "23%",
    route: "/analysis",
    text: (
      <div>
        <h4>
          영화 투표 통계를 <br /> 확인해보세요!
        </h4>
      </div>
    ),
  },
  //   <EditIcon></EditIcon>,
  {
    url: review,
    title: "자유 게시판",
    width: "23%",
    route: "/borad",
    text: (
      <div>
        <h4>
          인생영화 후기를 <br /> 작성하고 공유하세요!
        </h4>
      </div>
    ),
  },
  // {
  //   url: "",
  //   // "https://lh3.googleusercontent.com/proxy/hJ4DPYa5Jp8aUBtmpM440FJr2mq1B704Rn6cElbrapNUTQsxeY_NQJW3ecW9t7XKQ-TCImt3zvPrRHJL8a4DkR5tPNvibyim7qdiviSvcmCIZ_NDYzN8",
  //   title: "자유 게시판",
  //   width: "23%",
  //   route: "/borad",
  // },
]

const theme = createMuiTheme({
  palette: {
    primary: purple,
  },
  typography: {
    // fontFamily: "MapoGoldenPier !important",
    fontFamily: "Noto Sans KR !important",
  },
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // display: "flex",
      // flexWrap: "wrap",
      // minWidth: 400,
      // backgroundColor: "white",
      // width: "200px",
      // paddingLeft: "0px",
      // height: "500px",
      // paddingBottom: "10px",
      // paddingLeft: "20px",
      // marginLeft: "px",
      height: "220px",
      // marginBottom: "25px",
      boxShadow: theme.shadows[5],
    },
    image: {
      // position: "relative",
      height: "300px",
      width: "300px",
      // margin: "5px",

      [theme.breakpoints.down("xs")]: {
        width: "80% !important", // Overrides inline-style
        height: "80",
      },
    },
    focusVisible: {},
    imageButton: {
      left: 0,
      right: 0,
      top: 0,
      color: "black",
      borderRadius: "30px",
    },
    imageSrc: {
      position: "absolute",
      width: "75%",
      height: "60%",
      left: 100,
      right: 0,
      top: 55,
      bottom: 0,

      backgroundSize: "cover",
      borderRadius: "30px",
    },
    imageBackdrop: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 0.4,
      borderRadius: "30px",
    },
    imageTitle: {
      fontWeight: "bold",

      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      bottom: -2,
    },
    slide: {
      height: "500px",
    },
    title: {
      float: "left",
      display: "inlineFlex",
      verticalAlign: "middle",
      position: "absolute",
      width: "50%",
      height: "50%",
      left: 150,
      right: 0,
      top: 10,
      bottom: 0,
    },
  })
)

export default function ButtonBases() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Carousel
        ref={(ref) => {
          // carRef = ref
        }}
        // key={"key1"}
        className={"slide"}
        // showArrows={true}
        infiniteLoop={true}
        transitionTime={500}
        interval={4000}
        autoPlay={true}
      >
        {images.map((image, i) => {
          return (
            <div key={i}>
              <div className={classes.title}>
                <ThemeProvider theme={theme}>
                  <Typography style={{ marginBottom: "-20px", fontSize: "30px" }} component="h4" variant="h5" align="center">
                    {/* Movie Ranking 본인만의 인생 영화를 <br />
                  투표하고 공유하세요! */}
                    {image.text}
                  </Typography>

                  <Link style={{ textDecoration: "none" }} to={image.route}>
                    <Button
                      variant="contained"
                      style={{
                        fontSize: "15px",
                        background: "rgb(97,200,142)",
                        color: "white",
                      }}
                    >
                      <div style={{ fontWeight: "bold" }}>{image.title}</div>
                    </Button>
                  </Link>
                </ThemeProvider>
              </div>

              <Button
                // focusRipple
                key={image.title}
                className={classes.image}
                disabled
              >
                <div>
                  <span
                    className={classes.imageSrc}
                    style={{
                      backgroundImage: `url(${image.url})`,
                    }}
                  />
                  {/* <span className={classes.imageBackdrop} /> */}
                  {/* <span className={classes.imageButton}> */}
                  <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
                    <span className={classes.imageMarked} />
                  </Typography>

                  {/* </span> */}
                </div>
              </Button>
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}
