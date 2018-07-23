import React from 'react';
import {substringBeforeLastMatch } from './utils/stringhelper';
import {documentServer} from './constants';
import {anBody} from './utils/akomantoso';

class DocumentPNG extends React.Component {       
  
    render() {
     
      let doc = this.props.doc;
      let type = this.props.type;
      let body = anBody(doc, type);
      let mainDocument ;
      if (Array.isArray(body.book)) {
          mainDocument = body.book.filter(book => book.refersTo === '#mainDocument');
      } else {
          mainDocument = body.book;
      }
      
      let cRef = mainDocument.componentRef;
      let pngLink = documentServer() + substringBeforeLastMatch(cRef.src, "/") + "/" + cRef.alt ;

      return (
        <div>
         <img src={pngLink} alt='' />
        </div>
      );
    }
  }


export default DocumentPNG;

