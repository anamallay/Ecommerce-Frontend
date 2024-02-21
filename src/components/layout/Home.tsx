import { Box, Typography, Button, styled, keyframes } from "@mui/material";


const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const fadeInUp = keyframes`
  from {
    transform: translate3d(0, 40px, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

const customFontFamily = "Sixtyfour"; 


const HeroSection = styled(Box)(({ theme }) => ({
  height: "90vh",
  backgroundImage: 'url("../../public/images/home.webp")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center", 
  color: theme.palette.common.white,
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  fontFamily: customFontFamily,
  "& h1": {
    fontSize: "3em",
    marginBottom: theme.spacing(2),
    animation: `${pulse} 2s infinite, ${fadeInUp} 1s ease-out forwards`,
    animationDelay: "0.5s",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  "& p": {
    fontSize: "1.5em",
    maxWidth: "600px",
    textAlign: "center",
    animation: `${fadeInUp} 1s ease-out forwards`,
    animationDelay: "0.7s",
  },
}));

const HeroButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  fontSize: "1em",
  color: theme.palette.common.white,
  backgroundColor: "#ff468a",
  "&:hover": {
    backgroundColor: "#ff0c65",
    opacity: 1,
  },
  marginTop: theme.spacing(2.5),
  transition: "background-color 0.3s ease",
  opacity: 0.6,
  borderRadius: "5px",
  fontFamily: customFontFamily,
}));

const Home = () => {
  return (
    <div id="home">
      <HeroSection>
        <Typography
          variant="h4"
          component="h4"
          style={{ fontFamily: customFontFamily }}>
          Escape to Your Digital Paradise
        </Typography>
        <Typography variant="body1" style={{ fontFamily: customFontFamily }}>
          Immerse yourself in a realm where innovation meets tranquility.
          Discover a sanctuary crafted for your digital well-being.
        </Typography>
        <div>
          <HeroButton>Start Your Journey</HeroButton>
        </div>
      </HeroSection>
    </div>
  );
};

export default Home;
