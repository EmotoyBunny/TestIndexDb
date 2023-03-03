import React from "react";


import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Grid, Typography, Button, TextField} from '@mui/material';
import {withTheme} from "@mui/styles";
import {PouchDb} from "../Pouchdb"

/**
 * Компонент авторизации
 * @author EmotoyBunny
 */
class PouchDbComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: "",
                password: "",
                ownId: "",
                data: []
            },
            pageHeightClient: 600,
        };
    }

    componentDidMount = () => {
        this.handleShowAll();
    };

    handleChange = (e, changeCallback) => {
        this.setState({[e.target.name]: e.target.value})
    };

    // Генерация своего id
    handleAddId = () => {
        let idRes = this.state.ownId;
        if (idRes === "") {
            idRes = Math.floor(Math.random() * 1000)
        }
        PouchDb.put({
            _id: idRes,
            title: JSON.stringify({param1: 10, param2: "asd"}),
            nameMethod: "nameMethod",
        }).then((response) => {
            console.log(response);
            this.handleShow(this.state.ownId);
            this.handleShowAll();
        }).catch(function (err) {
            console.log(err);
        });
    };

    // Генерация автоматического id
    handleAddNotId = () => {
        PouchDb.post({
            title: JSON.stringify({param1: 10, param2: "asd"}),
            nameMethod: "nameMethod",
        }).then((response) => {
            console.log(response);
            this.handleShow(this.state.ownId);
            this.handleShowAll();
        }).catch(function (err) {
            console.log(err);
        });
    };


    handleShow = () => {
        PouchDb.get(this.state.ownId).then(function (doc) {
            console.log(doc)
        }).catch(function (err) {
            console.log(err);
        });
    };


    handleDelete = (id) => {
        let deleteId = id;
        if (!deleteId) {
            deleteId = this.state.ownId
        }
        PouchDb.get(deleteId).then(function (doc) {
            return PouchDb.remove(doc);
        }).then((result) => {
            console.log(result);
            this.handleShowAll();
        }).catch(function (err) {
            console.log(err);
        });
    };


    handleDeleteAll = () => {
        for (let i = 0; i < this.state.data.rows.length; i++) {
            this.handleDelete(this.state.data.rows[i].id)
        }
        this.handleShowAll();
    };

    handleEdit = () => {
        PouchDb.get(this.state.ownId).then((doc) => {
            return PouchDb.put({
                _id: this.state.ownId,
                _rev: doc._rev,
                title: JSON.stringify({param1: "шо-то другое", param2: "asd"}),
                nameMethod: "nameMethodДругой",
            });
        }).then((response) => {
            console.log(response);
            this.handleShow(this.state.ownId)
        }).catch(function (err) {
            console.log(err);
        });
    };


    handleShowAll = () => {
        PouchDb.allDocs({
            include_docs: true,
            attachments: true
        }).then((result) => {
            console.log(result);
            this.setState({data: result})
        }).catch(function (err) {
            console.log(err);
        });
    };


    render() {
        return (
            <div
                style={{width: "100%", position: "relative", overflow: "hidden"}}>
                <form>
                    <Grid container
                          spacing={2}
                          style={{
                              width: "100%",
                              paddingLeft: "10px",
                              paddingRight: "10px"
                          }}>
                        <Grid item xs={12}>
                            <TextField
                                name={"ownId"}
                                style={{width: "200px", height: "50px"}}
                                variant="standard"
                                placeholder="Id"
                                value={this.state.ownId || ""}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={this.handleAddId}
                                style={{
                                    height: "50px",
                                    minWidth: "300px",
                                    maxWidth: "300px"
                                }}
                                fullWidth
                                color={"secondary"}
                                variant="contained"
                            >
                                <Typography sx={{
                                    fontSize: "20px",
                                    color: "#fff",
                                    textTransform: "none"
                                }}>
                                    Добавить элемент c айди
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid xs={12} item>
                            <Button
                                onClick={this.handleAddNotId}
                                style={{
                                    height: "50px",
                                    minWidth: "300px",
                                    maxWidth: "300px"
                                }}
                                fullWidth
                                color={"secondary"}
                                variant="contained"
                            >
                                <Typography sx={{
                                    fontSize: "20px",
                                    color: "#fff",
                                    textTransform: "none"
                                }}>
                                    Добавить элемент без айди
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid xs={12} item>
                            <Button
                                onClick={this.handleShow}
                                style={{
                                    height: "50px",
                                    minWidth: "300px",
                                    maxWidth: "300px"
                                }}
                                fullWidth
                                color={"secondary"}
                                variant="contained"
                            >
                                <Typography sx={{
                                    fontSize: "20px",
                                    color: "#fff",
                                    textTransform: "none"
                                }}>
                                    Вывести элемент по айди
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid xs={12} item>
                            <Button
                                onClick={this.handleDelete}
                                style={{
                                    height: "50px",
                                    minWidth: "300px",
                                    maxWidth: "300px"
                                }}
                                fullWidth
                                color={"secondary"}
                                variant="contained"
                            >
                                <Typography sx={{
                                    fontSize: "20px",
                                    color: "#fff",
                                    textTransform: "none"
                                }}>
                                    Удалить элемент по айди
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid xs={12} item>
                            <Button
                                onClick={this.handleEdit}
                                style={{
                                    height: "50px",
                                    minWidth: "300px",
                                    maxWidth: "300px"
                                }}
                                fullWidth
                                color={"secondary"}
                                variant="contained"
                            >
                                <Typography sx={{
                                    fontSize: "20px",
                                    color: "#fff",
                                    textTransform: "none"
                                }}>
                                    Изменить элемент по айди
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid xs={12} item>
                            <Button
                                onClick={this.handleShowAll}
                                style={{
                                    height: "50px",
                                    minWidth: "300px",
                                    maxWidth: "300px"
                                }}
                                fullWidth
                                color={"secondary"}
                                variant="contained"
                            >
                                <Typography sx={{
                                    fontSize: "20px",
                                    color: "#fff",
                                    textTransform: "none"
                                }}>
                                    Вывести все в консоль
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid xs={12} item>
                            <Button
                                onClick={this.handleDeleteAll}
                                style={{
                                    height: "50px",
                                    minWidth: "300px",
                                    maxWidth: "300px"
                                }}
                                fullWidth
                                color={"secondary"}
                                variant="contained"
                            >
                                <Typography sx={{
                                    fontSize: "20px",
                                    color: "#fff",
                                    textTransform: "none"
                                }}>
                                    Удалить все элементы
                                </Typography>
                            </Button>
                        </Grid>
                        {this.state.data && this.state.data.rows.map((item) => {
                            return (
                                <Grid xs={12} item key={item.id}>
                                    <div style={{width: "100%"}}>
                                        <div>
                                            {item.doc.nameMethod}
                                        </div>
                                        <div style={{marginRight: "20px", marginLeft: "20px",}}>
                                            {item.doc.title}
                                        </div>
                                        <div>
                                            {item.id}
                                        </div>
                                    </div>
                                </Grid>
                            )
                        })}
                    </Grid>
                </form>
            </div>);
    }
}

export {PouchDbComponent as PouchDbComponent};