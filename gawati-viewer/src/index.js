import React from 'react';
import PdfDocumentViewer from './PdfViewer';
import NonPdfDocumentViewer from './NonPdfDocumentViewer';


class GawatiViewer extends React.Component {
  
    render() {
      // const doc = this.props.doc;
      // const attLink = this.props.attLink;
      // const searchTerm = this.props.searchTerm;
      // const format = this.props.format;
      
      switch (this.props.format){
        case 'PDF': return <PdfDocumentViewer {...this.props}/>;
        case 'PNG': return <NonPdfDocumentViewer {...this.props}/>;
        case 'DOCX': return <NonPdfDocumentViewer {...this.props}/>;        
        case 'XML': return <NonPdfDocumentViewer {...this.props}/>;
        default : return "Format not supported";
      } 
    }
  }


export default GawatiViewer;

