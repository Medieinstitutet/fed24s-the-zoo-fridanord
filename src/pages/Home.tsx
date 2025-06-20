import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <Box textAlign="center" mt={5}>
            <Typography variant="h3" gutterBottom>
                Välkommen till vårat Zoo!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Träffa djuren och lär mer om dom.
            </Typography>
            <Button
                variant="contained"
                component={Link}
                to="/animals"
                sx={{ mt: 2 }}
            >
                Utforska djuren!
            </Button>
        </Box>
    );
};