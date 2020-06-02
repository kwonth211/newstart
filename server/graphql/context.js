import users from "./users"

const context = ({ req }) => {
  const token = req.headers.authorization || ""
  // 로그인되어 있지 않거나 로그인 토큰이 없을 때

  console.log(req.user)

  if (token.length != 64) return { user: null }

  const user = users.find((user) => user.token === token)

  console.log(user)
  return { user }
}

export default context
