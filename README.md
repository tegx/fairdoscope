# FAIR-DOscope

![License](https://img.shields.io/github/license/kit-data-manager/fairdoscope.svg)

<img src="/images/logo.png" alt="FAIR-DOscope" width="200"/>

FAIR-DOscope is an easy-to-use, generic FAIR Digital Object viewer and browser accepting PIDs of FAIR DOs and 
presenting the associated PID record in a graphical and user-friendly way. It offers a tabular view of the 
contents of a PID record and a graphical representation of related FAIR DOs. 

### :white_check_mark: Features

* Portable - Can be used standalone in your Web browser or hosted on a Web server
* Type-driven rendering of PID record elements
* Search history functionality including suggestion mode for PID input
* Two different ways of rendering PID records (plain or interactive) 
* Extensible by additional types
* On-the-fly creation of FAIR DO graph

### :star: Planned Features

* Rendering of additional information in FAIR DO graph, e.g., record preview
* Optional integration of FDO search index as backend service for PID input

## How to start

FAIR-DOscope is implemented as single Web page. It can be viewed in any Web browser by opening `index.html` locally. 
However, it is also possible to run the tool using an arbitrary Web server for public access from the internet. In case
you want to try FAIR-DOscope out just now, just continue to the project's [GitHub Pages](https://kit-data-manager.github.io/fairdoscope/)
to see it running.

## Usage 

<img src="/images/screenshot.png" alt="FAIR-DOscope"/>

Using FAIR-DOscope is relatively straightforward. On the upper left you'll find an input field for typing in PIDs of FAIR DOs.
After clicking the magnifying glass, the PID is resolved, its PID record is presented in the table on the lower left and the 
PID graph of (directly) referenced FDOs is drawn to the right. 

You may now click a single nodes in the PID graph to navigate to related FDOs. If new relationships are detected, the graph will
be extended dynamically. Alternatively, opening FDO links (marked with a pointer icon) in the table will have the same effect. 
Other external links, e.g., links to data types, data, or other digital assets present as URL, are opened in a new browser tab.

Last, but not least, For the PID record table you can switch between two modes:

* Plain Record: Presents the PID record as received from the PID resolving service, which can be used for fast preview.
* Interactive Record: Tries to render table cells according to the detected data type in the PID record.


## License

The KIT Data Manager is licensed under the Apache License, Version 2.0.
