import { AppBar, Toolbar, Typography } from "@mui/material";
import { Navigation } from "./Nav"

export const Header = () => {
    return (
        <AppBar position="static" color="default" sx={{ px: 2}}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" component="div">
                    Zoo
                </Typography>
                <Navigation />
            </Toolbar>
        </AppBar>
    )
}