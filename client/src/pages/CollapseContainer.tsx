import React, { Fragment, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material';
import { AppState } from '../stateManagement/types';
import { useSelector } from 'react-redux';

// TODO Add typing (how to?)
function withCollapseContainer(WrappedComponent: any) {


    return function Wrapped(props: any) {

        const [isExpanded, setExpanded] = useState(false);

        function handleExpandClick(e: React.MouseEvent<HTMLButtonElement>) {
            e.preventDefault();
            setExpanded(!isExpanded);
        }
        const pageTheme = useSelector((state: AppState) => state.theme)

        const theme = createTheme({
            palette: {
                mode: pageTheme ? "dark" : "light",
            }
        })

        return (
            <ThemeProvider theme={theme}>
            <Fragment>
                <CardActions>
                    <Button onClick={handleExpandClick} fullWidth size="large">
                        <Box sx={{ textAlign: "left", flexGrow: 1 }}>
                            {props.name}
                        </Box>
                        <Box>
                            {isExpanded ? <ExpandLess /> : <ExpandMore />}
                        </Box>
                    </Button>
                </CardActions>
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <WrappedComponent {...props}/>
                </Collapse>
            </Fragment>
            </ThemeProvider>
        )
    }

}

export default withCollapseContainer;
