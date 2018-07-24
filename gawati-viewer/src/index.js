import React from 'react';
import PdfDocumentViewer from './PdfViewer';
import NonPdfDocumentViewer from './NonPdfDocumentViewer';


class GawatiViewer extends React.Component {
  
    render() {
      const doc = this.props.doc;
      const searchTerm = this.props.searchTerm;
      const format = doc.akomaNtoso.act.meta.proprietary.gawati.embeddedContents.embeddedContent.type.toUpperCase();
      
      switch (format){
        case 'PDF': return <PdfDocumentViewer doc={doc} searchTerm={searchTerm}/>;
        case 'PNG': return <NonPdfDocumentViewer doc={doc} format={'PNG'} searchTerm={searchTerm}/>;
        case 'DOCX': return <NonPdfDocumentViewer doc={doc} format={'DOCX'} searchTerm={searchTerm}/>;        
        case 'XML': return <NonPdfDocumentViewer doc={doc} format={'XML'} searchTerm={searchTerm}/>;
        default : return "Format not supported";
      } 
    }
  }


export default GawatiViewer;

