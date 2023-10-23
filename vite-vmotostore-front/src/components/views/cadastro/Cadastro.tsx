import { Card, CardContent, Grid, SvgIcon, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Link } from "react-router-dom";

function CadastroView() {


    return (<div style={{ 'width': '100%', 'marginTop': '60px' }}>

        <Grid container spacing={4}>
            <Grid item xs={2}></Grid>

            <Card >
                <Grid item xs={2}>
                    <Link to={'/produto'}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                <br />
                            </Typography>

                            <Typography align="center" sx={{}} color="text.secondary">
                                <br />
                                <SvgIcon sx={{ fontSize: 60 }}>
                                    <AddShoppingCartIcon color="info" ></AddShoppingCartIcon>
                                </SvgIcon>
                            </Typography>
                            <Typography align="center" variant="h5" component="div">
                                Produto
                            </Typography>
                            <Typography variant="body2">
                                <br />
                            </Typography>
                        </CardContent>
                    </Link>
                </Grid>
            </Card>

            <Card>
                <Grid item xs={2}>
                    <Link to={'/home'}>

                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                <br />
                            </Typography>

                            <Typography align="center" sx={{}} color="text.secondary">
                                <br />
                                <SvgIcon sx={{ fontSize: 60 }}>
                                    <GroupsIcon color="info" ></GroupsIcon>
                                </SvgIcon>
                            </Typography>
                            <Typography align="center" variant="h5" component="div">
                                Cliente
                            </Typography>
                            <Typography variant="body2">
                                <br />
                            </Typography>
                        </CardContent>

                    </Link>
                </Grid>
            </Card>

            <Card>
                <Grid item xs={2}>
                    <Link to={'/home'}>

                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                <br />
                            </Typography>

                            <Typography align="center" sx={{}} color="text.secondary">
                                <br />
                                <SvgIcon sx={{ fontSize: 60 }}>
                                    <AssignmentIndIcon color="info" ></AssignmentIndIcon>
                                </SvgIcon>
                            </Typography>
                            <Typography align="center" variant="h5" component="div">
                                Usuário
                            </Typography>
                            <Typography variant="body2">
                                <br />
                            </Typography>
                        </CardContent>

                    </Link>
                </Grid>
            </Card>

        </Grid>






    </div>)

}


export default CadastroView;