
/**
 * Provides access to the window.gawati object created in index.html
 */
export const gawati = () => window.gawati ;

/**
 * Returns the URL to the document server path which provides access to PDF 
 * and other artifacts on the file system
 */
export const documentServer = () => gawati().GAWATI_DOCUMENT_SERVER ;


/**
 * We don't use the REACT Package.json proxy in build mode. So we check
 * if the system has been started in dev mode and if in dev mode we use 
 * proxy from package.json otherwise we use the setting as specified in 
 * the js block in index.html
 * 
 * .. .code-block:: javascript
 *     <script>
 *     gawati = {
 *       GAWATI_PROXY: "http://localhost",
 *       GAWATI_DOCUMENT_SERVER: "http://localhost"
 *     };
 *     </script>
 * 
 * 
 */
export const dataProxyServer = () => 
    process.env.NODE_ENV === 'development' ? "" : gawati().GAWATI_PROXY ;
