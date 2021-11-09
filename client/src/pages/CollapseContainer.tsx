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

/**
 * Card Components wrapped to be Collabsable 
 * @param WrappedComponent 
 * @returns The prop Component as a Collabsable Element
 */
function withCollapseContainer(WrappedComponent: any) {

    return function Wrapped(props: any) {

        const [isExpanded, setExpanded] = useState(false);
        const textSize = useSelector((state: AppState) => state.textSize)

        function handleExpandClick(e: React.MouseEvent<HTMLButtonElement>) {
            e.preventDefault();
            setExpanded(!isExpanded);
        }

        //correctly sets the pageTheme with the right ThemeProvider
        const pageTheme = useSelector((state: AppState) => state.theme)
        const theme = createTheme({
            typography: {
                fontSize: textSize,
            },
            palette: {
                mode: pageTheme ? "dark" : "light",
            }
        })

        const collapseName = props.name;

        return (
            <ThemeProvider theme={theme}>
            <Fragment>
                <CardActions>
                    <Button onClick={handleExpandClick} fullWidth size="large" data-testid={collapseName + "-card-button"}>
                        <Box sx={{ textAlign: "left", flexGrow: 1 }}>
                            {collapseName}
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
