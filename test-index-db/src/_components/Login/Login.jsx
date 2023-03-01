import React from "react";


import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Grid, Typography, Button, TextField} from '@mui/material';
import {withTheme} from "@mui/styles";

import {DBConfig} from '../DbFile';
import {initDB} from 'react-indexed-db';
import {useIndexedDB} from 'react-indexed-db';

/**
 * Компонент авторизации
 * @author EmotoyBunny
 */
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: "",
                password: "",
                id: "",
                data: []
            },
            pageHeightClient: 600,
        };
    }

    componentDidMount = () => {
        initDB(DBConfig);
        this.handleShow();
    };

    handleChange = (e, changeCallback) => {
        let {user} = this.state;
        user[e.target.name] = e.target.value;
        this.setState({user})
    };


    handleAdd = () => {
        const {add} = useIndexedDB('methods');
        add({name: 'nameMethod1', param: JSON.stringify({param1: 10, param2: "asd"})}).then(
            res => {
                console.log('ID Generated: ', res);
                this.setState({id: res}, () => {
                    this.handleShow();
                })
            },
            error => {
                console.log(error);
            }
        );
    };

    handleShow = () => {
        const {getAll} = useIndexedDB('methods');
        getAll().then(res => {
            console.log(res);
            this.setState({data: res})
        });
    };


    handleDelete = () => {
        const {deleteRecord} = useIndexedDB('methods');
        let id = this.state.data[this.state.data.length - 1].id;
        deleteRecord(id).then(event => {
            console.log(`DeleteId: ${id}`);
        }).then(res => {
            this.handleShow();
        });
    };

    handleDeleteAll = () => {
        const {clear} = useIndexedDB('methods');
        clear().then(() => {
            console.log(`Delete All`);
        }).then(res => {
            this.handleShow();
        });
    };

    handleEdit = () => {
        const {update} = useIndexedDB('methods');
        let id = this.state.data[this.state.data.length - 1].id;
        update({
            id: id,
            name: 'NewName',
            param: JSON.stringify({param1: "NewParam1", param2: "NewParam2"})
        }).then(
            res => {
                console.log(`EditedId:${id}`);
                this.handleShow();
            },
            error => {
                console.log(error);
            }
        )
    };

    render() {
        return (
            <div
                style={{width: "100%", position: "relative", overflow: "hidden"}}>
                <form>
                    <Grid container justifyContent="center" alignContent="center" alignItems="center"
                          direction="column" style={{
                        width: "90%",
                        paddingLeft: "10%",
                    }}>
                        <Grid item xs={10} style={{marginTop: 10}}>
                            <Button
                                onClick={this.handleAdd}
                                style={{
                                    height: "50px",
                                    minWidth: "300px",
                                    maxWidth: "300px"
                                }}
                                fullWidth
                                color={"secondary"}
                                variant="contained"
                                endIcon={<ArrowForwardIcon/>}
                            >
                                <Typography sx={{
                                    fontSize: "20px",
                                    color: "#fff",
                                    textTransform: "none"
                                }}>
                                    Добавить строку
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            LastId: {this.state.id}
                        </Grid>
                        <Grid item xs={10} style={{marginTop: 40}}>
                            <Button
                                onClick={this.handleShow}
                                style={{
                                    height: "50px",
                                }}
                                fullWidth
                                color={"secondary"}
                                variant="contained"
                                endIcon={<ArrowForwardIcon/>}
                            >
                                <Typography sx={{
                                    fontSize: "20px",
                                    color: "#fff",
                                    textTransform: "none"
                                }}>
                                    Вывести в консоль
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            {this.state.data && this.state.data.map((item) => {
                                return (
                                    <div key={item.id} style={{display: "flex"}}>
                                        <div>
                                            {item.name}
                                        </div>
                                        <div style={{marginRight: "20px", marginLeft: "20px"}}>
                                            {item.param}
                                        </div>
                                        <div>
                                            {item.id}
                                        </div>
                                    </div>
                                )
                            })}
                        </Grid>
                        <Grid item xs={12} style={{marginTop: 40}}>
                            <Button
                                onClick={this.handleDelete}
                                style={{
                                    height: "50px",
                                }}
                                fullWidth
                                color={"secondary"}
                                variant="contained"
                                endIcon={<ArrowForwardIcon/>}
                            >
                                <Typography sx={{
                                    fontSize: "20px",
                                    color: "#fff",
                                    textTransform: "none"
                                }}>
                                    Удалить последнюю строку
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} style={{marginTop: 40}}>
                            <Button
                                onClick={this.handleDeleteAll}
                                style={{
                                    height: "50px",
                                }}
                                fullWidth
                                color={"secondary"}
                                variant="contained"
                                endIcon={<ArrowForwardIcon/>}
                            >
                                <Typography sx={{
                                    fontSize: "20px",
                                    color: "#fff",
                                    textTransform: "none"
                                }}>
                                    Удалить всё
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} style={{marginTop: 40}}>
                            <Button
                                onClick={this.handleEdit}
                                style={{
                                    height: "50px",
                                }}
                                fullWidth
                                color={"secondary"}
                                variant="contained"
                                endIcon={<ArrowForwardIcon/>}
                            >
                                <Typography sx={{
                                    fontSize: "20px",
                                    color: "#fff",
                                    textTransform: "none"
                                }}>
                                    Изменить последнюю строку
                                </Typography>
                            </Button>
                        </Grid>
                        {/*<Grid item xs={12} style={{paddingTop: "30px"}}>
                            <Typography sx={{color: "#53565A", fontSize: "18px",}} align="center">
                                Введите ваши данные для входа
                            </Typography>
                        </Grid>
                        <Grid item xs={12}
                              style={{
                                  width: "100%",
                                  paddingBottom: "10px",
                              }}>
                            <TextField
                                name={"username"}
                                style={{width: "400px"}}
                                variant="standard"
                                placeholder="Логин"
                                value={this.state.user.name}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} style={{width: "100%"}}>
                            <TextField
                                variant="standard"
                                style={{width: "400px"}}
                                name={"password"}
                                placeholder="Пароль"
                                value={this.state.user.pass}
                                onChange={this.handleChange}
                            />
                        </Grid>*/}
                    </Grid>
                </form>
            </div>);
    }
}

export {Login as Login};