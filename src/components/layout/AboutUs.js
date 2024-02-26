import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography, Box, Grid, Card, CardMedia, CardContent, } from "@mui/material";
const AboutUs = () => {
    return (_jsxs(Box, { className: "container", my: 5, children: [_jsx(Grid, { container: true, children: _jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { variant: "h4", align: "center", color: "#3D0071", gutterBottom: true, children: "About Us" }), _jsx(Typography, { variant: "subtitle1", align: "center", children: "Learn more about our company and team." })] }) }), _jsxs(Grid, { container: true, spacing: 4, mt: 4, children: [_jsxs(Grid, { item: true, md: 6, children: [_jsx(Typography, { variant: "h5", color: "#97014C", gutterBottom: true, children: "Our Mission" }), _jsx(Typography, { children: "Our mission is to provide the best services to our customers with a focus on reliability and innovation." })] }), _jsxs(Grid, { item: true, md: 6, children: [_jsx(Typography, { variant: "h5", color: "#97014C", gutterBottom: true, children: "Our Vision" }), _jsx(Typography, { children: "Our vision is to become a leading company in our industry, known for our commitment to customer satisfaction and excellence in every aspect of our business." })] })] }), _jsx(Grid, { container: true, spacing: 4, mt: 5, children: [
                    {
                        name: "John Doe",
                        title: "CEO & Founder",
                        img: "../../public/images/employees/m1.jpeg",
                    },
                    {
                        name: "Jane Smith",
                        title: "CTO",
                        img: "../../public/images/employees/m2.jpeg",
                    },
                    {
                        name: "Emily Johnson",
                        title: "Lead Designer",
                        img: "../../public/images/employees/m3.jpeg",
                    },
                ].map((member, index) => (_jsx(Grid, { item: true, lg: 4, sm: 6, children: _jsxs(Card, { sx: { height: "100%" }, children: [_jsx(CardMedia, { component: "img", image: member.img, alt: member.name, sx: { width: "100%", height: 250, objectFit: "cover" } }), _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", children: member.name }), _jsx(Typography, { children: member.title })] })] }) }, index))) })] }));
};
export default AboutUs;
