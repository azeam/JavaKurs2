<?php 
    class Page {
        public $page;
        public $title;
        public $description;

        function setData() {
            if (isset($_GET["page"])) {
                foreach ($_GET as $key => $value) {
                    // should be safe to use unsanitized value this way in switch
                    switch ($value) {
                        case "contact":
                        case "about":
                        case "screenshots":
                            $this->page = $value;
                            break;
                        default :
                            $this->page = "404";
                            break;
                    }
                }
            }
            else {
                $this->page = "home";
            }

            switch ($this->page) {
                case "home":
                    $this->description = "Download links and latest updates of the 'Calamaria of Borneo' mobile phone app";
                    break;
                case "contact":
                    $this->description = "Contact us here if you have any questions or comments regarding the app";
                    break;
                case "about":
                    $this->description = "What is Calamaria and why would I need an app about them?";
                    break;
                case "screenshots":
                    $this->description = "Screenshots of the app using Android and iOS";
                    break;  
            }
        }

        function getTitle() {
            return "Calamaria of Borneo - " . ucfirst($this->page);
        }

        function getDescription() {
            return $this->description;
        }

        function getContent() {
            readfile("../public/static/" . $this->page . ".html");
        }

    }

    $page = new Page;
    $page->setData();

?>