import React from 'react';
import {substringBeforeLastMatch } from './utils/stringhelper';
import {anBody, anDocType} from './utils/akomantoso';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
// import { Page } from 'react-pdf';
import {capitalizeFirst} from './utils/stringhelper';
import "./css/PdfViewer.css";
import {documentServer} from './constants';


PDFJS.workerSrc ='path to psd.worker.js';

/**
 * Returns an array of a range of numbers
 * @param {integer} min 
 * @param {integer} max 
 * @param {integer} step 
 */
export const rangeMinMax = ((min, max , step = 1) => {
  // return a array from min to max, inclusive, in steps of step.
  // if step is not integer, then max may not be included
  // http://xahlee.info/js/javascript_range_array.html
  // version 2017-04-20
  const arr = [];
  const totalSteps = Math.floor((max - min)/step);
  for (let ii = 0; ii <= totalSteps; ii++ ) { arr.push(ii * step + min) }
  return arr;
} );

class PdfViewer extends React.Component {
    state = {
      numPages: 1,
      pageNumber: 1,
    }
  
    onDocumentLoad = ({ numPages }) => {
      this.setState({ numPages });
    }

    handlePrevious = () => {
      this.setState({ pageNumber: this.state.pageNumber - 1 });
    }
    
    handleNext = () => {
      this.setState({ pageNumber: this.state.pageNumber + 1 });
    }

    handlePageClick = (p) => {
      this.setState({ pageNumber: p });
    }

    renderPagination = (page, pages) => {
        let previousButton = <li className="previous active" onClick={this.handlePrevious}><a><i className="fa fa-arrow-left"></i></a></li>;
        if (page === 1) {
          previousButton = <li className="previous disabled"><a><i className="fa fa-arrow-left"></i></a></li>;
        }
        let nextButton = <li className="next active" onClick={this.handleNext}><a><i className="fa fa-arrow-right"></i></a></li>;
        if (page === pages) {
          nextButton = <li className="next disabled"><a ><i className="fa fa-arrow-right"></i></a></li>;
        }
        let pagesArr = rangeMinMax(1, pages);
        let pageLinks = pagesArr.map(
              (p, index) =>
                  <li key={index} className={p === page ? 'active' : ''} onClick={() => this.handlePageClick(p)}>
                      <a>{p}</a>
                  </li>
          )

        return (
          <nav>
            <ul className="gw-pager">
              {previousButton}
              {pageLinks}
              {nextButton}
            </ul>
          </nav>
          );
    }

    getPageProps = () => {
      let pageProps = {
        key: `page_${this.state.pageNumber}`,
        pageNumber: this.state.pageNumber,
        width: document.getElementsByClassName("search-result")[0].offsetWidth * 0.92
      };

      if (this.props.searchTerm) {
        let customTextRenderer = ( str, itemIndex ) => {
          var lower = new RegExp(this.props.searchTerm);
          var upper = new RegExp(capitalizeFirst(this.props.searchTerm));
          var pattern = new RegExp( lower.source + "|" + upper.source );
          var spaces = '\u00A0'.repeat(this.props.searchTerm.length);
          return (
            str.str
              .split(pattern)
              .reduce((strArray, currentValue, currentIndex) => {
                return currentIndex === 0 ? 
                    ([...strArray, currentValue]) : 
                    ([...strArray,
                      <mark className="highlight" key={currentIndex}>{spaces}</mark>,
                      currentValue
                    ])
                    ;
                }, [])
          )
        }
        pageProps = Object.assign({}, pageProps, {customTextRenderer});
      }
      return pageProps;
    }
  
    render() {
      const { pageNumber, numPages } = this.state;
      let pagination = this.renderPagination(this.state.pageNumber, this.state.numPages);
      let pageProps = this.getPageProps();
      return (
        <div>
          { pagination }
          <Document
            file={ this.props.attLink }
            onLoadSuccess={this.onDocumentLoad}
          >
            {
              <Page {...pageProps} />
              }
          </Document>
          { pagination }
          <p>Page {pageNumber} of {numPages}</p>
        </div>
      );
    }
  }


export default PdfViewer;

