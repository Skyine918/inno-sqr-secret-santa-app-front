import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Chip } from '@mui/material'; 

export default function GroupCard(props) {

    console.log(props)
    return (
        <Card sx={{ minWidth: 275, marginBottom: "1em" }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.name}
                    
                    <Button variant="contained" color="primary" sx={{marginLeft: "1em"}}>
                    More
                    </Button>
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Group created 21.12.2020
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Event ends in {props.date}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Event holds in {props.place}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Total members: {props.totalMembers}
                </Typography>
                {
                  props.current ? <Chip label="Now" color="warning" />:  <Chip label="Finished" color="primary" />
                }

            </CardContent>
        </Card>
    );
}