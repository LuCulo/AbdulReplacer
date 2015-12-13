// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:	//showed up for <head tag>
//			var badindex = node.outerHTML.indexOf("Injecting",0);	//search for text within the string
//			if(badindex != -1){		//if found a word that isn't good, start excluding bad HTML
//				var startingdiv = node.outerHTML.indexOf("<div",badindex - 40);	//find the opening <div bracket for the bad HTML 
//				var endingdiv = node.outerHTML.indexOf("</div>",badindex); 	//find the closing </div bracket for the bad HTML>
//				html += "Starting Div:" + startingdiv.toString();
//				html += "Ending Div:" + endingdiv.toString();
//				}
//			html += "Bad Index:" + badindex.toString();
			
			var str = node.outerHTML;	//start put HTML into fake file
			
			var badindex = 0;
			badindex = str.indexOf("Injecting",0);	//search for text within the string
//			while(badindex != -1){
				str = str.replace("Injecting", "break");		
				badindex = str.indexOf("Injecting",0);	//search for text within the string				
//			}
            html += str;	//breaks any image file references with the word injecting
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->'; //showed up for <comment tags>
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
//	var newWindow = window.open();	//open new tab for modified html
//    newWindow.document.write(html);	//test: write html to new tab
    return html;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});