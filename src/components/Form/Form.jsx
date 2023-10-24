import { InputConstructor } from "../InputConstructor/InputConstructor";
import { CardLayout } from "../CardLayout/CardLayout";
import { 
    Alert,
    Grid, 
    Snackbar,
} from "@mui/material";

export const Form = ({
    title,
    subheader,
    inputs=[],
    buttons,
    values,
    onChange,
    errors,
    handleSubmit,
    alert,
    handleCloseAlert,
    styleClass,
    link
}) => (
    <>
        <Snackbar 
            open={alert?.open} 
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            onClose={handleCloseAlert}
        >
            <Alert severity={alert?.severity} onClose={handleCloseAlert}>
                {alert?.message}
            </Alert>
        </Snackbar>
        <form onSubmit={handleSubmit}>
            <CardLayout
                title={title}
                subheader={subheader}
                link={link}
                buttons={buttons}
                styleClass={styleClass}
            >
                <Grid
                    container={true}
                    spacing={2}
                >
                    {inputs.map((input) => (
                        <InputConstructor
                            key={input.id}
                            values={values}
                            input={input}
                            onChange={onChange}
                            errors={errors}
                        />
                    ))}
                </Grid>
            </CardLayout>
        </form>
    </>
)