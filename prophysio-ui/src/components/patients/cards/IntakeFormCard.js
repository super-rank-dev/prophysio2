import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const IntakeFormCard = ({ onClickCard }) => {
    return (
        <Card>
            <CardActionArea onClick={onClickCard}>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://source.unsplash.com/random?questionnaire"
                    alt="questionnaire"
                />
                <CardContent sx={{ height: 200 }}>
                    <Typography gutterBottom variant="h6" component="div">
                        Intake Form
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        completed by patients during their initial visit or appointment. It provides essential information to healthcare providers about the patient's medical history, symptoms, and current condition.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default IntakeFormCard;