import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { useStyles } from "./views/Login_styles"
import Container from "@material-ui/core/Container"
import React, { useState, useEffect, useContext, InputHTMLAttributes } from "react"
import { useMutation } from "@apollo/react-hooks"
import gql from "../../graphql/query"
import InKo from "inko"
import { useRecoilValue, useRecoilState } from "recoil"
import { UserState } from "../../atoms"

const inko = new InKo()
type KeyboardEvent = {
  target: HTMLInputElement
  key: string
}
export default function LoginComponent({ history }) {
  const classes = useStyles()
  const [ID, setID] = useState("")
  const [password, setPassword] = useState("")
  const [login, { data }] = useMutation(gql.LOGIN)
  const [validationID, setValidationID] = useState(false)
  const [user, setUser] = useRecoilState(UserState)

  if (user) history.replace("/")

  useEffect(() => {
    if (data?.login) {
      localStorage.setItem("token", data.login.token)
      setUser(data.login)
      alert("로그인에 성공했습니다.")
    } else if (data?.login === null) alert("아이디 또는 비밀번호를 잘못 입력했습니다.")
  }, [data, setUser])

  // console.log(validationID)
  // if (loading) return <ProgressModelComponent />

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5"></Typography>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            // pattern={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            error={validationID}
            helperText={validationID ? "이메일 형식으로 입력해주세요." : ""}
            label="이메일 (aaa@rankingworld.com)"
            name="email"
            autoComplete="email"
            autoFocus
            // onChange={(e) => }
            onChange={(e) => {
              let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
              if (regExp.test(e.target.value)) {
                setValidationID(false)
                // 양식 맞음
              } else {
                setValidationID(true)
              }
              setID(e.target.value)
            }}
          />
          <TextField variant="outlined" margin="normal" fullWidth name="password" label="비밀번호" type="password" id="password" onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="로그인 상태 유지" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#413e3e", color: "white" }}
            // color="inherit"
            // className={classes.submit}
            onClick={(e) => {
              e.preventDefault()

              login({ variables: { ID, password: inko.ko2en(password) } })
            }}
          >
            로그인
          </Button>
          <Grid container style={{ marginTop: "20px" }}>
            <Grid item xs>
              <Link className={classes.link} variant="body2">
                비밀번호를 잃어버리셨나요?
              </Link>
            </Grid>
            <Grid item>
              <Link
                className={classes.link}
                onClick={() => {
                  history.push("/signup")
                }}
                variant="body2"
              >
                {"회원가입 하기"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
