import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const AppointmentsCard = () => {
    return (<Card>
        <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image="https://source.unsplash.com/random?social"
                alt="how heards"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    How Heards
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>);
}

export default AppointmentsCard;