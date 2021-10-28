import React from 'react';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import withCollapseContainer from './CollapseContainer';
import { Ingredients } from '../interfaces/Ingredients';
import { Malt } from '../interfaces/Malt';
import { Hop } from '../interfaces/Hop';
import { Amount } from '../interfaces/Amount';
import { TableHead, withStyles } from '@material-ui/core';
import Box from '@mui/system/Box';
import { useSelector } from 'react-redux';
import { AppState } from '../stateManagement/types';

interface BeerIngredientsProps {
    ingredients: Ingredients
}

function BeerIngredients(props: BeerIngredientsProps): JSX.Element {

    const pageTheme = useSelector((state: AppState) => state.theme)
    
    const ColorTextTypography = withStyles({
        root: {
            color: pageTheme ? "#ffffff" : "#000000",
        }
      })(Typography);

    function displayAmount(amount: Amount, imperial: boolean): string {
        if (amount.unit === "grams") {
            return imperial ? metricToImperial(amount.value / 1000) + "lbs" : (amount.value / 1000) + "kg";
        } else {
            return imperial ? metricToImperial(amount.value) + "lbs" : amount.value + "kg";
        }
    }

    function metricToImperial(kg: number): number {
        return +(kg * 2.2).toFixed(2);
    }

    return (
        <CardContent>
            <Toolbar variant="dense">
                <ColorTextTypography variant="body1" > {/*component="div"*/}
                    Malt
                </ColorTextTypography>
            </Toolbar>
            <TableContainer>
                <Table>
                    <TableBody sx={{ width: "100%" }}>
                        {props.ingredients.malt.map((m: Malt) => {
                            return (
                                <TableRow key={m.amount.value + m.name}>
                                    <TableCell align="center" sx={{ width: "33%" }}>{m.name}</TableCell>
                                    <TableCell align="center" sx={{ width: "33%" }}>{displayAmount(m.amount, false)}</TableCell>
                                    <TableCell align="center" sx={{ width: "33%" }}>{displayAmount(m.amount, true)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Toolbar variant="dense">
                <ColorTextTypography variant="body1" >  {/*component="div"*/}
                    Hop
                </ColorTextTypography>
            </Toolbar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">(g)</TableCell>
                            <TableCell align="center">Add</TableCell>
                            <TableCell align="center">Attribute</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ width: "100%" }}>
                        {props.ingredients.hops.map((h: Hop) => {
                            return (
                                <TableRow key={h.amount.value + h.name}>
                                    <TableCell align="center" sx={{ width: "25%" }}>{h.name}</TableCell>
                                    <TableCell align="center" sx={{ width: "25%" }}>{h.amount.value}</TableCell>
                                    <TableCell align="center" sx={{ width: "25%" }}>{h.add}</TableCell>
                                    <TableCell align="center" sx={{ width: "25%" }}>{h.attribute}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box>
            <Toolbar variant="dense">
                <ColorTextTypography variant="body1" >  {/*component="div"*/}
                    Yeast
                </ColorTextTypography>
            </Toolbar>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <ColorTextTypography align="center" variant="body1">  {/*component="div"*/}
                                    {props.ingredients.yeast}
                                </ColorTextTypography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
        </CardContent>
    );

}

export default withCollapseContainer(BeerIngredients);
