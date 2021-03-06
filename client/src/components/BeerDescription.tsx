import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import withCollapseContainer from './CollapseContainer';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { useSelector } from 'react-redux';
import { AppState } from '../stateManagement/types';
import { withStyles } from '@material-ui/core';

export interface BeerDescriptionProps {
    desc: string
    food_pairing: string[]
}
//jeg fjernet " component="div"  " fra linje 41, var det viktig?


/**
 * The dropdown menu with the Description elements presented in a Table
 * @param props Beer Description elements
 * @returns JSX.Element
 */
function BeerDescription(props: BeerDescriptionProps): JSX.Element {
    const pageTheme = useSelector((state: AppState) => state.theme)
    
    //subclass that inherits from Typograpyh, changes font color
    const ColorTextTypography = withStyles({ 
        root: {
            color: pageTheme ? "#ffffff" : "#000000",
        }
      })(Typography);

    return (
        <CardContent>
            <ColorTextTypography data-testid="card-description" paragraph>
                {props.desc}
            </ColorTextTypography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <ColorTextTypography variant="body1" >
                                    Food pairings
                                </ColorTextTypography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.food_pairing.map((food: string) => {
                            return (
                                <TableRow key={food}>
                                    <TableCell data-testid="card-food-pairing">
                                        <ColorTextTypography paragraph variant="body2">
                                            {food}
                                        </ColorTextTypography>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </CardContent>
    )
}

export default withCollapseContainer(BeerDescription);
