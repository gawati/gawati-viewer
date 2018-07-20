import React from 'react';
import axios from 'axios';
import {substringBeforeLastMatch } from './utils/stringhelper';
import {documentServer} from './constants';
import {anBody} from './utils/akomantoso';
import "./DocumentDOCX.css";
import {apiGetCall} from './api';

const Aux = props => props.children;

class DocumentConverted extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    getDocument() {
        const body = anBody(this.props.doc, this.props.type);
        let mainDocument ;
        if (Array.isArray(body.book)) {
            mainDocument = body.book.filter(book => book.refersTo === '#mainDocument');
        } else {
            mainDocument = body.book;
        }        
        const cRef = mainDocument.componentRef;
        const docLink = documentServer() + substringBeforeLastMatch(cRef.src, "/") + "/" + cRef.alt;
        let apiDoc;
        if (this.props.docType === 'DOCX') {
            apiDoc = apiGetCall(
                'docx-to-html', {
                    iri : this.props.iri,
                    docxLink : docLink 
                } 
            );
        } else {
            apiDoc = apiGetCall('xml-to-html', {
                iri : this.props.iri,           
                docType : this.props.type,
                xmlLink : docLink
            });
        }
        console.log("**********" + this.props.iri);
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
                <div className='ScrollStyle' contentEditable='true' dangerouslySetInnerHTML={{ __html: this.state.htmlDoc}}>
                </div>           
            );  
        }       
    }    
}
  
export default DocumentConverted;

