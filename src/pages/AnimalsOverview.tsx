import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { AnimalCard } from "../components/AnimalCard";
import type { Animal } from "../types";


export const AnimalsOverview = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);

    useEffect(() => {
        fetch("https://animals.azurewebsites.net/api/animals")
         .then((res) => res.json())
         .then((data) => setAnimals(data))
         .catch((err) => console.error("Fel vid hämtning av djur:", err));
    }, []);

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Djuröversikt
            </Typography>

            {animals.length === 0 ? (
                <Typography textAlign="center" mt={4} color="text.secondary">
                    Inga djur hittades.
                </Typography>
            ) : (
                <Box
                  display="grid"
                  gridTemplateColumns={{
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr 1fr",
                  }}
                  gap={2}
                >
                 {animals.map((animal) => (
                    <Box key={animal.id}>
                        <AnimalCard animal={animal} />
                    </Box>
                 ))}
            </Box>
            )}
        </Box>
    );
};