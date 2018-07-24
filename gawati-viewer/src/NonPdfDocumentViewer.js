import React from 'react';
import axios from 'axios';
import {substringBeforeLastMatch } from './utils/stringhelper';
import {documentServer} from './constants';
import {anBody, anDocType} from './utils/akomantoso';
import "./css/DocumentDOCX.css";
import {apiGetCall} from './api';

const Aux = props => props.children;

class NonPdfDocumentViewer extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    getDocument() {
        const type = anDocType(this.props.doc);
        const body = anBody(this.props.doc, type);
        let mainDocument ;
        if (Array.isArray(body.book)) {
            mainDocument = body.book.filter(book => book.refersTo === '#mainDocument');
        } else {
            mainDocument = body.book;
        }        
        const cRef = mainDocument.componentRef;
        const docLink = documentServer() + substringBeforeLastMatch(cRef.src, "/") + "/" + cRef.alt;
        let apiDoc;
        const typeToApi = {
            'DOCX': 'docx-to-html',
            'XML': 'xml-to-html'
        }
        if (typeToApi[this.props.format]) {
            apiDoc = apiGetCall(
                typeToApi[this.props.format], {
                    docLink : docLink,
                    info: ''
                } 
            )
            axios.get(apiDoc)
                .then(response => {
                    const htmlDoc = response.data;
                    this.setState({
                        loading: false,
                        htmlDoc: htmlDoc,
                    });    
                })
                .catch(function(error) {
                    console.error("error in getDocument()", error);
                });
        } else if (this.props.format === 'PNG') {
            this.setState({
                loading: false,
                htmlDoc: "<div><img src='" + docLink + "' alt='' /></div>"
            });
            return;
        }
        
    }

    componentDidMount() {
        this.getDocument();
    }
       
    render() {
        const { loading } = this.state;
        if(loading === true) {
            return(
                <Aux>
                    <div>Loading Doc... </div>
                </Aux>
            );            
        } else {
            return(
                <div className='ScrollStyle' dangerouslySetInnerHTML={{ __html: this.state.htmlDoc}}>
                </div>           
            );  
        }       
    }    
}
  
export default NonPdfDocumentViewer;

