import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const PersonalInfoCard = ({ onClickCard }) => {
    return (
        <Card>
            <CardActionArea onClick={onClickCard}>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://source.unsplash.com/random?profile"
                    alt="profile"
                />
                <CardContent sx={{ height: 200 }}>
                    <Typography gutterBottom variant="h6" component="div">
                        Personal Information
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        includes details about their identity, contact information, and demographic data. This information.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default PersonalInfoCard;