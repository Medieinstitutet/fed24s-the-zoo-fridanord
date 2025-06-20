import { NavLink } from "react-router-dom";
import { Button, Stack } from "@mui/material";

export const Navigation = () => {
    return (
        <Stack direction="row" spacing={3}>
            <Button component={NavLink} to="/" color="inherit">
              Hem
            </Button>
            <Button component={NavLink} to="/animals" color="inherit">
              Djur
            </Button>
            
        </Stack>
    )
}
