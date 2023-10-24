import { Link } from "react-router-dom";
import { Buttons } from "../Buttons/Buttons";
import { 
    Card, 
    CardActions, 
    CardContent, 
    CardHeader, 
    Stack 
} from "@mui/material";
import styles from "./CardLayout.module.css";

export const CardLayout = ({
    title,
    subheader,
    link=null,
    buttons=[],
    children,
    styleClass,
}) => (
    <Card className={styleClass}>
        <CardHeader
            title={title}
            subheader={subheader}
        />
        <CardContent>
            {children}
        </CardContent>
        <CardActions 
            sx={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Buttons
                buttons={buttons}
            />
            {link ? (
                <Stack padding={2}>
                    <p>
                        {link.sideText} <Link to={link.to}>{link.text}</Link>.
                    </p>
                </Stack>
                )
            : null}
        </CardActions>
    </Card>
)