import { Box, Typography, useTheme, useMediaQuery, } from "@mui/material"
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      
      <Box
      width="100%"
      backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
      textAlign="centere"
      >
        <Typography
          fontFamily="Tangerine, sans-serif"
          fontWeight="1000"
          fontSize="32px"
          color="primary"
        >
        Mash
        </Typography>
      </Box>

      <Box
      width={isNonMobileScreens? "50%" : "93%"}
      p="2rem"
      m="2rem auto"
      borderRadius="1.5em"
      backgroundColor={theme.palette.background.alt}
      >
        <Typography
        fontWeight="500" variant="h5" sx={{mb: "1.5rem"}}
        >
          Peace From Mash
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage