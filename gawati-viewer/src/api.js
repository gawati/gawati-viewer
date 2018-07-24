import querystring from 'querystring';
import {dataProxyServer} from './constants';

/**
 * Use `data` for data APIs
 * Use `local` for file requests on the same current domain
 */
const __GAWATI_APIS = [
    {
        name: "data",
        apis : {
            'docx-to-html' : '/gwv/docxTohtml',
            'xml-to-html' : '/gwv/xmlToHtml',
        }
    }
];

/**
 * Get the data apis
 */
const getDataApis = () => 
    __GAWATI_APIS.filter( (item) => item.name === "data" )[0];


/**
 * Use this for Data APIs
 * @param {*} apiName 
 */
export function apiUrl(apiName) {
    const dataApis = getDataApis().apis;
    if (dataApis.hasOwnProperty(apiName)) {
        return dataProxyServer() +  dataApis[apiName] ;
    } else {
        console.log(" Unknown Data API call ", apiName);
        return false;
    }
};

/**
 * Use this for Data APIs
 * @param {*} apiName 
 * @param {*} objParams 
 */
export function apiGetCall(apiName, objParams) {
    let apiPath = apiUrl(apiName) ;
    if (apiPath !== false) {
        if (Object.keys(objParams).length === 0 && objParams.constructor === Object) {
            return apiPath;
        } else {
            let apiParams =  querystring.stringify(objParams);
            return apiPath + "?" + apiParams;
        }
    }
};

