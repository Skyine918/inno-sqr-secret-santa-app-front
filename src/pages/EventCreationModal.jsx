import React, {useState} from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SantaTextField from "../ui/SantaMemberEmailField";
import {createEvent} from "../api/events";
import {getAuth} from "@firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function EventCreationModal(props) {

    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);

    const [formIsLoading, setFormIsLoading] = useState(false)
    const [fieldEmails, setFieldEmails] = useState([])
    const [fieldEventName, setFieldEventName] = useState(null)
    const [fieldEventLocation, setFieldEventLocation] = useState(null)
    const [fieldEventDate, setFieldEventDate] = useState(null)
    const [formValidationErrors, setFormValidationErrors] = useState({})

    const pushEmailField = () => {
        const newFields = [...fieldEmails]
        newFields.push({value: ""})
        setFieldEmails(newFields);
    }

    const removeEmailField = () => {
        const newFields = [...fieldEmails]
        newFields.pop()
        setFieldEmails(newFields);
    }

    const onClickCreateEvent = async () => {
        if (fieldEmails.length === 0) {
            setFormValidationErrors({members: "Please specify at least 1 email"})
            return
        }

        setFormIsLoading(true)
        setFormValidationErrors({})
        try {
            await createEvent(user, fieldEventName, fieldEventDate, fieldEventLocation, fieldEmails.map(e => e.value))
            props.refetch()
            props.setOpen(false)
        } catch (error) {
            console.log(error.response.data.message)
            if (error.response) {
                if (error.response.status === 400) {

                    setFormValidationErrors(error.response.data.message)
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        } finally {
            setFormIsLoading(false)
        }
    }

    return <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{marginBottom: '1em'}}>
                Create Secret Santa Event
            </Typography>

            <SantaTextField
                margin="normal"
                required
                fullWidth
                id="santa-event-name"
                size="small"
                label="Event Name"
                name="Event Name"
                autoComplete="santa-event-name"
                autoFocus
                onChange={(e) => {setFieldEventName(e.target.value)}}
                helperText={!!formValidationErrors && formValidationErrors.name !== undefined ? formValidationErrors.name : ''}
                error={!!formValidationErrors.name}
            />

            <SantaTextField
                margin="normal"
                required
                fullWidth
                size="small"
                id="santa-event-location"
                label="Event Location"
                name="Event Location"
                autoComplete="santa-event-location"
                autoFocus
                onChange={(e) => {setFieldEventLocation(e.target.value)}}
                helperText={(!!formValidationErrors && formValidationErrors.location !== undefined) ? formValidationErrors.name : ''}
                error={(!!formValidationErrors && formValidationErrors.location !== undefined)}
            />

            <input style={{textAlign: "center", width: "100%", height: '3em', marginTop: "8px"}} type="date" id="gift_date" name="trip-start"
                   min="2021-12-29" max="2027-12-29" onChange={(e) => {setFieldEventDate(e.target.value)}}/>
            {(!!formValidationErrors && formValidationErrors.gift_date !== undefined)
                ? <Alert severity="error">
                    <AlertTitle>Date: {formValidationErrors.gift_date}</AlertTitle>
                </Alert>
                : <div></div>
            }


            <div style={{display: "flex", justifyContent: "space-between", padding: '8px', borderBottom: "2px solid black"}}>
                {fieldEmails.length <= 10 ? <Button variant="contained" color="secondary" onClick={pushEmailField}>
                    Add email
                </Button> : <Button variant="contained" color="secondary" disabled>
                    10 emails limit
                </Button>}

                {fieldEmails.length === 0 ? <Button variant="contained" color="secondary" disabled>
                    Remove email
                </Button> : <Button variant="contained" color="secondary" onClick={removeEmailField}>
                    Remove email
                </Button>}
            </div>

            <div style={{maxHeight: "200px", overflowY: "overlay"}}>
                {fieldEmails.map((f, i) =>
                    <SantaTextField
                        size="small"
                        key={i}
                        margin="normal"
                        required
                        fullWidth
                        id={'email' + i}
                        label={'Member Email #' + i}
                        name={'Email #' + i}
                        autoComplete={"santa-event-email-" + i}
                        autoFocus
                        onChange={(e) => {f.value = e.target.value}}
                    />
                )}
            </div>

            {(!!formValidationErrors && formValidationErrors.members !== undefined)
                ? <Alert severity="error">
                    <AlertTitle>Date: {formValidationErrors.members}</AlertTitle>
                </Alert>
                : <div/>
            }

            {formIsLoading
                ? <div style={{display: "flex", justifyContent: "center"}}><CircularProgress color="error"/></div>
                : <div/>}

            <Button disabled={formIsLoading} variant="contained" color="success" onClick={onClickCreateEvent}>
                Create Event
            </Button>

        </Box>
    </Modal>
}