import type { Animal } from "../types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Button,
    Alert
} from "@mui/material";


export const AnimalDetails = () => {
    const { id } = useParams();
    const [animal, setAnimal] = useState<Animal | null>(null);
    const [imgError, setImgError] = useState(false);
    const [loading, setLoading] = useState(true);
    const[lastFed, setLastFed] = useState<string | null>(null);

    const getHoursSince = (timeString: string | null): number => {
        if (!timeString) return Infinity;
        const then = new Date(timeString).getTime();
        const now = new Date().getTime();
        const diffMs = now - then;
        return diffMs / (1000 * 60 * 60); //Funktion för att räkna ut timmar
    }

    useEffect(() => {
        fetch(`https://animals.azurewebsites.net/api/animals/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setAnimal(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Fel vid hämtning av djur:", err);
            setLoading(false);
        });
    }, [id]);

    useEffect(() => {
        const fedTime = localStorage.getItem(`fed_${id}`);
        setLastFed(fedTime);
    }, [id]);

    const hoursSinceFed = getHoursSince(lastFed);
    const canFeed = hoursSinceFed >= 4;
    const almostHungry = hoursSinceFed >= 3 && hoursSinceFed < 4;

    const handleFeed = () => {
        const now = new Date().toISOString();
        localStorage.setItem(`fed_${id}`, now)
        setLastFed(now);
    }

    if (loading) {
        return <CircularProgress />
    }

    if (!animal) {
        return <Typography>Djuret kunde inte laddas.</Typography>;
    }

    return (
        <Box p={3}>
            <Card>
                <CardMedia
                    component="img"
                    height="300"
                    image={imgError ? "/fallback.jpg" : animal.imageUrl}
                    alt={animal.name}
                    onError={() => setImgError(true)}
                    />
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {animal.name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {animal.longDescription}
                        </Typography>

                        {almostHungry && (
                            <Alert severity="warning" sx={{ mt: 2}}>
                                {animal.name} börjar bli hungrig!
                            </Alert>
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleFeed}
                            disabled={!canFeed}
                             sx={{ mt: 2 }}
                        >
                            Mata {animal.name}
                        </Button>
                        {lastFed && (
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                                Senast matad: {new Date(lastFed).toLocaleString("sv-SE")}
                            </Typography>
                        )}
                    </CardContent>
            </Card>
        </Box>
    );
};