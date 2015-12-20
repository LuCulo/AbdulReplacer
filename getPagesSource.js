function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:	//showed up for <head tag>
			
			var str = node.outerHTML;	//start put HTML into fake file
			var checkstream = ["cat","cats","Cat","Cats","paw","Paw","paws"];	//words to be replaced
			var newstring = "break";
			var checklength = checkstream.length;	//length of checkstream
			var checkcounter = 0;	//increments through checkstream
			
			var badindex = 0;
			
			while(checkcounter < checklength){
				
				badindex = str.indexOf(checkstream[checkcounter],0);	//search for text within the string
				while(badindex > 0){		//go through all instances
					str = str.replace(checkstream[checkcounter], newstring);				
					badindex = str.indexOf(checkstream[checkcounter],0);	//search for text within the string				
				}				
			checkcounter += 1;	
			}

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
	var newWindow = window.open();	//open new tab for modified html
    newWindow.document.write(html);	//test: write html to new tab
    return html;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});