import React from 'react';
import {substringBeforeLastMatch } from './utils/stringhelper';
// import {documentServer} from 'constants';
import {anBody} from './utils/akomantoso';
import { Document } from 'react-pdf/dist/entry.webpack';
import { Page } from 'react-pdf';
import {capitalizeFirst} from './utils/stringhelper';
import "./DocumentPDF.css";

import DocumentPDF from './PdfViewer';
import DocumentPNG from './PngViewer';
import DocumentConverted from './ConvertedDocViewer';


class GawatiViewer extends React.Component {
  
    render() {
      const doc = this.props.doc;
      const type = this.props.type;
      const iri = this.props.iri;
      
      switch(doc.akomaNtoso.act.meta.proprietary.gawati.embeddedContents.embeddedContent.type.toUpperCase()){
        case 'PDF': return <DocumentPDF doc={doc} type={type} />;
        case 'PNG': return <DocumentPNG doc={doc} type={type} />;
        case 'DOCX': return <DocumentConverted doc={doc} type={type} iri={iri} docType={'DOCX'}/>;
        case 'XML': return <DocumentConverted doc={doc} type={type} iri={iri} docType={'XML'}/>;
        default : return "Format not supported";
      } 
    }
  }


export default GawatiViewer;

