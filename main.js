function loadContentTable() {

            // Sets content table content as array
            var links = [
                {
                    label: "W01",
                    url: "W01/Local Storage/index.html"
                },
                {
                    label: "W02",
                    url: "W02/team.html"
                }
            ];

            var ol = document.getElementById('content-table');

            links.map(item => {    
                var li = document.createElement('li');
                var a = createLink(item.label, item.url);
                entry.appendChild(a);
                list.appendChild(entry);
            })
        
        }

        function createLink(title, link) {
            // Creates link
            var a = document.createElement('a');
            var linkText = document.createTextNode(title);
            a.appendChild(linkText);
            a.title = title;
            a.href = link;
            document.body.appendChild(a);
        }