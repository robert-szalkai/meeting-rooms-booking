import { createTheme } from "@mui/material/styles";

const heightButton = "50px";
const colorButton = "#7A7CFF";
const heightTabletButton = "30px";
const widthTableButton = "150px";
const widthRoundedTableButton = "200px";
const heightRoundedTableButton = "30px";
const cardWidth="400px";
const cardHeight="200px"
const GlobalTheme = createTheme({
    components: {
        MuiButton: {
            variants: [
                {
                    //green square button
                    props: { variant: "outlined", color: "success" },
                    style: {
                        height: heightTabletButton,
                        width: widthTableButton,
                        color: "#40A368",
                        borderColor: "#40A368",
                    },
                },
                {
                    //yellow square button
                    props: { variant: "outlined", color: "warning" },
                    style: {
                        height: heightTabletButton,
                        width: widthTableButton,
                        color: "#BCA900",
                        borderColor: "#BCA900",
                    },
                },
                {
                    // yellow rounded button with green boredr
                    props: { variant: "contained", color: "warning" },
                    style: {
                        height: heightRoundedTableButton,
                        width: widthRoundedTableButton,
                        backgroundColor: "#BCA900",
                        borderRadius: "20px",
                        ":focus": "#BCA900",
                    },
                },
                {
                    // red rounded button with green boredr
                    props: { variant: "contained", color: "error" },
                    style: {
                        height: heightRoundedTableButton,
                        width: widthRoundedTableButton,
                        backgroundColor: "#DD6764",
                        borderRadius: "20px",
                        ":focus": "#BCA900",
                    },
                },

                {
                    // green rounded button with green boredr
                    props: { variant: "contained", color: "success" },
                    style: {
                        height: heightRoundedTableButton,
                        width: widthRoundedTableButton,
                        backgroundColor: "#40A368",
                        borderRadius: "20px",
                        ":focus": "#40A368",
                    },
                },
                {
                    //not avaible square button
                    props: { variant: "outlined", color: "info" },
                    style: {
                        height: heightTabletButton,
                        width: widthTableButton,
                        backgroundColor: "#EEEEEE",
                        borderColor: "#EEEEEE",
                        color: "white",
                    },
                },
                {
                    // white rounded button with black boreder
                    props: { variant: "outlined", color: "primary" },
                    style: {
                        height: heightRoundedTableButton,
                        width: widthRoundedTableButton,
                        backgroundColor: "white",
                        borderColor: "black",
                        borderRadius: "20px",
                        color: "black",
                    },
                },
            ],
            styleOverrides: {
                root: ({ theme, ownerState }) => ({
                    ...(ownerState.variant === "outlined" && {
                        height: heightButton,
                        color: colorButton,
                        borderColor: colorButton,
                    }),
                    ...(ownerState.variant === "contained" && {
                        height: heightButton,
                        backgroundColor: colorButton,
                    }),
                }),
            },
        },
        MuiCard: {
            variants: [{ props: { variant: "outlined" }, style: {
                width:cardWidth,
                height:cardHeight,
                boxShadow:"rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
                padding:"30px",
                borderRadius:"50px"
            } }],
        },
    },
});


export default GlobalTheme;
