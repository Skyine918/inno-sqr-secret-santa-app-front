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

export default function InvitationCard(props) {
    return (
        <Card sx={{ minWidth: 275, marginBottom: "1em" }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Group created 21.12.2021
                </Typography>
                <Typography variant="h5" component="div">
                    Invitation to: {props.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Total members: {props.totalMembers}
                </Typography>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Alexander Trushin"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                    </Typography>
                                    {" Group creator"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
            </CardContent>
            <CardActions sx={{marginBottom: "1em"}}>
                <Button variant="contained" color="success">
                    Accept
                </Button>
                <Button variant="outlined" color="error">
                    Decline
                </Button>
            </CardActions>
        </Card>
    );
}