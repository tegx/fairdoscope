## :information_source: Required steps after creating a repository from this template :information_source:

* Replace all occurences of **template** in this file with your project name
* Enable this project in coveralls in order to obtain code coverage reports
* Add branch protection rules in project settings -> branches to require status checks, e.g. Travis Pull and Coveralls, and branches to be up to date for master branch
* Fill in or remove sections of this README.md marked with TODO
* Remove this section from README.md

---

# KIT Data Manager - template

![Build Status](https://img.shields.io/travis/kit-data-manager/template.svg)
![Code Coverage](https://img.shields.io/coveralls/github/kit-data-manager/template.svg)
![License](https://img.shields.io/github/license/kit-data-manager/template.svg)

## How to build

In order to build this microservice you'll need:

* OpenJDK 11 or higher

After obtaining the sources change to the folder where the sources are located perform the following steps:

```
user@localhost:/home/user/template$ ./gradlew -Pclean-release build
> Configure project :
Using release profile
<-------------> 0% EXECUTING [0s]
[...]
user@localhost:/home/user/template$
```

The Gradle wrapper will now take care of downloading the configured version of Gradle, checking out all required libraries, build these
libraries and finally build the base-repo microservice itself. As a result, a fat jar containing the entire service is created at 'build/jars/base-repo.jar'.

## How to start

TODO

### Prerequisites

TODO

### Setup

TODO

## More Information

TODO

## License

The KIT Data Manager is licensed under the Apache License, Version 2.0.
