import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const MissingNotesCard = ({ imageLoaded, setImageLoaded }) => {
    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://source.unsplash.com/random?notes"
                    alt="missing notes"
                    onLoad={() => setImageLoaded({ ...imageLoaded, missingNotes: true })}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        Missing Notes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default MissingNotesCard;