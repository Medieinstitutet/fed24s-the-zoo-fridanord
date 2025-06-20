import type { Animal } from "../types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type Props = {
    animal: Animal;
};

export const AnimalCard = ({ animal }: Props) => {
    const [imgError, setImgError] = useState(false);
    const [lastFed, setLastFed] = useState<string | null>(null);
    const [status, setStatus] = useState<"mätt" | "snartHungrig" | "hungrig">(
      "mätt"
    );

    const getHoursSince = (dateString: string | null): number => {
        if (!dateString) return Infinity;
        const then = new Date (dateString).getTime();
        const now = new Date ().getTime();
        return (now - then) / (1000 * 60 * 60);
    };

    useEffect(() => {
        const fedTime = localStorage.getItem(`fed_${animal.id}`);
        setLastFed(fedTime);

        const hours = getHoursSince(fedTime);

        if (hours >= 5) setStatus("hungrig");
        else if (hours >= 3) setStatus("snartHungrig");
        else setStatus("mätt");
    }, [animal.id]);

    const getStatusChip = () => {
        switch (status) {
            case "mätt":
                return <Chip label="Mätt" color="success" size="small" />;
            case "snartHungrig":
                return <Chip label="Snart hungrig" color="warning" size="small" />;
            case "hungrig":
                return <Chip label="Behöver matas!" color="error" size="small" />;
        }
    };

    return (
        <Card
          component={Link}
          to={`/animals/${animal.id}`}
          sx={{
            textDecoration: "none",
            transition: "transform 0.2s",
            "&:hover": { transform: "scale(1.02)" },
          }}
        >
            <CardMedia
            component="img"
            height="200"
            image={imgError ? "/fallback.jpg" : animal.imageUrl}
            alt={animal.name}
            onError={() => setImgError(true)}
        />
        <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{animal.name}</Typography>
                {getStatusChip()}
            </Box>
            <Typography variant="body2">{animal.shortDescription}</Typography>
        </CardContent>
        </Card>
    );
};