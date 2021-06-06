import { useEffect, useRef } from "react"
import {Card, CardDeck, Button} from 'react-bootstrap'
import {
Link
} from "react-router-dom";

import Editor from "./editor"

function FileList (props) {

    var files = useRef(null); // = [{title:"DELETETEST",lang:"TEST",content:"TEST","Last_updated_at":"2021-05-23T02:41:14.609322Z"},{title:"UPDATETEST",lang:"TEST",content:"NEW content","Last_updated_at":"2021-05-23T02:41:48.785534Z"},{title:"",lang:"",content:"","Last_updated_at":"2021-05-24T00:43:33.467206Z"},{title:"READTEST",lang:"TEST_LANG",content:"NEWWWWWWW CONTEneredsa","Last_updated_at":"2021-05-24T22:53:09.041564Z"}];

    useEffect(() => {
        fetch('/files')
        .then(response => response.json())
        .then(data => {
            files.current = data;
        }
        )
        .catch(error => files.current = [{title:"DELETETEST",lang:"TEST",content:"TEST","Last_updated_at":"2021-05-23T02:41:14.609322Z"},{title:"UPDATETEST",lang:"TEST",content:"NEW content","Last_updated_at":"2021-05-23T02:41:48.785534Z"},{title:"",lang:"",content:"","Last_updated_at":"2021-05-24T00:43:33.467206Z"},{title:"READTEST",lang:"TEST_LANG",content:"NEWWWWWWW CONTEneredsa","Last_updated_at":"2021-05-24T22:53:09.041564Z"}]);
    })


    return (
        <div>
            {files.current}
            <CardDeck id="fileList">
                {files.current && files.current.map(file => 
                        <Card style={{ minWidth: '100%', maxWidth: '100%',margin: '.5rem' }}>
                            <Card.Body>
                                <Card.Title>{file.title || 'Untitled'}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted"> Language: {file.lang || '-'} </Card.Subtitle>
                            </Card.Body>
                            <Card.Header as="nav" style={{ display:'flex', justifyContent: "space-between", fontSize: "1rem", alignItems: "center" }} >
                                Last Update at: {file.timestamp || "-"}
                                {/* //<Button variant="dark" onClick={() => submit(file.title)}>Code</Button> */}
                                <Button variant="dark"> <Link to="/editor"> Code </Link> </Button>
                            </Card.Header>
                            </Card>
                )}
            </CardDeck>
        </div>
    )
}

function File (props) {
    const title = props.name;
    const file = useRef(null);


    useEffect(() => {
            fetch(`/file/${title}`)
            .then(response => response.json())
            .then(data => {
                file.current = data;
            }
            )
            .catch(error => console.log(error));
        });

    return (
        <Editor mode={file.current && file.current.language} content={file.current && file.current.content} /> 
    );

}   

export {FileList, File};
