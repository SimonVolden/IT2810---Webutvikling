import React, { Fragment, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

// TODO Add typing (how to?)
function withCollapseContainer(WrappedComponent: any) {

    return function Wrapped(props: any) {

        const [isExpanded, setExpanded] = useState(false);

        function handleExpandClick(e: React.MouseEvent<HTMLButtonElement>) {
            e.preventDefault();
            setExpanded(!isExpanded);
        }

        return (
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
        )
    }

}

export default withCollapseContainer;
