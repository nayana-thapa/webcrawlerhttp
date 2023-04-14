function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`

    // slice(-1) means the last value of the string or array
    if(hostPath.length > 0 && hostPath.slice(-1) == '/'){
        return hostPath.slice(0,-1) // It returns subset of a string or an array from 0th index to lastIndex
    }

    return hostPath
}

// This will make the function available to other
// js file that wants to import it
module.exports = {
    normalizeURL
}