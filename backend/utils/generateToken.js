import  jwt  from "jsonwebtoken";

const generateTokens = (res, userId) => {
  //access token
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET , {
    expiresIn: '10m',
  });

  // //refresh token
  // const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET , {
  //   expiresIn: '1d',
  // });

  res.cookie('accessJwt', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV ==='production',  
    sameSite: 'None',
    path: '/',
    maxAge: 1 * 24 * 60 * 60 * 1000,  // 1 day in milliseconds
  });
  
}

export default generateTokens;  
