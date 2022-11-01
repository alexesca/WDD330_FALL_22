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
                },
                {
                    label: "W03",
                    url: "W03/index.html"
                },
                {
                    label: "W04",
                    url: "W04/chapter8.html"
                },
                {
                    label: "W05",
                    url: "W05/index.html"
                },
                {
                    label: "W06",
                    url: "W06/index.html"
                },
                {
                    label: "W07",
                    url: "W07/hikes5/hiking-complete.html"
                }
            ];

            var ol = document.getElementById('content-table');

            links.map(item => {    
                var li = document.createElement('li');
                var a = createLink(item.label, item.url);
                li.appendChild(a);
                ol.appendChild(li);
            })
        
        }

        function createLink(title, link) {
            // Creates link
            var a = document.createElement('a');
            var linkText = document.createTextNode(title);
            a.appendChild(linkText);
            a.title = title;
            a.href = link;
            return a;
        }
